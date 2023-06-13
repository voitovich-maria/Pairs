document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const restartBtn = document.querySelector('.restart-btn')
  let boardSize = 4;

  function shuffleCards() {
    let arr = [];

    // создаем массив пар чисел от 1 до boardSize
    for (let i = 1; i <= boardSize * boardSize / 2; i++) {
      arr.push(i);
      arr.push(i);
    }

    // перемешиваем массив
    for (let i = arr.length - 1; i >0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // добавляем числа на карточки
    for (let i = 0; i < cards.length; i++) {
      cards[i].querySelector('.card__front').textContent = arr[i];
    }
  }

  let firstCard = null;
  let secondCard = null;
  shuffleCards();

  // добавляем обработчики на карточки
  for (const card of cards) {
    card.addEventListener('click', () => {
      if (card.classList.contains('is-open')) return;
      card.classList.add('is-open');

      if (!firstCard && !secondCard) {
        firstCard = card;

      } else if (firstCard && !secondCard) {
        secondCard = card;

      } else if (firstCard && secondCard) {
        let firstCardValue = firstCard.querySelector('.card__front').textContent;
        let secondCardValue = secondCard.querySelector('.card__front').textContent;

        if (firstCardValue != secondCardValue) {
          firstCard.classList.remove('is-open');
          secondCard.classList.remove('is-open');
        }

        firstCard = card;
        secondCard = null;
      }

      // делаем видимой кнопку "Сыграть ещё раз" если все карточки открыты
      if (document.querySelectorAll('.card.is-open').length == cards.length) {
        setTimeout(() => {
          restartBtn.classList.add('is-active');
        }, 500);
      }
    });
  }

  // рестарт игры
  restartBtn.addEventListener('click', () => {
    for (const card of cards) {
      card.classList.remove('is-open');
    }

    firstCard = null;
    secondCard = null;
    shuffleCards();

    restartBtn.classList.remove('is-active');
  });
});

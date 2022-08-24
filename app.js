// api : https://restcountries.com/v3.1/all

let countriesData = [];
const flagBtn = document.querySelector('.flags-option');
const mainMenu = document.querySelector('.menu');
const quizBox = document.querySelector('.quiz-section');
const exitBtn = document.querySelector('.quit-cross');
const choiceButton = document.querySelectorAll('.answer li');

async function fetchCountries() {
  await fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
      countriesData = data;
    });
  console.log(countriesData);
}

fetchCountries();

flagBtn.addEventListener('click', () => {
  disappear(mainMenu);
  appear(quizBox);
});

exitBtn.addEventListener('click', () => {
  disappear(quizBox);
  appear(mainMenu);
});

function disappear(disappearringElement) {
  disappearringElement.classList.add('section-disappear');
  disappearringElement.classList.remove('section-appear');
  setTimeout(() => {
    disappearringElement.classList.remove('section-disappear');
    disappearringElement.classList.add('inactive');
  }, 300);
}

function appear(appearElement) {
  setTimeout(() => {
    appearElement.classList.remove('inactive');
    setTimeout(() => {
      appearElement.classList.add('section-appear');
    }, 300);
    appearElement.classList.remove('section-appear');
  }, 300);
}

for (let i = 0; i < choiceButton.length; i++) {
  choiceButton[i].addEventListener('click', () => {
    if (i % 2 == 0) {
      choiceButton[i].classList.add('incorrect-answer');
    } else {
      choiceButton[i].classList.add('correct-answer');
    }
  });
}

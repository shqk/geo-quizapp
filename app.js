// api : https://restcountries.com/v3.1/all

let countriesData = [];
let selectedCountries = [];
let index = 0;
let quizType;
const flagBtn = document.querySelector('.flags-option');
const capBtn = document.querySelector('.capitals-option');
const mainMenu = document.querySelector('.menu');
const quizBox = document.querySelector('.quiz-section');
const exitBtn = document.querySelector('.quit-cross');

async function fetchCountries() {
  await fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
      countriesData = data;
    });
  console.log(countriesData);
  console.log(selectedCountries);
  tenCountries();
}

fetchCountries();

flagBtn.addEventListener('click', () => {
  disappear(mainMenu);
  appear(quizBox);
  quizType = 'flag';
  showQuestion(quizType, index);
  showProposition(index);
});

capBtn.addEventListener('click', () => {
  disappear(mainMenu);
  appear(quizBox);
  quizType = 'capital';
  showQuestion(quizType, index);
  showProposition(index);
});

exitBtn.addEventListener('click', () => {
  disappear(quizBox);
  appear(mainMenu);
  selectedCountries = [];
  tenCountries();
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

// Choisi aléatoirement 10 pays

function tenCountries() {
  while (selectedCountries.length < 10) {
    let randomIndex = Math.floor(Math.random() * countriesData.length);
    if (
      countriesData[randomIndex].independent &&
      !selectedCountries.includes(countriesData[randomIndex])
    ) {
      selectedCountries.push(countriesData[randomIndex]);
    } else {
      tenCountries(countriesData);
    }
  }
}

function showQuestion(userChoice, index) {
  let questionText = document.querySelector('.question-text');
  let image = document.querySelector('.question img');
  let countryName = document.querySelector('.country-name');
  if (userChoice === 'flag') {
    image.classList = 'flag-picture';
    countryName.textContent = '';
    questionText.textContent = 'À quel pays appartient ce drapeau ?';
    image.src = selectedCountries[index].flags.png;
  } else if (userChoice === 'capital') {
    image.src = '';
    image.classList = '';
    questionText.textContent = 'Quelle est la capitale de ce pays ?';
    countryName.textContent = selectedCountries[index].translations.fra.common;
  }
}

function showProposition(index) {
  // A remplir avec des pays de la même région
  let propositionArr = [];
  let choiceButton = document.querySelectorAll('.answer li .option');
  for (let i = 0; i < choiceButton.length; i++) {
    choiceButton[i].textContent = 'lol';
  }
}

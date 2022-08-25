// api : https://restcountries.com/v3.1/all

let countriesData = [];
let selectedCountries = [];
let quizType;
const flagBtn = document.querySelector('.flags-option');
const capBtn = document.querySelector('.capitals-option');
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
  tenCountries();
  console.log(selectedCountries);
  // let image = document.querySelector('.question > img');
  // image.src = selectedCountries[0].flags.png;
}

fetchCountries();

flagBtn.addEventListener('click', () => {
  disappear(mainMenu);
  appear(quizBox);
  quizType = 'flag';
});

capBtn.addEventListener('click', () => {
  disappear(mainMenu);
  appear(quizBox);
  quizType = 'capital';
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

function quiz(userChoice) {
  let index = 0;
  if (userChoice === 'flag') {
    let questionText = document.querySelector('.question-text');
    let image = document.querySelector('.question > img');
    questionText.textContent = 'À quel pays appartient ce drapeau ?';
    image.src = selectedCountries[0].flags.png;
    // Choisir des pays aléatoire différents du pays actuel
  } else {
  }
}

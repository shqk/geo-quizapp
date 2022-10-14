// api : https://restcountries.com/v3.1/all

let countriesData = [];
let selectedCountries = [];
let index = 0;
let propositionArr = [];
let indexDisplay = 1;
const totalQuestions = 10;
let quizType;
const flagBtn = document.querySelector('.flags-option');
const capBtn = document.querySelector('.capitals-option');
const mainMenu = document.querySelector('.menu');
const quizBox = document.querySelector('.quiz-section');
const exitBtn = document.querySelector('.quit-cross');
const choiceButton = document.querySelectorAll('.answer li');
const questionContainer = document.querySelector('.question');
const answerList = document.querySelector('.answer');
let choiceContent = document.querySelectorAll('.answer li .option');

// Récupère la data
async function fetchCountries() {
  await fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
      countriesData = data;
    });
  console.log(countriesData);
  console.log(selectedCountries);
  tenCountries(countriesData, selectedCountries);
}

fetchCountries();

// Quand l'utilisateur choisi le mode Drapeaux
flagBtn.addEventListener('click', () => {
  disappear(mainMenu);
  appear(quizBox);
  quizType = 'flag';
  showQuestion(quizType, index);
  showProposition(index);
});

// Quand l'utilisateur choisi le mode Capitales
capBtn.addEventListener('click', () => {
  disappear(mainMenu);
  appear(quizBox);
  quizType = 'capital';
  showQuestion(quizType, index);
  showProposition(index);
});

// Bouton pour quitter
exitBtn.addEventListener('click', () => {
  disappear(quizBox);
  appear(mainMenu);
  selectedCountries = [];
  tenCountries(countriesData, selectedCountries);
});

const disappear = (disappearringElement) => {
  disappearringElement.classList.add('section-disappear');
  disappearringElement.classList.remove('section-appear');
  setTimeout(() => {
    disappearringElement.classList.remove('section-disappear');
    disappearringElement.classList.add('inactive');
  }, 300);
};

const appear = (appearElement) => {
  setTimeout(() => {
    appearElement.classList.remove('inactive');
    setTimeout(() => {
      appearElement.classList.add('section-appear');
    }, 300);
    appearElement.classList.remove('section-appear');
  }, 300);
};

// Choisi aléatoirement 10 pays
const tenCountries = (fromArr, toArr) => {
  while (toArr.length < 10) {
    let randomIndex = Math.floor(Math.random() * fromArr.length);
    if (
      fromArr[randomIndex].independent &&
      !toArr.includes(fromArr[randomIndex])
    ) {
      toArr.push(fromArr[randomIndex]);
    } else {
      tenCountries(fromArr, toArr);
    }
  }
};

const showQuestion = (userChoice, index) => {
  questionContainer.classList.remove('fadeout');
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
};

const showProposition = (index) => {
  answerList.classList.remove('fadeout');
  // Ajoute le premier pays dans le tableau
  propositionArr.push(selectedCountries[index]);
  let countriesIndex = 0;
  while (propositionArr.length < choiceContent.length) {
    if (
      propositionArr[0].name.common !=
        countriesData[countriesIndex].name.common &&
      (propositionArr[0].subregion == countriesData[countriesIndex].subregion ||
        propositionArr[0].region == countriesData[countriesIndex].region) &&
      countriesIndex < countriesData.length
    ) {
      propositionArr.push(countriesData[countriesIndex]);
    }
    countriesIndex++;
  }
  shuffleArray(propositionArr);
  for (let i = 0; i < choiceContent.length; i++) {
    // choiceContent[i].className = 'option';
    console.log(choiceContent[i]);
    if (quizType == 'flag') {
      choiceContent[i].textContent = propositionArr[i].translations.fra.common;
    } else {
      choiceContent[i].textContent = propositionArr[i].capital[0];
    }
  }
  console.log('Proposition array');
  console.log(propositionArr);
  propositionArr = [];
  console.log(propositionArr);
};

const shuffleArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

choiceButton.forEach((choice) => {
  choice.addEventListener('click', () => {
    if (index <= 10) {
      if (
        selectedCountries[index].capital[0] ==
        choice.lastElementChild.textContent
      ) {
        choice.classList.add('correct-answer');
      } else {
        choice.classList.add('incorrect-answer');
      }
      setTimeout(() => {
        index++;
        choice.className = 'option';
        showQuestion(quizType, index);
        showProposition(index);
      }, 1000);
    }
    // fonction qui affiche la box finale
  });
});

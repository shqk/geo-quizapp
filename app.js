// api : https://restcountries.com/v3.1/all

let countriesData = [];
let selectedCountries = [];
let index = 0;
let nbRightAnswer = 0;
let propositionArr = [];
let quizType;
const totalQuestions = 10;
let clicked = false;
const flagBtn = document.querySelector('.flags-option');
const capBtn = document.querySelector('.capitals-option');
const mainMenu = document.querySelector('.menu');
const quizBox = document.querySelector('.quiz-section');
const exitBtn = document.querySelector('.quit-cross');
const choiceButton = document.querySelectorAll('.answer li');
const questionContainer = document.querySelector('.question');
const answerList = document.querySelector('.answer');
let choiceContent = document.querySelectorAll('.answer li .option');
const progressBar = document.querySelector(
  '.progress-bar-container .progress-bar ',
);
const rightAnswers = document.querySelector(
  '.quiz-progression .progress-number > span',
);
const restartBtn = document.querySelector('.playagainbtn');
const endScreen = document.querySelector('.end-screen');
const currentScore = document.querySelector('.currentscore .scorenum');

// Récupère la data
async function fetchCountries() {
  await fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
      countriesData = data;
    });
  console.log(countriesData);
  tenCountries(countriesData, selectedCountries);
  console.log(selectedCountries);
}

fetchCountries();

// Quand l'utilisateur choisi le mode Drapeaux
flagBtn.addEventListener('click', () => {
  quizType = 'flag';
  launch('flag');
});

// Quand l'utilisateur choisi le mode Capitales
capBtn.addEventListener('click', () => {
  quizType = 'capital';
  launch('capital');
});

// Bouton pour quitter
exitBtn.addEventListener('click', () => {
  disappear(quizBox);
  appear(mainMenu);
  selectedCountries = [];
});

restartBtn.addEventListener('click', () => {
  disappear(endScreen);
  appear(mainMenu);
});

const launch = type => {
  index = 0;
  nbRightAnswer = 0;
  propositionArr = [];
  tenCountries(countriesData, selectedCountries);
  disappear(mainMenu);
  appear(quizBox);
  showProposition(index, type);
  showQuestion(index, type);
};

const disappear = disappearringElement => {
  disappearringElement.classList.add('section-disappear');
  disappearringElement.classList.remove('section-appear');
  setTimeout(() => {
    disappearringElement.classList.remove('section-disappear');
    disappearringElement.classList.add('inactive');
  }, 300);
};

const appear = appearElement => {
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

const showQuestion = (index, type) => {
  progressBar.style.width = `${index * 10}%`;
  questionContainer.classList.remove('fadeout');
  let questionText = document.querySelector('.question-text');
  let image = document.querySelector('.question img');
  let countryName = document.querySelector('.country-name');
  if (type === 'flag') {
    image.classList = 'flag-picture';
    countryName.textContent = '';
    questionText.textContent = 'À quel pays appartient ce drapeau ?';
    image.src = selectedCountries[index].flags.png;
  } else if (type === 'capital') {
    image.src = '';
    image.classList = '';
    questionText.textContent = 'Quelle est la capitale de ce pays ?';
    countryName.textContent = selectedCountries[index].translations.fra.common;
  }
};

const showProposition = (index, type) => {
  answerList.classList.remove('fadeout');
  clicked = false;
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
    if (type == 'flag') {
      choiceContent[i].textContent = propositionArr[i].translations.fra.common;
    } else {
      choiceContent[i].textContent = propositionArr[i].capital[0];
    }
  }
  console.log(propositionArr);
};

const shuffleArray = array => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const checkAnswer = (index, clickedChoice, type) => {
  if (type == 'capital') {
    if (
      selectedCountries[index].capital[0] ==
      clickedChoice.lastElementChild.textContent
    ) {
      clickedChoice.classList.add('correct-answer');
      nbRightAnswer++;
      rightAnswers.textContent = nbRightAnswer;
    } else {
      clickedChoice.classList.add('incorrect-answer');
    }
  } else {
    if (
      selectedCountries[index].translations.fra.common ==
      clickedChoice.lastElementChild.textContent
    ) {
      clickedChoice.classList.add('correct-answer');
      nbRightAnswer++;
      rightAnswers.textContent = nbRightAnswer;
    } else {
      clickedChoice.classList.add('incorrect-answer');
    }
  }
};

choiceButton.forEach(choice => {
  choice.addEventListener('click', () => {
    if (clicked == false) {
      clicked = true;
      if (index < 10) {
        checkAnswer(index, choice, quizType);
        index++;
        setTimeout(() => {
          propositionArr = [];
          choice.className = 'option';
          showQuestion(index, quizType);
          showProposition(index, quizType);
        }, 1000);
      } else {
        checkAnswer(index, choice, quizType);
        setTimeout(() => {
          displayEndScreen(nbRightAnswer);
          disappear(quizBox);
          appear(endScreen);
        }, 2000);
        choice.className = 'option';
      }
    }
  });
});

const displayEndScreen = answer => {
  currentScore.textContent = answer;
};

const freezeClick = e => {
  choiceButton.forEach(choice => {
    choice.removeEventListener('click', e);
  });
};
// Faire une fonction reset

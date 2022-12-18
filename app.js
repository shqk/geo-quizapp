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
const bestScore = document.querySelector('.bestScore .bestscorenum');
const flagHSpercent = document.querySelector('.flagHS');
const capHSpercent = document.querySelector('.capHS');

// Récupère la data
async function fetchCountries() {
  await fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
      countriesData = data;
    });
  tenCountries(countriesData, selectedCountries);
}

fetchCountries();

const setHSMenu = () => {
  flagHS = localStorage.getItem('flagHS');
  capHS = localStorage.getItem('capitalHS');
  if (flagHS != null) {
    flagHSpercent.textContent = parseInt(flagHS) * 10 + '%';
  }
  if (capHS != null) {
    capHSpercent.textContent = parseInt(capHS) * 10 + '%';
  }
};
setHSMenu();

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
  setHSMenu();
  selectedCountries = [];
  disappear(endScreen);
  appear(mainMenu);
});

// Pour donner le meilleur score à l'écran de fin
const setHS = (type, rightAnswers) => {
  let HS = localStorage.getItem(`${type}HS`);
  if (HS != null) {
    bestScore.textContent = HS;
  } else {
    bestScore.textContent = 0;
  }
};

// Initialise les données
const launch = type => {
  index = 0;
  nbRightAnswer = 0;
  rightAnswers.textContent = nbRightAnswer;
  propositionArr = [];
  tenCountries(countriesData, selectedCountries);
  disappear(mainMenu);
  appear(quizBox);
  showProposition(index, type);
  showQuestion(index, type);
};

// Pour des animations smooth
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

// Affiche les questions en fonction du type de quiz
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

// Affiche les propositions en fonction du type de quiz
const showProposition = (index, type) => {
  answerList.classList.remove('fadeout');
  clicked = false;
  // Ajoute le premier pays dans le tableau
  propositionArr.push(selectedCountries[index]);
  let countriesIndex = 0;
  let sameRegionCountry = [];
  // Tableau de potentiels propositions (le but était de mettre des propositions de pays voisins / dans la même région ou sous région)
  for (let i = 0; i < countriesData.length; i++) {
    if (
      propositionArr[0] != countriesData[i] &&
      (propositionArr[0].subregion == countriesData[i].subregion ||
        propositionArr[0].subregion == countriesData[i].region)
    ) {
      sameRegionCountry.push(countriesData[i]);
    }
  }
  // Evite d'avoir toujours les mêmes propositions pour un pays donné en choisissant de manière aléatoire
  while (propositionArr.length < choiceContent.length) {
    randIndex = Math.floor(Math.random() * sameRegionCountry.length);
    if (propositionArr.indexOf(sameRegionCountry[randIndex]) == -1) {
      propositionArr.push(sameRegionCountry[randIndex]);
      countriesIndex++;
    }
  }
  shuffleArray(propositionArr);
  for (let i = 0; i < choiceContent.length; i++) {
    if (type == 'flag') {
      choiceContent[i].textContent = propositionArr[i].translations.fra.common;
    } else {
      choiceContent[i].textContent = propositionArr[i].capital[0];
    }
  }
};

// ALgo de Fish-Yates pour bien mélanger le tableau
const shuffleArray = array => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

// Attribue les bonnes classes en fonction du choix de l'user (rouge = faux ; vert = correct)
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
    // Empêche de cliquer sur plusieurs propositions pour une même question
    if (clicked == false) {
      clicked = true;
      checkAnswer(index, choice, quizType);
      index++;
      setTimeout(() => {
        propositionArr = [];
        choice.className = 'option';
        if (index < 10) {
          showQuestion(index, quizType);
          showProposition(index, quizType);
        } else {
          currentScore.textContent = nbRightAnswer;
          // sauvegarde dans le localStorage si l'user a battu son score ou joue pour la première fois
          if (
            localStorage.getItem(`${quizType}HS`) == null ||
            parseInt(localStorage.getItem(`${quizType}HS`)) < nbRightAnswer
          ) {
            localStorage.setItem(`${quizType}HS`, nbRightAnswer);
          }
          // affichage de l'écran de fin
          disappear(quizBox);
          setHS(quizType, nbRightAnswer);
          appear(endScreen);
        }
      }, 1000);
    }
  });
});

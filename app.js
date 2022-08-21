// api : https://restcountries.com/v3.1/all

let countriesData = [];
const flagBtn = document.querySelector('.flags-option');
const mainMenu = document.querySelector('.menu');
const quizBox = document.querySelector('.quiz-section');

flagBtn.addEventListener('click', () => {
  disappear(mainMenu);
  appear(quizBox);
});

// window.addEventListener('load', () => {

//   appear(mainMenu);
// });

function disappear(disappearringElement) {
  disappearringElement.classList.add('section-disappear');
  setTimeout(() => {
    disappearringElement.classList.remove('section-disappear');
    disappearringElement.classList.add('inactive');
  }, 400);
}

function appear(appearElement) {
  // appearElement.classList.add('section-appear');
  setTimeout(() => {
    appearElement.classList.remove('inactive');
    setTimeout(() => {
      appearElement.classList.add('section-appear');
    }, 400);
    appearElement.classList.remove('section-appear');
  }, 400);
}

async function fetchCountries() {
  await fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
      countriesData = data;
    });
  console.log(countriesData);
}

fetchCountries();

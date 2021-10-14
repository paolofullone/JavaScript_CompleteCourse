'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// //? 242 Our First AJAX Call_ XMLHttpRequest.mp4
/*
// We have multiple ways of doing AJAX requests in JS, we will start with the most old school one.

// visit github public apis => https://github.com/public-apis/public-apis
// CORS stands for cross origin resource sharing, we should look for the ones with YES or Unknown. Without CORS we cannot access a
// 3rd party api from our code.
*/
const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${
                // + converts to number, / by 1 million and rounded to 1 decimal case.
                (+data.population / 1_000_000).toFixed(2)
              }</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
            </div>
      </article>
          `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  // with the command above we will make the request to the chosen API, then we will listen the completion of the request and the arrival of
  // the data with an event listener on request with 'load' parameter.

  request.addEventListener('load', function () {
    //   console.log(this.responseText); // the this keyword here is request.
    //   console.log(request.responseText); // the this keyword here is request.

    // now let's convert the data to a JS object using parse again.
    //   const data = JSON.parse(this.responseText); // we can destructure in two ways:
    //   const data = JSON.parse(this.responseText)[0]; // 1
    const [data] = JSON.parse(this.responseText); // 2 - More beautiful and we get our object directly.
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbor country(2)
    const [neighbour] = data.borders;
    if (!neighbour) return; // guard clause in island countries or countries w/o borders with another country.

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`); // we get ESP from the borders, so we need to search for 3 letter code.
    request2.send();
    request2.addEventListener('load', function () {
      // console.log(this.responseText);
      const data2 = JSON.parse(this.responseText); // here we cannot destructure it.
      console.log(data2);

      renderCountry(data2, 'neighbour'); // theres a class in the HTML to inform that it is a neighbour country.
    });
  });
};
getCountryAndNeighbour('usa');

//? 247 - Sequence of AJAX calls, we will render the border country of Portugal (Spain)

// if we wanted to show the borders of Brasil we would have a lot of callback functions, the name is callback hell.

// example: (we can see the arrow format as well.) In ES6 we can escape from callback hell.

// setTimeout(() => {
//   console.log('1 second(s) passed.');
//   setTimeout(() => {
//     console.log('2 second(s) passed.');
//     setTimeout(() => {
//       console.log('3 second(s) passed.');
//       setTimeout(() => {
//         console.log('4 second(s) passed.');
//         setTimeout(() => {
//           console.log('5 second(s) passed.');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
*/

//? 248 - Promises and the Fetch API

// we did like this:

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// const request = fetch('https://restcountries.com/v2/name/brazil'); // calling a fetch function immediately returns a promise.
// console.log(request);

// the fetch will return a promise, and in the promises we can call a .then method that takes a callback function.
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); // json is also asynchronous so it will also return a promise. so we have to use .then again.
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// refactoring removing the console.logs and transforming into arrow functions.

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
getCountryData('portugal');

// so we replaced the code written before with callbacks, event listeners etc by this small block of code.

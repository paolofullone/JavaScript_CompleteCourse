'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const REST_COUNTRIES = 'https://restcountries.com/v3/name';

function getCountryData(countryName) {
  const request = new XMLHttpRequest();

  // console.log('open...');
  request.open('GET', `${REST_COUNTRIES}/${countryName}`);

  // console.log('send...');
  request.send();

  // console.log('waiting for response...');
  request.addEventListener('load', function () {
    // console.log('got a response!');
    const country = JSON.parse(this.responseText)[0];
    console.log(country);

    const currency_key = Object.keys(country.currencies)[0];
    const currency = country.currencies[currency_key].name;

    const language_key = Object.keys(country.languages)[0];
    const language = country.languages[language_key];

    const population = `${(country.population / 1_000_000).toFixed(2)} M`;

    const html = `
      <article class="country">
      <img class="country__img" src="${country.flags[0]}"/>
      <div class="country__data">
        <h3 class="country__name">${country.name.common}</h3>
        <h4 class="country__region">${country.region}</h4>
        <p class="country__row"><span>👫</span>${population}</p>
        <p class="country__row"><span>🗣️</span>${language}</p>
        <p class="country__row"><span>💰</span>${currency}</p>
      </div>
    </article>
      `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
}

getCountryData('banana');

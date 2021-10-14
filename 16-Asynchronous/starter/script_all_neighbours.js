'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
///////////////////////////////////////
const renderData = (data, className = '') => {
  //   const html = `
  //        <article class="country ${className}">
  //               <img class="country__img" src="${data.flag}" />
  //               <div class="country__data">
  //                <h3 class="country__name">${data.name}</h3>
  //                <h4 class="country__region">${data.region}</h4>
  //                <p class="country__row"><span>👫</span>${(
  //                  +data.population / 1000000
  //                ).toFixed(1)}people</p>
  //               <p class="country__row"><span>🗣️</span>${
  //                 data.languages[0].name
  //               }</p>
  //               <p class="country__row"><span>💰</span>${
  //                 data.currencies[0].name
  //               }</p>
  //               </div>
  //        </article>   `;

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
function getCountryAndNeighbour(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/rest/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText);
    renderData(data); /// SOMSIAD
    console.log(data);
    const neighbours = data.borders;
    if (!neighbours) return;
    for (let border of neighbours) {
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/rest/v2/alpha/${border}`);
      request2.send();
      request2.addEventListener('load', function () {
        const data2 = JSON.parse(this.responseText);
        renderData(data2, 'neighbour');
      });
    }
  });
} // getCountry('Poland'); // getCountry('USA'); // getCountry('Germany'); // getCountry('France'); getCountryAndNeighbour('Poland');
getCountryAndNeighbour('Poland');

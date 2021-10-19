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
  countriesContainer.style.opacity = 1; // removed and included in the .finally method.
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1; // removed and included in the .finally method.
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
// so we replaced the code written before with callbacks, event listeners etc by this small block of code.


const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  // country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found.')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No Neighbour found');

      // country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found.'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥  ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
  // Handling the error (fetching the error) for all fetch's with .catch
  // err.message is a method available in all error messages.
};

// const getCountryData = function (country) {
//   // country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       // country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥  ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
//   // Handling the error (fetching the error) for all fetch's with .catch
//   // err.message is a method available in all error messages.
// };

// .then is triggered when promise returns true, .catch when returns false and .finally always (true or false)

// now we set the network to offline (network tab) and we get a Uncaught (in promise) error.
btn.addEventListener('click', function () {
  getCountryData('australia');
});

// getCountryData('brazil'); // this returns a "cannot read properties of undefined (reading 'flag')" but the error is that theres no
// scalabosh country, so we will see how to handle this error.

// 249 - Chain promises to render the initial country and neighbour. chain 2 AJAX

// The then method always return a value, if we return something using return then the value becomes the fulfillment value
// of the return promise.

//* so if we replace fetch(`https://restcountries.com/v2/alpha/${neighbour}`); by return 100 and chain another then
//* method:
//  return 100
// })
// .then (data => alert(data));
//* we get a alert with 100.

//* 251 - Handling rejected promises (errors in promises)

//* 252 - Throwing errors manually

//* 253

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. 
Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. 
Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, 
log a message like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. 
Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API 
that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀 
*/

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=278829738579047305467x63888 `
//   )
//     .then(response => {
//       if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//       // console.log(response);
//       return response.json();
//     })
//     .then(result => {
//       // console.log(result);
//       console.log(`You are in ${result.city}, ${result.country}.`);
//       // const country = result.country;
//       // return country;
//     })
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥  ${err.message}. Try again!`);
//     });
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
/*
// Jonas Solution
const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=278829738579047305467x63888 `
  )
    .then(res => {
      // console.log(res);
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

// 255 - Event Loop in practice

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log('Test end');

// so both cl will be logged immediately because code outside any callback will run first.
// Between the timer and the Promise it is trickier, they both finish at the exact same time. After 0 seconds. Because we used a .resolve
// in promise and a 0 in timer.
// The Promise will be handled by the micro-task queue, so it has priority over the callback queue.

// 2nd test
/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 100_000_000; i++) {}
  console.log(res);
});

console.log('Test end');
// This 2nd promise will delay the '0 sec timer' to show in the console. This proves that the 0 seconds we have as a parameter
// of the SetTimeout is not a guarantee.
//* We cannot do higher precision things using timers.
*/

//256 - Building a simple promise.

// Lets say we have a lottery that has 50% odd win/loose, and the draw takes only 2 seconds.
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WON 💰');
    } else {
      reject(new Error('You lost your 💰')); // we can have as error or just console.log.
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// The resolved value of the promise is You won 💰, the err will be You lost your 💰
// With the setTimeout we encapsulated a asynchronous event in a promise.

// Promisifying setTimeout.
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// With this function we can replace the callback hell:
wait(1)
  .then(() => {
    console.log('1 second(s) passed.');
    return wait(1);
  })
  .then(() => {
    console.log('2 second(s) passed.');
    return wait(1);
  })
  .then(() => {
    console.log('3 second(s) passed.');
    return wait(1);
  })
  .then(() => console.log('4 second(s) passed.'));

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

Promise.resolve('abc').then(x => console.log(x)); // this will resolve immediately.
Promise.reject(new Error(`Problem`)).catch(x => console.log(x)); // this will resolve immediately.
*/

// 257 - Promisifying the geolocation api
// Geolocation takes 2 callback functions, one for success, one for failure. In case user doest not allow access to location.

//1
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );
// console.log('Getting position...'); // just to prove that geolocation is executed in the web API environment in the browser, asynchronous.

//2
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//
//});
// };

//3
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // above 3 lines of code is the same as:
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

// In the coding challenge we passed a latitude and longitude to determine our location, now we will do it based on our geolocation.

const whereAmI = function () {
  getPosition()
    .then(pos => {
      // console.log(pos.coords);
      const { latitude: lat, longitude: lng } = pos.coords; // destructuring and creating new variables of an object.
      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=278829738579047305467x63888 `
      );
    })
    .then(res => {
      // console.log(res);
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);

// so we can promisify all kinds of asynchronous stuff in JS.

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image 
(use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, 
append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element 
itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image 
  element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' 
in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀


const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.log(err));

////////////////////////////////////////////////////////////////
/*
// Tony's solution:
const imageContainer = document.querySelector('.images');
 
const timeOut = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));
 
const handleResolve = (img, resolve) => {
  imageContainer.append(img);
  resolve(img);
};
 
const createImage = imgPath =>
  new Promise((resolve, reject) => {
    img = new Image();
    img.src = imgPath;
 
    img.addEventListener('load', handleResolve.bind(null, img, resolve));
    img.addEventListener('error', reject.bind(null, Error('Invalid Image Source')));
  });
 
let img;
createImage('img/img-1.jpg')
  .then(() => timeOut(2))
  .then(() => {
    img.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(() => timeOut(2))
  .then(() => (img.style.display = 'none'))
  .catch(err => console.error(err.message));
  */

//259 - Chaining promises with async / await.

// when we add async to the function, it will keep running in the background while performing the code inside of it.
// when the function is done it will return a promise.
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // fetch(`https://restcountries.com/v2/name/${country}`).then(res =>
  //   console.log(res)
  // );

  // that's the same of:
  // const res = await fetch(`https://restcountries.com/v2/name/${country}`);
  // console.log(res);

  // Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  // Reverse Geocoding
  const resGeo = await fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=278829738579047305467x63888`
  );
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  // Country Data
  const res = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.country}`
  ); // await will stop the code execution until the promise is resolved.
  const data = await res.json(); // w/o await it returns error
  console.log(data);
  renderCountry(data[0]);
};

// the await does not block the code execution in the main thread, because we are stopping the execution of the async function.
// before async / await we had to wait for the fetch before assign the result to a const. this looks like normal synchronous code
// however behind the scenes it is asynchronous. we are still using promises, this is a different way of consuming them.

whereAmI();
console.log('this will be printed first');
*/

// w/o comments
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  // Reverse Geocoding
  const resGeo = await fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=278829738579047305467x63888`
  );
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  // Country Data
  const res = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.country}`
  );
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};

whereAmI();
console.log('this will be printed first');
*/
// we have 5 promises in the above code and it looks synchronous, w/o all the callback functions.

//* async / await is just synthetic sugar over consuming premises.

// 260 - async await error handling

// How the try method works:

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=278829738579047305467x63888`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country Data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
  }
};

whereAmI();
console.log('this will be printed first');

//* Never ignore handling errors specialy in asynchronous functions.

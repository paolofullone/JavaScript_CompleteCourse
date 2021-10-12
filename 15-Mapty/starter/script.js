'use strict';

// prettier-ignore
/*
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//? 226 How to Plan a Web Project.mp4

//1 User Stories - How the user describe the hole application in a high level overview from the user perspective.
//2 Features - based on the user stories we define the exact features we need to implement.
//3 Flowchart to insert the Features defined in 2. This is were we define WHAT we are going to build.
//4 Architecture - Now we know what we are going to build, then we need to think HOW we are going to build it. The project architecture
// is essentially what holds all the code together. It gives us the structure in which we can develop the application functionality.
// we could do all in one file, use functions, classes, multiple files etc.
//* After we finish these 4 steps (planning step) we go in development step.

//1 - Common format: As a [type of user] I want [action] so that [a benefit] // WHO, WHAT, WHY structure.
// Different people will come up with different user stories for the same application, what matters is that can use user stories
// to describe exactly what the application will do.

//2 - Now we translate the user stories to features.

//3 - Flowchart, we will put all the features in a flowchart including the events, what happens at each action.
// In the real world projects is normal to have a rough sketch and during implementation adds more information to the flowchart.
// Don't worry building the PERFECT FLOWCHART, it's not really necessary at the beginning. As we implement multiple flowcharts
// we will become better and it will become easy to do...
// The flowchart shows what the program should do, and we could use the flowchart to implement the program in any language,
// regarding the how, it is more specific and it is implemented in the architecture.

//4 - Architecture, as the flowchart we don't always have to define the perfect architecture before implementation. We can do
// some experiments, play around with the code, than define the final architecture.

//? 227 Using the Geolocation API.mp4

// if the navigator.geolocation exists then get the current position or show an error message.
// The geolocation gets 2 functions as parameters, 1 for success retrieve of the location and the other for failure (browser block)

let map, mapEvent; // now that we implemented a event listener on enter in the form, we need map and mapEvent at the global scope. so we changed 'const map' inside the geolocation to let map
// in the global scope.

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // const latitude = position.coords.latitude; // we could write like this, or the line below (more clean) using destructure.
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      //   console.log(latitude, longitude);
      console.log(`https://www.google.com.br/maps/@${latitude},${longitude}`);
      //   console.log(position);

      const coords = [latitude, longitude];

      //   const map = L.map('map').setView([51.505, -0.09], 13);
      map = L.map('map').setView(coords, 16); // Here is where the map will be displayed, so we need an id of map in our html. The L is a main function
      //   that leaflet gives us as an entry point. This is a namespace of leaflet API. We can inspect L in the console because L is a global variable in the leaflet.js.
      // If we create a other.js with const name = 'Paolo' and include a tag <script defer src="other.js"></script> in our html before the script.js we will be able
      // to log name in this script.js file.
      // the second argument (13) is the zoom on the map.

      // The map we see on screen is basically little tiles that comes from this url here (open street map), we can google for some map styles.

      //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        // applying different map style.
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      console.log(map); // so before we manipulate the map const we stored with the map, lets take a loot at it, first thing to notice is that we have
      // some _ in variables, so they should not be touched. The on method is the built in event listener of the leaflet maps. 3rd level of inheritance to inspect.

      // Handling clicks on map
      map.on('click', function (mapE) {
        // we renamed the mapEvent to mapE, declared mapEvent in the global scope and assigned mapE to mapEvent.
        mapEvent = mapE;
        form.classList.remove('hidden'); // showing the form as we click in any position of the map.
        inputDistance.focus(); // now as the user clicks it will already select the input distance field in the form, so the user can start typing.

        // console.log(mapEvent); // we can see that when we click a object is created, in the object we have latIng with latitude and longitude.
      });
    },
    function () {
      alert('Could not get your position');
    }
  );

// now we will implement a form submission (w/o checking the data) with a enter from the user.
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';

  // we forgot to put the .value and we got an error of "script.js:102 Uncaught TypeError: Assignment to constant variable.
  // at HTMLFormElement.<anonymous> (script.js:102)" Immediately i thought of changing const to let, but we need the .value instead.

  const { lat, lng } = mapEvent.latlng;

  //1  L.marker([51.5, -0.09])
  //2     L.marker(coords)
  //       .addTo(map)
  //       .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  //       .openPopup();
  //   });
  //3 L.marker([lat, lng]).addTo(map).bindPopup('workout').openPopup(); // This one closes the 'workout' as we click in a new one.
  // take a look at https://leafletjs.com/reference-1.7.1.html#marker to see the documentation
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup', // we will dynamically define latter on. This is on CSS file and allows us to customize the pop ups.
      })
    )
    .setPopupContent('Workout') // Added the text back
    .openPopup();
});

// Toggling the Cadence and Elevation Gain in the form, if we are running we have cadence, if we are cycling we have elevation gain.
// we need to select the div parent that contains elev gain and cadence and hide one and remove the hide from the other.

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});

//? 228 Displaying a Map Using Leaflet Library.mp4

// Leaflet is a open source library mobile-friendly maps for JS, when we google it we find multiple ways of adding the leaflet to our application
// for now we will use the leaflet from a CDN (content delivery network).
// Go to leaflet site, download section:

/* we have to include this to our html head before our own script (VERY IMPORTANT) because when our script loads, the browser will have already
downloaded the leaflet library.

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
  crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
  integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
  crossorigin=""></script>

/*

//* we also added the DEFER attribute do the <script> to determine the order of execution of the scripts.

// Go to leaflet site, overview section and include the code in the success function of geolocation.

//? 229 Displaying a Map Marker.mp4

// display a marker wherever we click on the map.

//? 230 Rendering Workout Input Form.mp4

// Render the workout form whenever the user clicks on the map. The form is already in the html file and has a hidden class by default.
// So we will do DOM manipulation adding and removing classes.

//?  231 Project Architecture.mp4

// We will have a Workout parent class and two child classes (Running and Cycling), the features of each class are shown in the 231 picture.

// We will also have a App class that will have all the functions and we will protect the functions from the outside code. The events will
// interact with the functions of this class.

//? 232 Refactoring for Project Architecture.mp4

//* Decided to put all the code here w/o comments.

*/

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); // in the real world we should use a 3rd party API to create ID's, here we will simply convert the date in string and get the last 10 numbers.
  clicks = 0;
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min

  }
  _setDescription() {
    // with the below comment, prettier will ignore the next line.
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    //this.date.getMonth() returns a number, so we use it to define the months array index.
  }
  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running'; // same of this.type = 'cycling' inside the constructor below.
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// Testing running and cycling classes.
// const run1 = new Running([39, -12], 5.5, 20, 195);
// const cycling1 = new Cycling([39, -12], 27, 95, 525);
// console.log(run1, cycling1);

///////////////////////////////////////////////////////////////////////////////////
// Application Architecture

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
// We could put everything inside the App class, however we would always have to use this.inputType etc.
class App {
  #map;
  #mapZoomLevel = 16;
  #mapEvent;
  #workouts = []; // here we are using the class fields specification, the common approach would be create a this.workouts = [] inside the constructor.

  constructor() {
    // Get user's position
    this._getPosition();

    // form.addEventListener('submit', this._newWorkout); //A event handler function will always have the this keyword of the DOM element onto which it is attached, in this case the form element.
    // so it will point to form and no longer to the app object.

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this)); // event delegation, we want to center the screen to the clicked workout, but the workout doesn't exist yet.
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // in a regular function call the this keyword is undefined, so we use bind to define the this keyword.
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.com.br/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Rendering the stored workouts in the map.
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });

    //   console.log(map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // Hide the form and replace it by the new workout card exercise just created.
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // Helper function => takes any valid number of parameters (...inputs) and when we use the ... we get an array
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp)); // this will loop over the array and return if the number is finite or not. And the every will only return true
    // if the Number.isFinite(inp) was true for all the elements in the array. The the arrow function returns true, if one element of the array is false, the
    // arrow function will return false.

    // Helper function 2 => check for positive numbers.
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    //* Get data from the form
    const type = inputType.value; // In the HTML we have a <option value=...> for each element.
    const distance = +inputDistance.value; // These values come as strings, the + signs converts them to numbers.
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout; // workout was defined inside the running block, so due to scope chain is not available outside, and we need it outside in order to push
    // the new workout to the workouts array. So we should declare it here.

    //* If workout is Running, create running object.
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid => we will use a guard clause, we will verify the opposite of what we are interested in, if the opposite is true
      // we return the function immediately. This is also a trend in modern JS.
      if (
        // (!Number.isFinite(distance) ||
        // (!Number.isFinite(duration) ||
        // (!Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        // if the ONE of the distance, duration or cadence is NOT a number (validInputs) or NOT positive number (allPositive).
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //* If workout is Cycling, create cycling object.
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration) // the elevation can be negative.
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //* Here we decided to use 2 if elements instead of if...else, this is more clean and modern JS approach.

    //* Add new object to workout array.
    this.#workouts.push(workout);
    // console.log(workout);

    //* Render workout on map as marker
    this._renderWorkout(workout);

    // Render workout on list
    this._renderWorkoutMarker(workout);

    // Hide form + Clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;
    if (workout.type === 'running')
      html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">👣</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
      `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);

    if (!workoutEl) return; // if we don't have a workout element, return immediately.

    // find the clicked workout.
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    // console.log(workout);

    // now let's select the map, center on it, define the zoom level again and some options available at leaflet documentation.
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // Using the public interface
    // workout.click(); // Storing the number of clicks. Not shown anywhere...
    // In lecture 237 after the implementation of restoring the data from the local storage, we convert the object to a string, them restore it from the string to an object again
    // then we displayed in the list and the marker on map, however when we do that, we loose the prototype chain of the object, one solution is to recreate the object using the
    // data that comes from the string, but we will not do it here, we will simply disable workout.click.
  }
  // localStorage is an API provided by the browser. It takes a name 'workout' and the 2nd argument is a string that we want to store and will be associated with the name
  // in a key value structure.
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts)); // stringify is a method that converts any object in JS to string.
    //* localStorage is a very simple API only advised to use for small amounts of data.
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts')); // JSON.parse is the opposite of JSON.stringify, here we take it out and display.
    // console.log(data);

    if (!data) return; // guard clause that if we don't have any data we return because const data will be undefined.

    this.#workouts = data; // when this script starts workouts is defined as empty array, here we restore the array from data.

    // Rendering the stored workouts in the list.
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
      // this._renderWorkoutMarker(work); //  to add the markers to the screen, it doesn't work here because at this point the map is not yet created right at the beginning
      // when the application first loaded. First we got to take the user geolocation, then we load the map.
    });
  }
  // we will use this reset in the console. we can use app.reset()
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

// Creating the object
const app = new App();

//? 233 Managing Workout Data_ Creating Classes.mp4

// Based on our Mapty-Architecture-part-1 we have to implement 3 classes, Workout, Running and Cycling.
// Workout has an id, distance, duration, coords and date.
// Running has cadence and pace, Cycling has elevationGain and speed.

//? 234 Creating a New Workout.mp4

// Implement the feature of creating a new workout from the UI
// At the beginning of this lecture we already put everything planned on initial architecture in the code, still need to implement some methods, but they are
// already in the code.

//? 235 Rendering Workouts.mp4

// Render workouts to the sidebar of UI with a short description of the workout.

//? 236 Move to Marker On Click.mp4

// Feature to move the map to the position of that workout.

//? 237 Working with localStorage.mp4

// use local storage to persist data and keep it even if the browser is reloaded.

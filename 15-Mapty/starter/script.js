'use strict';

// prettier-ignore
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

  */

//* we also added the DEFER attribute do the <script> to determine the order of execution of the scripts.

// Go to leaflet site, overview section and include the code in the success function of geolocation.

//? 229 Displaying a Map Marker.mp4

// display a marker wherever we click on the map.

//? 230 Rendering Workout Input Form.mp4

// Render the workout form whenever the user clicks on the map. The form is already in the html file and has a hidden class by default.
// So we will do DOM manipulation adding and removing classes.

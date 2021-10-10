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

// 226 How to Plan a Web Project.mp4

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

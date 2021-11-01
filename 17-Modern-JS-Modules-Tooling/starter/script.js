//269 - Exporting and Importing in ES6 Modules.
/*
// Importing Module - since the imports are hoisted, we put them in the top of the file.
// all the imports are executed first, even if we put this in the end of the file.

// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // replaced by import *:

// worked with import { add...}
// addToCart('bread', 5); // logging the phrase of shoppingCart module.
// console.log(price, tq);

console.log('Importing Module');

//* we can both import something as another name or export something as another name.

// import shoppingCart, * as ShoppingCart from './shoppingCart.js'; // it is a convention to import with title case the first letter when we import everything.
// ShoppingCart.addToCart('bread', 5); // as if this object were created from a class
// console.log(ShoppingCart.totalPrice);

// the module is something like a public API, everything else stays private inside the module.

// Export default we don't define any name for it, we will define in the import, we use export default ...
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);
/*

//* We usually never mix named and default exports in the module. This works:
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log(price);
//* but we do not use it. we must reduce complexity.

//* To import default exports we don't even need the { }, this was in purpose so it can be easier to import.

console.log(cart); // so in the shoppingCart file we push the pizza, bread and apples to the cart array that was empty.
// and in this cl we can see the array filled.

import shoppingCart from './shoppingCart.js';
/*
//270 - The Module Pattern
// IIFE - Immediately Invoked Function Expressions => gets immediately invoked and it's only invoked once.

const ShoppingCart2 = (function () {
  const cart = [];
  const shoppingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push(product, quantity);
    console.log(
      `${quantity} ${product} added to cart. Shipping cost is ${shoppingCost}`
    );
  };

  const orderStock = function (product, quantity) {
    cart.push(product, quantity);
    console.log(`${quantity} ${product} ordered from supplier.`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 2);
ShoppingCart2.addToCart('banana', 6);
console.log(ShoppingCart2); // everything we returned.
console.log(shoppingCart.shippingCost); // undefined because it is private.


// 271 - commonJS modules

// The export .addToCart is not going to work here, but it would work in Node.js. Which is a server to run JS files.

// export .addToCart = function (product, quantity) {
//   cart.push(product, quantity);
//   console.log(
//     `${quantity} ${product} added to cart. Shipping cost is ${shoppingCost}`
//   );
// }

// Importing in Node.js modules

// const { addToCart } = require('./shoppingCart.js');

// 272 - A brief explanation of terminal commands.

// 273 - Introduction o NPM.

// npm init => starts npm in the project folder and creates a node_modules folder and a package.json file.
// npm install leaflet => installs leaflet in this project (in the previous project Mapty we inserted the library directly in the html file,
// which is not good for security reasons, updating the library is hard...

// Lodash is a library that has a lot of functions that should belong to JS but they're not. So we use them in lodash.
// we will use the lodash-es (es modules)
// npm i lodash-es => we can use install or i

// now lets import clondeDeep from lodash-es
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// with parcel it gets easier.
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

// Now let's use Object.assign to copy the state object created.
const stateClone = Object.assign({}, state);
console.log(stateClone); // here we have the stateClone set to false in loggedIn even though the change is after this
// line in the code.

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone); // Here the stateDeepClone will maintain the loggedIn = true

// If we change one value:
state.user.loggedIn = false; // now the stateClone is also loggedIn = false... this

// using git we can ignore the node_modules files, because if we move it to another computer the we can simply
// use "npm i"" in the terminal and it will download all the necessary files.

//274 - Bundling with parcel and npm scripts

// npm i parcel => to install

// To use parcel we can use npx
// npx parcel index.html // in terminal.

// if something does not work use npm uninstal parcel then npm i parcel@1.12.4

// module.hot means that if we change one of the modules it will trigger a rebuild and it will automatically (like magic) get injected in the browser without triggering a page reload. This will help in the maintanence of the page, because we won't need to login in again like we did in the bankist application.
if (module.hot) {
  module.hot.accept();
}

// we added "start": "parcel index.html" to package.json file at scripts section now we can run "npm run start" in terminal so we have the parcel running.

// to build the final bundle of parcel we need a nother command. ""build": "parcel build index.html" then we do npm run build

// 275 - Install Babel and Pollyfiling - makes everything compatible with windows 7, xp etc.

// https://babeljs.io/ has official presets that transpile the code to older brownsers.

// This didn't worked before with Babel and a plugin was necessary. Now its fine
class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Paolo');

// Nulish covalescent operator
console.log('Paolo Doido' ?? null);

console.log(cart.find(el => (el.quantity = 2)));

Promise.resolve('TEST').then(x => console.log(x));

// Babel is able to transpile from ES6 to ES5, however *new* features to the language cannot be tanspiled becaust they didnt existed before. Babel can get an arrow function and convert to regular funcion. Bur will not change anything in a Promise. The new features needs to be polyfilled.

// In the video the command below didn't worked, so run "npm install core-js"
import 'core-js/stable';

// Polyfill will create all the new functions like Array.filter, find, map... that were inserted in ES6 to work with old browsers.

// For polyfilling async functions:
// also worked automatically with 2.0, not needed => npm install renegerator runtime
import 'regenerator-runtime/runtime';

*/
// 276. Review: Writing Clean and Modern JavaScript

//* VERY GOOD REVIEW

/*

//* Readeble code
=> code that OTHERS can understand
=> code that YOU will understand in one year
=> avoid code too CLEVER and OVERCOMPLICATED solution
=> describe variables with WHAT THEY CONTAIN
=> descriptive funciton names WHAT THEY DO

//* GENERAL
=> use DRY Principle and refactor your code 
=> encasuplate your data info functions in order to not pollute global namespace
=> don't use var, use let or const
=> use strong type checks "===" or "!==" in order to do type checks.

//* Functions:
=> usually the functions should do ONE think, small and do it really well
=> don't use more than 3 parameters (linked to previous ones)
=> use default parameters whenever possible
=> return the SAME data type as received
=> use the arrow functions whenever they made the code more readable (in callback functions of array methods is a good use case for arrow functions)

//* OOP
=> use ES6 classes
=> Encapsulate data that is not accessible from the outside, don't mutate outside the classes. When you need to manipulate the data, use a public API exactly the way you want it to happen.
=> Method chaining makes the code easier to read and understand
=> Don't use the arrow functions as methods (in regular objects), you will not get acces to the this keyword. EVEN IF YOU ARE NOT USING THE THIS KEYWORD, don't use the arrow functions. This will keep you from commit many mistakes.

//* AVOID NESTED CODE
=> Guard Clauses => early return in case some conditino is not achieved.
=> Use ternary operator or logical operators instead of IF statements.
=> If you really need the IF, use multiple IFs instead of if-else
=> Avoid any kind of for and for of loops, use the array methods (map, filter and reduce) instead
=> Avoid callback-based asynchronous APIs

//* Asynchronous code:

=> Consume promises with async/await instead of cath and then methods, because they need callback functions that will introduce more nested code. 
=> Use promises and consume them with async/await instead. Whenever you can (if they can run in the same time and do not depend on each other), run promises in parallel with Promise.all. This will make the application faster.
=> Always handle errors and promise rejecttions.

*/

//277 - Let's fix some bad code.
// we will work in the clean.js file.

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
add('bread', 2);
add('apples', 2);

//* We usually never mix named and default exports in the module. This works:
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log(price);
//* but we do not use it. we must reduce complexity.

//* To import default exports we don't even need the { }, this was in purpose so it can be easier to import.

console.log(cart); // so in the shoppingCart file we push the pizza, bread and apples to the cart array that was empty.
// and in this cl we can see the array filled.
<<<<<<< HEAD


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
*/

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

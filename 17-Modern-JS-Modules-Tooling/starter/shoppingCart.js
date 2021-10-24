// Exporting module
console.log('Exporting module');

// Shipping cost and cart are scoped to the current module, if we do console.log(shippingCost) in script.js we get an error.
const shippingCost = 0;
export const cart = [];

// To export a variable we must set export in the code. Named export:
export const addToCart = function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} added to cart.`);
};

//* All exports must be defined in the top level code, this wouldn't work:
// if (true) {
//   export const addToCart = function (product, quantity) {
//     cart.push(product, quantity);
//     console.log(`${quantity} ${product} added to cart`);
//   };
// }
// Returns a unexpected token 'export'

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// Export default we don't define any name for it, we will define in the import, we use export default ...

export default function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} added to cart.`);
}

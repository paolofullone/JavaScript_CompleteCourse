'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// Usually we have data coming in as a WEB API in {} and then we store the data in an
// array like this accounts one here, this is the most common way of receiving data
// in JS.
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// 144 Creating DOM Elements.mp4
const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // this line emptys the container, we had 2 movements there by default.
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); // google mdn insertAdjacentHTML to see all the methods.
  });
};
displayMovements(account1.movements);

// console.log(containerMovements.innerHTML); just to show the generated html.

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// 140 Simple Array Methods
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// slice method
console.log(arr.slice(2)); // slices from 3rd element and ahead
console.log(arr.slice(2, 4)); // slices from 3rd element ahead w/o the 5th
// the length of the array is end parameter - begining parameter, or 4-2 in this case

console.log(arr.slice(-1)); // last element of any array
console.log(arr.slice(1, -2)); // starts at position 1 and extracts everything except last 2
// 2 ways of creating shallow copies
console.log(arr.slice()); // creates a shallow copy
console.log([...arr]); // creates a shallow copy
// if we want to chain multiple methods together we should use arr.slice() and will do later in this section.

console.log(...arr); // creates a string with all the array items

// SPLICE method
// SPLICE operates in pretty similar, but it CHANGES the original array.
console.log(arr.splice(2)); // this returns pretty much same result as SLICE
console.log(arr); // but the array itself now has only 'a' and 'b'.

// Most of the times we the use case is the original array w/o the elements removed in SPLICE.
// if we want to remove the last element.
arr = ['a', 'b', 'c', 'd', 'e'];
arr.splice(-1); // removes last element
console.log(arr); // array w/o last element.

arr.splice(1, 2);
console.log(arr); // here we came to position 1 and took 2 elements (pos1=b and po2=c)

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(' ');
console.log(arr2.reverse()); // this one also mutates the array.
console.log(arr2);

// CONCAT
console.log(' ');
const letters = arr.concat(arr2); // concat does not mutate array arr
console.log(letters);

// same as
console.log([...arr, ...arr2]); // this also does not mutate the arrays

// JOIN
console.log(letters.join('-'));

// we already used push, unshift, pop, shift, indexOf, includes

// ALWAYS looks at MDN and choose the method appropriate for the situation
// no need to know everything by heart.
*/

// 141 Looping Arrays_ forEach.mp4
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
  }
}

console.log(`-----forEach-----`);

// The forEach method requires a callback function.
// The forEach method accepts only one parameter (movement), or two (movement, index)
// or the 3 as below (movement, index, array)
// The 1st one will always be the current element of the array, 2nd will be the index and 3rd
// the entire array.
// In the forEach we cannot use continue and break, it will always loop the entire array.

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1} You deposited ${mov} of array ${arr}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(mov)}`); //Math.abs just to show the positive number.
  }
});

// BEHIND THE SCENES, the forEach will cal at every iteration:
// 0: function(200)
// 1: function(450)
// 2: function(400)
// untill the end of the array...
*/

// 142 forEach With Maps and Sets.mp4
/*
// Map
const currencies = new Map([
  ['USD', 'United States dollar'], // USD  is the Key and United States Dollar is the value...
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set([
  'USD',
  'EUR',
  'EUR',
  'USD',
  'BRL',
  'BRL',
  'USD',
]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  // key and value are the same
  console.log(`${key}: ${value}`);
});

// It was decided to keep the same 3 parameters to the forEach function
// even if the set does not have key and value, only the value.
// It is a convention to name the key of _, in JS the _ is a unnecessary variable.
*/

// 143 PROJECT_ _Bankist_ App.mp4
// project overview

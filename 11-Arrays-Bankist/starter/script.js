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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// 140 Simple Array Methods

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

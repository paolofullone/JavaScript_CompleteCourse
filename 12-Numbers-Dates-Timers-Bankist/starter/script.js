'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // const amount = +inputLoanAmount.value;
  const amount = Math.floor(inputLoanAmount.value);
  // replaced the + by Math.floor to round it down, and since it already does type
  // coercion, the + is no longer necessary.

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//? LAZY LOGIN
inputLoginUsername.value = 'js';
inputLoginPin.value = 1111;
btnLogin.click();

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//? 166 Converting and Checking Numbers.mp4
/*
// All numbers are represented internally as floating point numbers is JS.
// That's why we only have one data type for all numbers in JS.

console.log(23 === 23.0);

// Base 10 - Numbers 0 to 9
// JS uses Binary base 2 (0's and 1's)
// Some numbers are very difficult to represent in base 2. For example 0.1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // FALSE? No, but in JS this is an error that we have
// to accept.

// This results in 0.300000000000004
// If we do 10/30 we get 3.3333333333, the same thing happens with JS since it is
// binary base 2.

// In some cases JS round behind the scenes, PHP and Ruby indeed uses the same system.

// Convert string to number
console.log(Number('23'));
// The same works for:
console.log(+'23'); // With the + operator JS will do type coercion
console.log('23'); // With the + operator JS will do type coercion
console.log(-'23'); // With the + operator JS will do type coercion
console.log(typeof -'23');

// With the + operand the code is more clean.

// Parsing
console.log(Number.parseInt('30px')); // returns 30 as a number, the string needs
// to start with the number.;

console.log(Number.parseInt('30px', 10));
// parseInt has a 2nd parameter, which is the base number, as we are using base 10
//* it returns the same result. "That can avoid some bugs in some situations"
// If we were working with binary, we should pass 2 instead of 10.

console.log(Number.parseInt('    2.5rem ')); // this returns 2
// we can have some spaces, doesn't affect.

// Since this is a GLOBAL function, w/o the Number. it also works.
// console.log(parseFloat('2.5rem    ')); // this returns 2.5
// However this is more 'old school', modern JS uses Number.

// isNaN - check if the value is a Not a Number (NaN)
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(20 / 0)); // if we type 23/0 in console we get "Infinity"

//* BEST way to check if a value is a NUMBER.
console.log('---isFinite---');
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20px'));
console.log(Number.isFinite(20 / 0));

//* If we want to check if the Number is Integer:
console.log('---isInteger---');
console.log(Number.isInteger(20));
console.log(Number.isInteger(20.0)); // Remember, this is also integer.
console.log(Number.isInteger(20 / 0));

// These methods are useful when we need to read a value coming from a CSS...
*/

//? 167 Math and Rounding.mp4
/*
console.log(Math.sqrt(9));
console.log(9 ** (1 / 2));
console.log(8 ** (1 / 3)); // cubic root only like this. If needed...

console.log(Math.max(23, 5, 9, 10, 15, 69));
console.log(Math.max(23, 5, 9, 10, 15, '69')); // Math.max does type coercion.
console.log(Math.max(23, 5, 9, 10, 15, '69px')); // Math.max doesn't parse.

console.log(Math.min(23, 5, 9, 10, 15, 69));

// A = PI R ˆ 2, area of a circle with 10 pixels.
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Generate random dice numbers:
console.log(Math.trunc(Math.random() * 6 + 1));

// Now let's generalize to create any random number between 2 numbers.

// const randInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min;
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;

// Math.random gives a number between 0 and 1
// Multiplied by (max-min) we get a number between 0 and (max-min)
// Now if we add min to both sides [that's why it is outside of the()]: 0+min = min and (max-min)+min = max
// Now we have min to max.

// console.log(randInt(10, 20));

// Rounding integers
console.log(Math.trunc(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(26.3));
console.log(Math.ceil(26.9));

console.log(Math.floor(29.3));
console.log(Math.floor(29.9));

// floor and trunc do the same when we are dealing with positive numbers.
console.log(Math.trunc(-30.5));
console.log(Math.floor(-30.5));

// So, floor is a little bit better than trunc.

// Rounding decimals.
// This returns STRINGS.
console.log((2.7).toFixed(0)); // no decimal parts
console.log((2.7).toFixed(5)); // 5 decimal parts
console.log((2.345).toFixed(2)); // 2 decimal parts, rounded up.
console.log((2.344).toFixed(2)); // 2 decimal parts, rounded down.

// These 3 returns strings as numbers, to get actually numbers we have to type coerce.
console.log(+(2.7).toFixed(0));
console.log(+(2.7).toFixed(5));
console.log(+(2.12345).toFixed(2));

// The output color on the console is different.
*/

//? 168 The Remainder Operator.mp4
/*
console.log(4 % 2);
console.log(5 % 2);
console.log(8 % 3); // 2*3 + 2

const isEven = n => n % 2 === 0;
console.log(isEven(2));
console.log(isEven(3));

// Let's apply in the application, just for fun.
// we will paint the movements based on some conditions.

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0. 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = '#00ffcc';

    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = '#00ccff';
  });
});
// we have some overlap, but this is just for fun.
*/

//? 169 Working with BigInt.mp4
/*
// Numbers are represented by 64 bits, that means that they have exactly 64 1 or 0's.
// 53 are used to store the number itself, the rest is used to store the decimal point
// and sign. So, there's a limit of how big the numbers can be:
console.log(2 ** 53 - 1); // this is the biggest number JS can represent.
console.log(Number.MAX_SAFE_INTEGER); // it is so important, that it is stored here.
console.log(`---NOW JS IS IN TROUBLE, CANT CALCULATE CORRECTLY---`);
console.log(2 ** 53);
console.log(2 ** 53 + 100);
// For some numbers JS use some tricks behind the scenes and it works, but they are
// not SAFE numbers in JS. And we can face some situations with data coming from other
// languages that contains these kind of numbers.

// In ES2020 was introduced the BigInt, that the numbers are as big as we wanna them to be.
console.log('----BIG INT----');
console.log(654987531465413581681468135168);
console.log(654987531465413581681468135168n); // if we add the n in the end it will transform to big int.
console.log(BigInt(6546598134843));

// Operations with BigInt
console.log(10000n + 10000n);
console.log(65465165165461651146514654n + 654651234684315n);
// console.log(Math.sqrt(16n)); // this doesn't work.

// Cannot mix bigint with other types of numbers.
const huge = 6514165165165165168n;
const num = 20;
// console.log(huge * num); // returns an error, cannot mix BigInt and other types.
console.log(huge * BigInt(num)); // this works.

// Exceptions
console.log(20n > 10);
console.log(20n === 20); // false because they have different types and === doesn't do
// type coercion.
console.log(typeof 20n);
console.log(20n == 20); // true because JS will convert the 20n to regular number
// with type coercion.;

// Strings
console.log(huge + ' is really big!!!'); // JS converts the bigInt to string.

// Divisions
console.log(11n / 3n); // it will cut off the decimal part, looks like it round down.
*/

//? 170 Creating Dates.mp4
/*
// Create a date
// Using new Date w/o parameters.
const now = new Date();
console.log(now);

// Passing in a string:
console.log(new Date('Sep 26 2021 06:30:22'));
// This also works, but not really recommended.
console.log(new Date('August 10, 1978'));
// using accounts information.
console.log(new Date(account1.movementsDates[0]));

// If we type account1 in console, we get the movement dates in an nested array,
// the Z in the end stands for a UTC, Coordinated Universal Time, basically the
// time without any time zone in London, and also without daylight savings.

// My birthday in 2050, the MONTH is ZERO based.
console.log(new Date(2050, 7, 10, 16, 5, 35));

// if we try november 31st, JS will automatically corrects
console.log(new Date(2050, 10, 31));

// Unix Time: January 1st, 1970
console.log(new Date(0)); // here returns dec. 31st 21:00 due to -3 hours GMT.
// 3 days latter then Unix Time:
console.log(new Date(3 * 24 * 60 * 60 * 1000));
// 3 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds.
// Typing 3*24*60*60*100 in console we get 259200000 as return, the time stamp of this date.
*/
/*
// Working with dates
const future = new Date(2050, 7, 10, 16, 5);
console.log(future);
console.log(future.getFullYear()); // we also have getYear, but never use getYear.
console.log(future.getMonth()); // zero based
console.log(future.getDate()); // get the DAY
console.log(future.getDay()); // get the DAY of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // similar to accounts dates strings.
console.log(future.getTime()); // Time stamp since january 1st, 1970
console.log(new Date(2543771100000)); // we can create a new date based on timestamp as well.
console.log(Date.now()); // gives the time stamp right now.

// we can also set the year, month, day, hour... of any date:
future.setFullYear(2060);
console.log(future);
*/

//? 171 Adding Dates to _Bank ist_ App.mp4

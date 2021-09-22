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

//? 144 Creating DOM Elements.mp4 && 160 Sorting Arrays.mp4

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // this line emptys the container, we had 2 movements there by default.

  // if sort is set to true, we will sort a copy of movements (using slice to copy), if set
  // to false, we will return to movements orignal.
  // We will add a event listener in the end of the code with the sortBtn setting
  // sort to true when clicked.
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); // google mdn insertAdjacentHTML to see all the methods.
  });
};
// displayMovements(account1.movements);

// Calculating and displaying balance
// The labelBalance was already selected, just inspect the balance element.
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);
// Note that again we are callling it with account 1 data and later on we will take care of that.
// Just like we did with displayMovements.

// Sumary of incomes.
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  // lets say that the bank pays 1.2% of each amount deposited. The amount must be
  // above 1 euro.
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // just values above 1 euro gets interest
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1.movements);

// Creating the usernames.
const createUsernames = function (accs) {
  //accountS
  accs.forEach(function (acc) {
    // each acount
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);

  // display balance
  calcDisplayBalance(acc);

  // display summary
  calcDisplaySummary(acc);
};

//? 155 Implementing Login
// Event handler
// Since this is a button in a form element, the page shows 'login' and quickly reload,
// this is the default behavior of a submit button in html.

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // e stands for event.
  // this will prevent the form from submitting.
  e.preventDefault();
  //  console.log('login'); // any enter in USER or PIN forms will trigger the login.
  // checking the user
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  // checking the pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //console.log('login');
    //if we type a user that is not in the accounts, it will return error undefined. Added the ? in the currentAccount?.pin
    // display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100; // with the correct login the opacity returns to 100 and the
    // elements are now visible.

    // Clear the input fields as sucessifully login
    inputLoginUsername.value = inputLoginPin.value = '';
    // Looses the focus of Login field as logs in.
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

//? 156 - Implementing Transfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // avoid automatically reload, pretty common.
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 && // amount greater than 0
    receiverAcc && // receiver acc must be valid
    currentAccount.balance > amount && // balance greather than transfer amount
    receiverAcc?.username !== currentAccount.username // can't transfer to myself and receiverAcc? must exist.
  ) {
    // with this cl we tested if the transfer was valid, and found a bug.
    // and included the receiverAcc to chek if the receiver account exists.
    // console.log('transfer valid');
    // Doing the transfer.
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

//? 158 - some and every
// Request Loan
// The bank only grant the loan if we have at least one deposit with 10% of the requested amount.

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  // Clear the field value
  inputLoanAmount.value = '';
});

// since this is a very simple program, we could request 10, 100, 1000, 10000, 100000...
// because every time the previous loan will grant the next one 10 times bigger.

//? 157 The findIndex Method.mp4
// Very similar to find, but returns the index instead of the item of the array.
// A good use case is for the Close account, in this application it is basically to delete the account
// from the accounts array.

// Both find and findIndex gets access to index and the entire array also. JS never found
// a use case for that. They were also introduced in ES6, so will not work in super old browsers.

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('delete');

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //indexOf(some value) will search if the value exists or not, the findIndex method
    // allows us to create a more complex expression like we did above.
    console.log(index);

    // Delete account
    accounts.splice(index, 1); // this will delete the index item in the acounts array.

    // Hide UI
    containerApp.style.opacity = 0;

    // if we type accounts in the console now, we will see that we have only 3 arrays
    // and the jonas object is no longer there.
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//? 160 - sorting
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; // inverting from true to false or false to true.
});
// So here we set the sorted variable to false, and each time the button is clicked
// it's value change from false to true or true to false.

///////////////
inputLoginUsername.value = 'js';
inputLoginPin.value = 1111;
btnLogin.click();

//? 148 Computing Usernames.mp4
/*
// const user = 'Steven Thomas Williams'; // username should be stw

// 1st
// const username = user.toLowerCase().split(' ');
// console.log(username);

// 2nd
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(function (name) {
//     return name[0];
//   });
// console.log(username);

// 3rd
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(function (name) {
//     return name[0];
//   })
//   .join('');
// console.log(username);

// Refactoring...
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(name => name[0])
//   .join('');
// console.log(username);

// Putting inside a function...

// const createUsernames = function (user) {
//   const username = user
//     .toLowerCase()
//     .split(' ')
//     .map(name => name[0])
//     .join('');
//   return username;
// };
// console.log(createUsernames('Steven Thomas Williams'));

// Now to compute the names of each account at accounts array, should we
// use map or forEach method? In this case we do not want to create a new array
// We want to modify the objects, so we will use forEach.

const createUsernames = function (accs) {
  //accountS
  accs.forEach(function (acc) {
    // each acount
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts); // now we have a new object username.
*/
// End of 148

//? 149 The filter Method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
// Deposits
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
// The filter method also has access to index and array, but Jonas never used it in his life. :)

console.log(movements);
console.log(deposits); // only the positive values.

// Withdraws
const withdraws = movements.filter(mov => mov < 0);
// const withdraws = movements.filter(mov => RETURN mov < 0);
// The arrow function works because it is like we had the return written like this.

console.log(movements);
console.log(withdraws); // only the negative values.

// Same result with a for loop.
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// When we use the methods we can chain the methods together, which is impossible with the
// for loop. Latter on we will make some big chain array methods.

// End of 149
*/

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

//? 140 Simple Array Methods
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

//? 141 Looping Arrays_ forEach.mp4
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

//? 142 forEach With Maps and Sets.mp4
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

//? 143 PROJECT_ _Bankist_ App.mp4
// project overview

//? 145 Coding Challenge #1.mp4
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array 
(one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at 
least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, 
and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 
is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = function (dogsJulia, dogsKate) {
//   const correctedDogs = dogsJulia.slice(1, 3).concat(dogsKate);
//   console.log(correctedDogs);

//   correctedDogs.forEach(function (dogAge, i, arr) {
//     if (dogAge >= 3) {
//       console.log(
//         `Dog number ${i + 1} is an adult, and is ${dogAge} years old`
//       );
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶"`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log('-----2nd call-----');
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// Instructor Solution
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);

//   dogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶"`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log('-----2nd call-----');
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// 146 Data Transformations_ map, filter, reduce.mp4

// Map, filter and reduce.
/* 
Map is a method to perform a task in all items of the array and it returns a new array
containing the result of the task, like all items * 2. In forEach it returns the same array
Map returns a new one.

Filter returns a new array with all the items that returned true to a given condition, 
like item > 2.

Reduce reduces the elements of an array to one value using a accumulator, like a snowball it can sum up 
all the elements. The array [2,3,4] would return 2+3+4=9 if the operation defined is a sum.
*/

//? 147 The map Method.mp4
/*
const euroToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
});
console.log('---Using map, the original array remains untouched.---');
console.log(`Original: ${movements}`);
console.log(`New returned array: ${movementsUSD}`);

// Using a for loop to do the same.
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);

console.log(`Using for loop: ${movementsUSDfor}`);

// The map method is much more aligned with functional programming, which is a modern
// direction of modern JS.

// Some people say that the readability of arrow function is worst because it misses
// the 'function' and 'return' statemens, however the code is cleaner and indeed it is a
// function that returns a result.

const movementsUSDArrow = movements.map(mov => mov * euroToUsd);
console.log(`Using arrow function: ${movementsUSDArrow}`);

console.log(movementsUSDArrow);
console.log([movementsUSDArrow]);

// Returning an array with all the movements.

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1} You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescription);

// So we can see that is completely acceptable to have 2 returns or more in the same
// function, as long as only 1 is executed.

// The result on screen of the map and the forEach is similar, but there's a BIG difference
// between them, on the forEach we printed each line individually to the console as they were looping
// over the array. Each iteration generates an action that was then visible to the console.
// We can call this side effect. So the forEach method creates side effects.
// With the map method we returned each of the strings from the callback function, basically
// they got added to a new array., and then finally we logged the entire array and not the elements
// one by one, we not created side effects at each iteration.

*/

//? 150 The reduce Method.mp4
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// // Accumulator is like the SNOWBALL
// const balance = movements.reduce(function (acc, curr, i, arr) {
//   //accumulattor, current, index, array
//   console.log(`Iteration number ${i}: ${acc}`);
//   return acc + curr;
// }, 0);
// console.log(balance);

// Rewritting in Arrow Function - Accumulator is like the SNOWBALL
const balance = movements.reduce((acc, curr) => acc + curr, 0);
console.log(balance);

// The callback function:
// (function (acc, curr, i, arr) {return acc + curr};
// is the FIRST parameter of the REDUCE method, and it actually has a second parameter.
// That is the initial value of the accumulator.
// }, 0); // this is the part where we specify the initial value of the accumulator.

// It could be done like this:
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);
// But then a 2nd variable would be necessary.

// Maximum value of the array using reduce method.
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  // if the accumulator is bigger, return it, otherwise return the movement
  else return mov;
}, movements[0]); // important to notice, we shouldn't put always 0 here. If the 1st value of the array is different then 0 could jeopardize the entire calculation.
console.log(max);
*/

//? 151 Coding Challenge #2.mp4

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog
ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'),
and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2
years old, humanAge = 2 * dogAge. If the dog is > 2 years old, 
humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as 
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from 
other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


const ages = [5, 2, 4, 1, 15, 8, 3];

// 1
// const humanAges = ages.map(function (age) {
//   const dogAge = age <= 2 ? age * 2 : 16 + age * 4;
//   return dogAge;
// });
// console.log(humanAges);

// 2
// const humanAges = ages
//   .map(function (age) {
//     const dogAge = age <= 2 ? age * 2 : 16 + age * 4;
//     return dogAge;
//   })
//   .filter(function (humanAge) {
//     return humanAge > 18;
//   });
// console.log(humanAges);

// 3

// const humanAges = ages
//   .map(function (age) {
//     const dogAge = age <= 2 ? age * 2 : 16 + age * 4;
//     return dogAge;
//   })
//   .filter(function (humanAge) {
//     return humanAge > 18;
//   })
//   .reduce(function (acc, curr) {
//     return acc + curr;
//   }, 0);

// console.log(humanAges);

// const humanAges = ages
//   .map(function (age) {
//     const dogAge = age <= 2 ? age * 2 : 16 + age * 4;
//     return dogAge;
//   })
//   .filter(humanAge => humanAge > 18)
//   .reduce(function (acc, curr) {
//     return acc + curr;
//   }, 0);

// console.log(humanAges);
//1
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(humanAges);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

//2
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adultDogs = humanAges.filter(age => age >= 18);
//   console.log(humanAges, adultDogs);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

//3
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adultDogs = humanAges.filter(age => age >= 18);
  const average =
    adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;
  // console.log(humanAges);
  // console.log(adultDogs);
  // console.log(average);
  return average;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

// Another way of calculating the average:
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adultDogs = humanAges.filter(age => age >= 18);
//   const average = adultDogs.reduce(
//     (acc, age, i, arr) => acc + age / arr.length, // instead of / in the end, we divided
//     0                                             // each element by the length of the
//   );                                              // array. Good use case for the arr parameter.
//   // console.log(humanAges);
//   // console.log(adultDogs);
//   // console.log(average);
//   return average;
// };

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(avg1, avg2);
*/

//? 152 The Magic of Chaining Methods.mp4
/*
// take all movements deposits, convert from eur to usd, and then sum them up
const euroToUsd = 1.1;
console.log(movements);

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// Can be hard to debug if we have a mistake. Let's say we wrogngly
// selected mov < 0 instead of mov > 0, the debug would be:

// const totalDepositsUSD = movements
//   .filter(mov => mov < 0)
//   // .map(mov => mov * euroToUsd)
//   .map((mov, i, arr) => {
//     console.log(arr);
//     return mov * euroToUsd;
//   })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

//* So basically we can check the current array in the next chain method.

// Now let's calculate the Summary of the account.

//* Chaining can cause perfromance issues in huge arrays, that can be true with map methods
//* sometimes we create way more map methods than we need, because it would be possible
//* to do all in one map call.

//! It is bad practice in JS chain methods that mutate the original array. Like the splice method.
//! Usually we shouldn't chain splice, reverse etc...

//* In large scale applications it's usually a good practice to avoid mutating arrays.
*/

//? 153 Coding Challenge #3.mp4

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adultDogs = humanAges.filter(age => age >= 18);
  const average = adultDogs.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  return average;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

const calcAverageHumanAgeArrowChain = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age > 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avgArrow1 = calcAverageHumanAgeArrowChain([5, 2, 4, 1, 15, 8, 3]);
const avgArrow2 = calcAverageHumanAgeArrowChain([16, 6, 10, 5, 6, 1, 4]);
console.log(avgArrow1, avgArrow2);

//* As the methods here mutate the array, the only way of calculating the average
//* is the 2nd method shown in 151. Which is dividing each element by the arr.length
//* immediately. In the other example we divided the sum of all elements by adults.length.
//* Since here we are not storing the array, we have to do in this second way. Using
//* the arr.length used in reduce method.
*/

//? 154 The find Method.mp4
/*
// The find method will return the first element of the array that satisfies the condition.
// The filter method, returns a NEW array with ALL the elements that satisfies the conditions stated.

const firstWithdrawl = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawl);

//* Filter returns all the elements, find only returns the 1st one to satisfy the condition
//* Filter method returns a NEW array, find only returns the element itself.

// Let's start to work with the accounts array.
console.log(accounts);

// Search for Jessica Davis account complete info:
const account = accounts.find(acc => (acc.owner = 'Jessica Davis'));
console.log(account);

//* We use the find method when we want to find the only element that satisfies
//* the given condition.

// Small Challenge - Do the same with for loop.
for (const accountFor of accounts) {
  if ((accountFor.owner = 'Jessica Davis')) {
    console.log(`same with for for loop:`);
    console.log(accountFor);
  }
}
*/

//? 158 some and every.mp4
/*
// Testing for EQUALITY
console.log(movements);
console.log(movements.includes(-130));

// Testing for a CONDITION
// Is there any deposit in the account?
// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// SOME: CONDITION
// Is there any deposit above 500 in the account?
const anyDeposits = movements.some(mov => mov > 500);
console.log(anyDeposits);

// In the first method it tests for equality, in the second it tests for a condition.

// This also works
console.log(movements.some(mov => mov === -130));
// But doesn't make much sense, includes is easier.

// EVERY
// Only returns true if all the elements on the array satisfies the condition.

// Check if all the movements are positive.
console.log(movements.every(mov => mov > 0));

//on account 4 this is true. This account has only deposits.
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
console.log('Calling with a function');
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

//? 159 flat and flatMap.mp4
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arrDeep.flat()); // This returns still a nested array
// So the flat method goes one level deep.

console.log(arrDeep.flat(2));
// The 2 indicates we go 2 level nested.

// If the bank wants to calculate the overall balance of all movements of all accounts.

// This is how we built it...
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overalBallanceSeparate = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBallanceSeparate);

// And chainned...
const overallBallance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBallance);

// It's pretty common to use a map and then flat, so we have a flatmap function.
// flatMap
const overallBallance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBallance);

// flatMap only goes 1 level deep and we cannot change it.
// If more than 1 level needed, gotta go with flat.
*/

// 160 Sorting Arrays.mp4

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Matha'];
console.log(owners.sort());
//* This method MUTATES the array.
console.log(owners);

// Numbers
console.log(movements);
// console.log(movements.sort());
// Doesn't make much sense, because it converts everything to strings and sort
// If we look it like that, it makes more sense, the - will always come first.
// Then one, two, three, four, seven...

// if return <0, A comes before B (keep order)
// if return >0, B comes before A (swith order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
// console.log(movements);

// so, if a is bigger than b, a-b will always returns something positive
// if a is smaller than b, a-b will always returns something negative
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
// console.log(movements);

movements.sort((a, b) => b - a);
console.log(movements);

// A mixed array with strings and numbers will not work!!!

// https://medium.com/coding-at-dawn/how-to-sort-an-array-numerically-in-javascript-2b22710e3958#:~:text=sort((a%2Cb)%3D,sorting%20by%20using%20the%20syntax%20%5B%E2%80%A6

'use strict';

//126 Default Parameters.mp4
/*
const bookings = [];

// So this way the cl returns undefined for numPassengers and price:

// const createBooking = function (flightNum, numPassengers, price) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');

// now setting default values before ES6 we have the numPassengers and price values.

// const createBooking = function (flightNum, numPassengers, price) {
//   numPassengers = numPassengers || 1; // if numPassengers is undefined then it will be set to 1
//   price = price || 199;
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');

// Now with ES6
// const createBooking = function (flightNum, numPasserngers = 1, price = 199) {
//   const booking = {
//     flightNum,
//     numPasserngers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 300);

// we can even use parameters defined in the list to calculate

const createBooking = function (
  flightNum,
  numPasserngers = 1,
  price = 199 * numPasserngers
) {
  const booking = {
    flightNum,
    numPasserngers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 300);
createBooking('LH123', 2);
createBooking('LH123', 5);

// if we want to pass only the flight an price we have to set
// numPassengers to undefined
createBooking('LH123', undefined, 1000);
// If not set, the 1000 will become the number of passengers
createBooking('LH123', 1000);
*/

//127 How Passing Arguments Works_ Value vs. Reference.mp4
/*

const flight = 'LH234';
const paolo = {
  name: 'Paolo Fullone',
  passport: 23456798135,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr ' + passenger.name;

  if (passenger.passport === 23456798135) {
    // pretending we get the passport number from another enviroment.
    alert('Check in');
  } else {
    alert('wrong passport!');
  }
};

checkIn(flight, paolo);
// console.log(flight);
// console.log(paolo);

// so the flight passed in checkIn is a primitive type, just a string
// That's why even the flightNum is changed inside the function it is not
// reflected in the console. Because when we call the function is the same as:
// const flightNum = flight;

// when we pass a reference type to a function, what is copied is really just a reference
// to the object in the memmory heap but they both point to the same object in memory, the same as:
const passenger = paolo;

// SUMMARY: passing a PRIMITIVE type to a function is really just the same as
// creating a copy outside of the function.
// On the other hand, when we pass an OBJECT it is really just like copying an object
// like const passenger = paolo so wherever we change on a copy will also happn in the
// original

// This is very important, due to this behavior of objects it can have unforseable
// consequences in large code bases. And specially when coding with other developers.

// now with this manipulation of the passport object it will impact in the first function.
// now if we call checkIn again with the same parameters we will receive a 'wrong passport'
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(paolo);
checkIn(flight, paolo);
// console.log(paolo);
*/

// 128 First-Class and Higher-Order Functions.mp4

// JS treats functions as FIRST-CLASS CITZENS, this means that funcions are
// SIMPLY VALUES, in JS funcitons are just another "TYPE" OF OBJECT.
// Since functions are values, we can store them inside other objects as we did before.
// We can pass functions as arguments to other functions. As we did with addEventListener.
// We can return a function from another function...
// We also have some methods we can use on functions.¼

// 129 Functions Accepting Callback Functions.mp4
/*
// let's create a function that accepts other functions as input.

// Takes any word and returns w/o space and in lower case.
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

// here we didn't called the function upperFirstWord, because we dont have the ()
// instead, it will become the 'fn', inside the transformer function.
transformer('Java script is the best!', upperFirstWord);
console.log('');
transformer('Java script is the best!', oneWord);

// So upperFirstWord and oneWord are callback functions. Because we do not call them ourselves, we tell JS do do it later;
// JS uses callbacks all the time. It's easier to read the code. And it is possible to create ABSTRACTIONS.
// As an example the transformer function does not worry how the transformation is done, this is in another function.
// That's why the function is called High-Order, it leaves the low level details to other functions.

const high5 = function () {
  console.log('👋');
};

// with this one, when we click a 👋 is shown in console
document.body.addEventListener('click', high5);

// this will returns 4 high5's.
['Luca', 'Manuela', 'Kely', 'Paolo', 'Joe'].forEach(high5);
*/

// 130 Functions Returning Functions.mp4
/*
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Paolo');
greeterHey('Joe');

// greeterHey became:
// function (name) {
//     console.log(`${greeting} ${name}`);
//   };

// if we wan't to call in one line:
greet('Hi there')('Paolo');
// greet('Hi there') is transformed to a function, that can be called adding ()
// just like any other function, we did it with ('Paolo').

// This will be very usefull in functional programing.

// Challenge using arrow function

const greetArrow = greetingArrow => {
  return nameArrow => {
    console.log(`${greetingArrow} ${nameArrow}`);
  };
};

greetArrow('Hi there using arrow')('Paolo');

// teacher solution:

const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hey arr teacher solution')('Paolo');
*/

// 131 The call and apply Methods.mp4
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // We will start to use book () {} instead of book function () {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Paolo Fullone');
lufthansa.book(239, 'Kely Fullone');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// If we do this:
const book = lufthansa.book;
// // and:
// book(5, 'Joe');

// we will receive a Uncaught TypeError: Cannot read properties of undefined (reading 'airline')
// because the book function will become just a regular function call (not a method anymore) and in a regular function call
// the this keyword points to undefined in 'strict mode'.

// so we need to tell JS explicitelly what this keyword should be (lufthansa or eurowings)

// with the CALL method, we used the call method wich will call the book function
// passing eurowings as this keyword.
book.call(eurowings, 5, 'Joe');
console.log(eurowings);

book.call(lufthansa, 239, 'Luca Fullone');
book.call(lufthansa, 239, 'Manuela Fullone');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 964, 'Joe Fullone');
book.call(swiss, 964, 'Lola Fullone');

// APPLY method (must use an array with the data), not much used anymore in JS.
const flightData = [964, 'Joe 2'];
book.apply(swiss, flightData);
book.apply(swiss, [964, 'Lola 2']);
console.log(swiss);

// nowadays we use:
book.call(swiss, ...flightData);

// 132 The bind Method.mp4

// let's say we want to use the this keyword to eurowings all the time

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(294, 'Joe Fullone');

// We can use bind to specify an airline AND a flight number
// when we set part of the arguments of an function, this is called PARTIAL APPLICATION.
const bookEW294 = book.bind(eurowings, 294);
bookEW294('Luca Fullone');
bookEW294('Manuela Fullone');

// With Event Listeners
// with this code, if we click on "Buy new plane"

// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log('This keyword right now:');
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// we will receive a NaN as a result, because at this moment the this keyword becomes
// the button element. In a event handler function the THIS keyword ALWAYS points to
// the element on which the handler is attached to.
// handler = lufthansa.buyPlane
// element = document.querySelector('.buy')

// Another proof that the THIS keyword is set dinamically.
// if we call lufthansa.buyplane() out of the code it will work as needed

// Now let's mannually define the this keyword adding the .bind(lufthansa)

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log('This keyword right now:');
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application

// this will apply the tax to a value
const addsTax = (rate, value) => value + value * rate;
console.log(addsTax(0.1, 200));

// now let's say there's one tax we use all the time
const addVAT = addsTax.bind(null, 0.23); // we use null because here the this keyword doesn't matter in the funciton.
// addVAT = value => value + value * .23; // same as above

console.log(addVAT(100));

// Challenge with the function returning a function

// const addsTaxFun = function (rate, value) {
//   value = value * rate;
//   return function addsVATFunc(VATFunc) {
//     value = value * VATFunc;
//     console.log(value);
//   };
// };
// addsVATFunc(0.23, 100);

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT23 = addTaxRate(0.23);
console.log(addVAT23(100));
*/
// 133 Coding Challenge #1.mp4
///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 
two things:
  1.1. Display a prompt window for the user to input the number of the selected option. 
  The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option 
  is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the 
  input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, 
  right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a 
string as an input (called 'type'), which can be either 'string' or 'array'. If type is
 'array', simply display the results array as it is, using console.log(). This should be
 the default option. If type is 'string', display a string like "Poll results are 13, 2, 
 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. 
Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object!
So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnser: function () {
    const q = window.prompt(`${poll.question}\n${poll.options}`);
    q >= 0 && q <= 3
      ? (poll.answers[q] += 1)
      : prompt(`Invalid Option...\n ${poll.question}\n${poll.options}`),
      console.log(poll.answers);
    poll.displayResults();
  },
  displayResults: function (type = 'array') {
    if (type === 'array') {
      console.log(poll.answers);
    } else {
      console.log(`Poll results are ${poll.answers}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnser);
*/
/*
// Video solution:
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get the answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n('Write option number')`
      )
    );
    console.log(answer);
    // Register the answer (update)
    // Using SHORT CIRCUITING, if any of these conditions is false, it will not update
    // the answer array at the end.
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    // console.log(this.answers);
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // poll results are 13, 2, 4, 2
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

// reminding that if we do like this:
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer);
// we will get a UNDEFINED at the this keyword, because it will point to the object button
// so we have to use bind.

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// poll.registerNewAnswer();
// console.log(poll.answers);
// if we want to transform an array to string we can use .join as above

// to bonus challenge we don't want to use the poll.answers array, instead
// we want to use a given array, so we have to use .call method.
// in order to use all the functionalities of the poll const, we name a new object answers
// and pass the given array.
// Basically we had to make this.answers point to this new array.
const bonusArr = [5, 2, 3];
poll.displayResults.call({ answers: bonusArr });
poll.displayResults.call({ answers: bonusArr }, 'string');

const bonusArr2 = [1, 5, 3, 9, 6, 1];
poll.displayResults.call({ answers: bonusArr2 });
poll.displayResults.call({ answers: bonusArr2 }, 'string');
*/

// 134 Immediately Invoked Function Expressions (IIFE).mp4
// sometimes in JS we need a function that is executed once and then never again
// it is useful for async/await. The function will executes and then disappears.
/*
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();
runOnce();

// clearly we can run it as many times as we want, if we take out only the function:
// function () {
//   console.log('This will never run again');
// };
// we receive an error informing that Function statements require a function name

// But we can trick JS by wrapping the function in ()
(function () {
  console.log('This will never run again');
});

// this way we get no error, and adding a () in the end we can call the function.
(function () {
  console.log('This will never run again');
  const isPrivate = 25;
})();

// IIFE - Immediately Invoked Function Expression

// The same works for arrow function
() => console.log('This will also never run again');
// (() => console.log('This will also never run again')); wraped in () - VS removes it...
(() => console.log('This will also never run again'))(); // and wwraped and () in the end to call

// Remembering scope chain, we cannot access a variable created inside a function in
// the global scope, this is why the variables created inside the functions are called
// private variables.
// For example if we try to acces the variable defined inside the function:
// console.log(isPrivate);
// we receive a ReferenceError saying that the variable was never created.

// The scope chain works the other way around, we can indeed access a global scope variable
// inside a function.
// So we need data encapulating and data protections, this will be shown in detail
// in Object Oriented section.

// IIFE it's not a feature, but a pattern created by some JS developers.

// In ES6 variables declared with let or const create their own scope inside a block.
// Then IIFE is not that used anymore in modern JS.

{
  const isPrivate = 20;
  let isAlsoPrivate = 30;
  var notPrivate = 40;
}
// console.log(isPrivate);
// console.log(isAlsoPrivate);
console.log(notPrivate);

// so we don't need to create a function to create a new scope, just involve it in {}

// if what you really need is just execute a function once, IIFE is still the way to go.
*/

// 135 Closures.mp4
/*
// almost MYSTICAL feature in JS, brings execution contest, call stack, scope chain
// concepts together in a beautiful and almost magical way!

// A closure is not a feature that we explicity use as a function, array etc. It simply
// happens in some situations, we need to recognize these situations.

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const passengerCount = 10;
const booker = secureBooking();
booker();
booker();

// So, the passengerCount when we call the function brooker() once, turns to 1,
// despite the other passengerCount declared as const in purpose on the global escope

// Describing as the lecture:
/* Before we start running the secureBooking function down in the code, our code is
running in the Global Execution Context and we only have the secureBooking function.
in the CALL STACK, then we also only have the secureBooking function in the GLOBAL SCOPE.

When secureBooking is executed, a new secureBooling EC is put on top of the Global EC
in the CALL STACK, each EC contains its own variable enviroment which contain all it's local
variables. In this case it only contais passenger count set to zero. So passengerCount
is in the local scope but also gets access to all variables in parents scope, 
in this case just a global scope.

The secureBooking function returns another function that updates the passengerCount variable
and we stored the secureBooking inside the booker variable. So the Global Context also
contais the booker variable.

When the secureBooking function returns it's Execution Context pops off the stack and disappears. 
So the secureBooking function has done its job and now finished the execution. 
IMPORTANT TO BE AWARE AND TO KEEP IN MIND.

How can the booker function update the passengerCount variable defined in the secureBooking function 
that actually has already finished executing? secureBooking already executed and it's gone. But 
the booker function is still able to access the passengerCount variable inside the passengerCount function.
This is possible due the CLOSURE.

So, the booker function "booker()" is a function that exists in the global scope and the enviroment in which 
the function was created no longer exists. But sill the booker function has access to the variables that
were present at the time that the function was created. In this particular case the passengerCount variable.
That's what the closure does.

The closure makes a function remember all the variables that existed at the functions birthplace essentially.
We can imagine the secureBooking as the birthplace of the function that increments the number of passengers.

function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };

The function remembers everything at its birthplace by the time it was created. This cannot be explained with the
scope chain alone.

Watch from min 8:45
135 - closures 1 - shows call stack and scope chain after the const booker creation and before we call the booker function.
It is important to remember that the secureBooking EC is no longer in the call stack. 

Now, when we run the booker function that is located in the global scope.
As soon as we run it, a new booker EC is created and put on top of the call stack. 
The variable enviroment of this EC is empty because there are no variables declared in the function. 
The scope chain will have a child scope from global scope that contains no variable but contains 
the secureBooking and booker functions. But any function always has access to the variable enviroment
of the Execution Context in which the function was created. In the case of booker, this function was created, 
it was born, in the EC of the secureBooking, which was popped of the stack previously. But the booker function
will get access to the popped EC which contains the passengerCount variable. And this is how the function
will have access to the variable and manipulate it.

Thanks to the CLOSURE a function never looses connection to the variables that were created at the functions birthplace.

The function attempts to increase the passengerCount variable, however the variable is not in the current scope.
And so JS will immediately look in the closure and see if it can find the variable there. This is done BEFORE looing
in the scope chain. If we have a GLOBAL passengerCount variable set to any value, it will first use the one in closure.
So the CLOSURE has priority over the SCOPE CHAIN.

*/
// So if we type:
// console.dir(booker);

// And check the anonymous function at the console we will see a:
// [[Scopes]] that contains the closure coming from secureBooking
// So the Closure is the variable enviroment of the secure booking.

// BTW whenever we see a [[]] it is a property we cannot access from the code.

// 136 More Closure Examples
/*
/// Example 1

// let f;
// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// g();
// f();
// console.dir(f);

// so we defined the f variable in the global scope
// called g function that only sets const a as 23 and disapears from the call stack
// called f function that is inside the g function which has already closed its variable environment
// but it was still able to access the a variable defined in g function environment.

// So the 'a' variable is inside the backpack of the f()

// Now taking to the next level:

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// so we can see that the variable was reassigned, first it had the a value of 23
// and then it had the b value of 777 inspecting the closure in [[Scopes]]

// So it proves that closure never looses connection with the variables that were present
// at its birthplace.

/// Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers.`);
  }, (wait = 1000));

  console.log(`Will start boarding in ${wait} seconds.`);
};

// This will print timer in the console after 1 second.
// This is a callback function, literaly called 1 second latter.
// setTimeout(function () {
//   console.log('Timer');
// }, 1000);

// Proofing that the closure has priority over the scope chain.

const perGroup = 8888; // if we comment out the const perGroup inside the boardPassengers it will use this one.
// and w/o the comment it uses the value inside the boardPassengers function.

boardPassengers(180, 3);

// so due the setTimeout function, the callback function:

// setTimeout(function () {
//   console.log(`We are now boarding all ${n} passengers.`);
//   console.log(`There are 3 groups, each with ${perGroup} passengers.`);
// }, (wait = 1000));

// Was completely independently from the boardPassengers function, it was called
// 3 seconds latter. But still was able to use all the variables of the enviroment
// of the boardPassengers. In this case, n and perGroup. One more time a clear sign
// of a closure being created.

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';
//   (function () {
//     document.body.addEventListener('click', (header.style.color = 'blue'));
//   });
// })();

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

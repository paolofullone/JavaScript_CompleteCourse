'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const restaurant = {
  nameRestaurant: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // so as soon as this function is called it will destructure the input and log it to console.
  // and we can also have some default values, if not informed it will be filled automatically
  oderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} 
      and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log('');
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
// 124 String Methods Practice.mp4
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// console.log(flights.split('+'));

// function defined outside the for loop for the last formatting
const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  // we used this to see how it would look like
  // console.log(flight.split(';'));

  // Now starting to build the outputs...
  const [type, from, to, time] = flight.split(';');
  // first
  // const output = `${type} ${from} ${to} ${time}`;
  // console.log(output);

  // then...
  // const output = `${type.replaceAll('_', ' ')} ${from} ${to} (${time.replace(
  //   ':',
  //   'h'
  // )})`;

  // then...
  // const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
  //   '_',
  //   ' '
  // )} ${from} ${to} (${time.replace(':', 'h')})`;
  // console.log(output);

  // at the end...

  const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(40);
  console.log(output);
}

// the padStart at the end of the string could also be added to the cl line,
// but if we do in the string than it can be used somplace else. And we included
// just to make easier to read the frase.

// 123 Coding Challenge #4.mp4
///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀


// this code returns one check button for each row
// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// const text = document.querySelector('textarea').value;

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   // console.log(text);
//   const rows = text.split('\n');
//   console.log(rows);
//   for (const row of rows) {
//     const [first, second] = row.toLowerCase().trim().split('_');
//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(`${output.padEnd(20)}✅`);
//   }
// });

// Now to include all the checks we must use the index of the item,
// with entries and destruct the array

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const text = document.querySelector('textarea').value;

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  // console.log(text);
  const rows = text.split('\n');
  console.log(rows);
  for (const [i, row] of rows.entries()) {
    // we changed here!!!
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});

// 122 Working With Strings - Part 3.mp4
/*
// Split and Join

console.log('a+very+nice+string'.split('+'));
console.log('Paolo Enrico Iacono Fullone'.split(' '));
const [firstName, lastName] = 'Paolo Enrico Iacono Fullone'.split(' '); // not yet...
console.log(firstName, lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  console.log(names);

  const namesUpper = [];

  for (const n of names) {
    // Takes the first letter, puts in uppercase and adds the rest of the name.
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
    // Replacing the first letter gives the same result
    // namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('luca SCHERRER fullone');
capitalizeName('paolo enrico iacono fullone');

// Padding
const message = 'Go to gate 23';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Paolo'.padStart(20, '+').padEnd(30, '+'));

// Masking credit card with padding
const maskCreditCard = function (number) {
  // we can transofrm a number into a string using String(number)
  // but we can also use the method below, because when opne of the operands of the plus
  // sign is a string, it will convert all the operands to a string.
  const str = number + '';
  const last = str.slice(-4); // taking the last 4 numbers
  return last.padStart(str.length, '*'); // now we took only the last 4 numbers and completed them with * using the length of the initial number.
};

console.log(maskCreditCard(1234567890));
console.log(maskCreditCard(12345678901234));
console.log(maskCreditCard(123456789012345678n));

// Repeat
const message2 = 'Bad wather... All Departures delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};

planesInLine(3);
planesInLine(9);
planesInLine(12);

// 121 Working With Strings - Part 2.mp4
/*
const airline = 'TAP Air Portugal';
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
console.log('paolo'.toUpperCase());

// Fix capitalization in name
// const passenger = 'pAolo';
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// Encapsulating on a function:

const nameCorrector = function (passenger) {
  const passengerLower = passenger.toLowerCase();
  const passengerCorrect =
    passengerLower[0].toUpperCase() + passengerLower.slice(1);
  console.log(passengerCorrect);
};

nameCorrector('kelY');

// Comparing a user input email, it's the same email but the 2nd one has capitalization issues and spaces
const email = 'scalabosh@paolo.io';
const loginEmail = '  SCALAbosh@paolo.io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);

// we could do it in one step?
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing parts of strings:
const priceBR = '288,97R$';
const priceUS = priceBR.replace('R$', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
// this returns a first boarding gate 23, but second still gets door.

// nowadays we already have .replaceAll
console.log(announcement.replaceAll('door', 'gate'));

// When the video was recorded still not available, so the usage of a regular expression:
console.log(announcement.replaceAll(/door/g, 'gate')); // had to put the first word between // and g that stands for global.
// the replace method is also case sensitive.

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320')); //true
console.log(plane.includes('Boeing')); //false
console.log(plane.startsWith('Air')); // true

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

// Practice exercise - check if the baggage is allowed in the plane

const checkBaggage = function (items) {
  const baggage = items.toLowerCase(); // this is very important, if we take it out
  // the code will not detect the knife and the gun with K and G.
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard');
  }
};

checkBaggage('I have a laptop, some Food, and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a Gun for protection');

// 120 Working With Strings - Part 1.mp4
/*
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);
console.log('B737'.length);

// whats the position of r in the airline const?
console.log(airline.indexOf('r'));

// whats the position of the last r in the airline const?
console.log(airline.lastIndexOf('r'));

// whats the position of the Portugal word on the string? This one is case sensitive.
console.log(airline.indexOf('Portugal'));
console.log(airline.indexOf('portugal')); // this returns -1, not exist

// Position which the extraction will start
console.log(airline.slice(4)); // returns a sub string Air Portugal and doesn't change the string.

// It's impossible to mutate strings because they are primitives.

// returns a sub string Air and does not include the last value 7.
// The length will always be last - begining, or 7-4=3 in this example.
console.log(airline.slice(4, 7));

// How to extract the 1st word of a string w/o hardcode it?
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // w/o the +1 we get an space before the last word.

// start extracting from the end:
console.log(airline.slice(-2));
console.log(airline.slice(1, -1)); // cuts the 1st and last letter

// check if you got a middle seat on an airplane.
const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😟');
  else console.log('You got lucky 😎');
};

// When we call a primitive string in a method, JS behind the scenes convert that primitive
// to a string object with the same content. On that object the methods are called, the process
// is called boxing, because it takes that string and puts on a box.
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');
checkMiddleSeat('4A');

// this is what happens in boxing. Theory explanation showing why it works.
console.log(new String('Paolo'));
console.log(typeof new String('Paolo')); // this shows that is a object
console.log(typeof new String('Paolo').slice(1)); // this shows that is a string again

// 119 Coding Challenge #3.mp4
///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. 
The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes 
  plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game 
events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 
  90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of 
the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
* /

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1. Create an array 'events' of the different game events that happened (no duplicates)
const eventsArr = [];
for (let event of gameEvents.values()) {
  eventsArr.push(event);
}
const eventsArrUnique = [...new Set(eventsArr)];
console.log(eventsArrUnique);

// teachers solution
// const eventsTeacher = new Set(gameEvents.values()); // 1st
// const eventsTeacher = [new Set(gameEvents.values())]; // 2nd
const eventsTeacher = [...new Set(gameEvents.values())]; // voila
console.log(eventsTeacher);

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game
// events log.
gameEvents.delete(64);
console.log(gameEvents);

// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has
//   90 minutes)

console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes.`
);

// if we want to be very specific:
const time = [...gameEvents.keys()].pop(); // pop takes the last element of the array
console.log(time);
// now we can use 'time'
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes.`
);

// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of
// the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

for (const [minute, event] of gameEvents) {
  minute <= 45
    ? console.log(`[FIRST HALF] ${minute}: ${event}`)
    : console.log(`[SECOND HALF] ${minute}: ${event}`);
}

console.log('---Teachers Solution---');
for (const [minute, event] of gameEvents) {
  const half = minute <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${minute}: ${event}`);
}

// 118 Summary_ Which Data Structure to Use_.mp4

// When we need the data without the explanation of each data, we can use sets and arrays
// If we need ordered list of values we must use an Array, and when we need to manipulate data.
// when we need unique values we must use a Set, when High Performance is really important and to remove duplicates from an array.
// Sets are not meant to replace arrays.

// Objects x Maps
// Maps were introduced in ES6, so before that everything was stored in Objects.
// Maps can have any data type, has a better performance, it's easy to iterate and it's easy to compute the size of the map.
// Objects to simple key value stores are "abused" objects. It is very ease to write and access data by simple using the . and [] operators.
// Maps should be used when we simply need to map key to values and when we need keys that are NOT strings.
// Objects should be used when we need to include functions (methods) and also when using JSON data.

/*

// 117 Maps_ Iteration.mp4

// Another way of populating a new map, when we have lots of data to put on it
// we can have an array of arrays:

// const question = new Map([
//   [],
// ]);


const question = new Map([
  ['question', 'What is the best programing language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again 💥'],
]);
console.log(question);

// same structure as the array of arrays above.
// convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));

console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

// now comparing the answer in the prompt with the power of the boolean values:
console.log(question.get('correct') === answer);

// and returning the value inside the true or false:
console.log(question.get(question.get('correct') === answer));

// Convert map to array,
console.log([...question]);
console.log([question.entries]);
console.log([...question.keys()]);
console.log([...question.values()]);

/*
// 116 Maps_ Fundamentals.mp4
// Map is a data structure we can use to map values to keys
// the easiest way to use it is creating an empty map and filling it...

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');

// we can also call the log including a position
console.log(rest.set(2, 'Lisbon, Portugal'));

// And we can chain the calls of a set, creating a new set with all of it in the end.
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are Open :D')
  .set(false, 'we are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
// this returns true if the time is between 11 and 23, and rest.get(true) = We are open:D
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// This is very clever but not really readable. Don't use it too much.

console.log(rest.has('categories'));
rest.delete(2); // location in portugal is now closed for good.
rest.set(document.querySelector('h1'), 'Heading'); // now we can hoover over the h1 and it will show the content on the the page.
console.log(rest);

rest.set([1, 2], 'Test');

console.log(rest.size);

// if we try to retrieve the "Test" using:
console.log(rest.get([1, 2]));
// will return undefined, because even though we wrote the same text, they are not the same object in the heap.

// we would have to use:
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr)); // now they reffer to the same place in the memory.

/*
//115 Sets.mp4

// a set is a collection of unique values
// we have to pass an iterable in Set(), the most common one is an array []
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet);
// the result of the set in the console is a size 3 array of Pasta, Pizza and Ristto, the duplicate registers are gone
// the set is similar to an array, no key value, sets are also iterable as the arrays.
// the elements of a set are unique, the order of elements are irrelevant.

// strings are also iterables
console.log(new Set('Luca'));

// And the set can also be empty:
console.log(new Set(''));

// this shows the set size, this could be usefull to know how many different meals will be cooked
console.log(ordersSet.size);

// check if an element is in a set
console.log(ordersSet.has('Pizza')); // similar to the includes method in an array
console.log(ordersSet.has('Bread'));

// Adding an garlic bread order twice and eliminating Risotto.
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
console.log(ordersSet);
// ordersSet.clear(); // this clears the set.
// console.log(ordersSet);

// In sets there are no Indexes, we cannot take data out of a set.
// If you need to take values out of it, you should use an array.

// we can actually log all the elements of an set:
for (const order of ordersSet) console.log(order);

// Mostly sets are used to remove duplicate elements of an array.
// Example
const staff = ['Waiter', 'Cheff', 'Waiter', 'Manager', 'Cheff', 'Waiter'];

// Lets say we want to know wich unique positions we have in the restaurant.
// const staffUnique = new Set(staff);
// console.log(staffUnique);

// to convert the set to an array we can use the spread operator that works with all iterables.
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

// let's say we want to know how many positions we have.
console.log(
  new Set(['Waiter', 'Cheff', 'Waiter', 'Manager', 'Cheff', 'Waiter']).size
);

// How many letters we have on an string
console.log(new Set('PaoloEnricoIaconoFullone').size);

// Sets are not intended to replace arrays at all, whenever you need to store values in order and might contain duplicate alwas use arrays.
// Also to manipulate data we have to use arrays.


/*
// 114 Coding Challenge #2.mp4

///////////////////////////////////////
// Coding Challenge #2


Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀


const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")

let goalNumber = 1;
for (const goal of game.scored) {
  console.log(`Goal ${goalNumber}: ${goal}`);
  goalNumber += 1;
}

// 1. teacher
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player}`);

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages,
// you can go check if you don't remember)

let i = 0;
let sum = 0;
const odds = Object.values(game.odds);
for (const odd of odds) {
  // console.log(odd);
  sum += odd;
  i += 1;
}
console.log(`The average odd is: ${sum / i}`);

// 2. teacher
// const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) {
  average += odd;
}
average /= odds.length;
console.log(average);

// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5

// 3.

for (const [team, odd] of Object.entries(game.odds)) {
  console.log(`${team} ${odd}`);
}

for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`; // if the team is equal to x, it becomes draw, else ... victory...
  console.log(`   Odd of ${teamStr}: ${odd}`);
}

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

/*
// 113 Looping Objects_ Object Keys, Values, and Entries.mp4

// property NAMES:
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `we are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// property VALUES:
const values = Object.values(openingHours);
// console.log(values);

// Entire Object
const entries = Object.entries(openingHours);
console.log(entries);

// Using destructuring, we will store the names and values in const's, first we wrote
// the second line of code with the const's names, then we destructured.
// we had to use { } for open and close because the value here is another object.
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}.`);
}

/*
// 112 Optional Chaining (._).mp4
// we want the opening hours of the restaurant for monday
// console.log(restaurant.openingHours.mon); // this gets undefined because 'mon' doesnt exist

// if we try to get the opening hours value:
// console.log(restaurant.openingHours.mon.open); // here we get an error because undefined.open does not exists

// so, to avoid that:
// this returns nothing and no error
if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// this returns a valid open hour, but it is only checking for .mon
if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open);

// if we want to check if the openingHours and .mon exists:
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);
// so if we had to check for a propertie deeply nested it would be a lot of code to write
// and in ES6 we have the optional chaining

// WITH the optional chaining we don't have the error
console.log(restaurant.openingHours.mon?.open); // with the ? immediately 'undefined' is returned
// console.log(restaurant.openingHours.mon.open); // again, this one returns Uncaught TypeError

// And we can have more than 1 verification:
console.log(restaurant.openingHours?.mon?.open); // if openingHours does not exists it will not look over for .mon

// Real World example:
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// here a good example of optional chaining and nullish coalescing operator together
for (const day of days) {
  console.log(day);
  // const open = restaurant.openingHours[day]?.open; // this returns 'we open at undefined
  // const open = restaurant.openingHours[day]?.open || 'closed'; // this returns a we open at closed, not much sense but leave it like this, and sat now says it is closed, but it is open, but the propertie is at 0 (open) as a falsy value
  const open = restaurant.openingHours[day]?.open ?? 'closed'; // using the nullish coalescing operator we get rid of the 0 as a falsy value
  console.log(`On day ${day}, we open at ${open}`);
}

// Now let's use the same technique to check if a method exists before we call it
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Check if an array is empty
const users = [
  {
    name: 'Paolo',
    email: 'paolo@lá.com',
  },
];
// returns the first name or return that the array is emtpy.
console.log(users[0]?.name ?? 'User array empty');

// with an empty array:

const usersEmpty = [];
// returns the first name or return that the array is emtpy.
console.log(usersEmpty[0]?.name ?? 'User array empty');

// replaces this
if (users.length > 0) console.log(users[0].name);
else console.log('User array empty');

/*
// 111 Enhanced Object Literals.mp4
// the restaurant object is a object literal, because we literally wrote the object using {} syntax
// So in ES6 we can take the openingHours out of restarurant object and easily call it

// to take it out we have to write const to define the name and change the : to =, also to change the , to ; in the last }

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  // thu: { // with ES6 we can re-write as:
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  // fri: { // with ES6 we can re-write as:
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  // sat: { // with ES6 we can re-write as:
  [`Day-${2 + 4}`]: { // this one doesn't make any sense right now, but will be usefull.
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  nameRestaurant: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // openingHours: openingHours, // this is how we had to do before ES6
  // now we can simply do this (ES6 enhanced object literals):
  openingHours,

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // so as soon as this function is called it will destructure the input and log it to console.
  // and we can also have some default values, if not informed it will be filled automatically

  // now we can change the way the function expression looks like
  // oderDelivery: function ({ // old way
  // new way dismiss the function keyword, with the parenteses we can see that it is a funciton itself
  oderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} 
      and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log('');
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/* 
// 110 Looping Arrays_ The for-of Loop.en_US.srt
// Introduced in ES6

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// this eliminates the counter, update counter etc...
for (const item of menu) console.log(item);
console.log('');

// if we need the index as well, it is a bit of a pain to get it in for of loop
for (const item of menu.entries()) {
  console.log(item); // now each of the item is now an array with index and element.
}
console.log('');
// console.log([...menu.entries()]); // we get the weird Array Iterator, not very helpfull right now, will look over it latter in the course...
// expanding it with ... we can see that it is an array, that contains another array for each element with it's own index.

// Printing it in a nicer menu:
for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`); // now each of the item is now an array with index and element.
}
console.log('');

// But we can also de-structure it in a much better code:
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`); // now each of the item is now an array with index and element.
}

//109 Coding Challenge #1.mp4
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀


const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Create one player array for each team (variables 'players1' and 'players2')
// const players1 = [...game.players[0]];
// const players2 = [...game.players[1]];
// console.log(players1, players2);

// teachers solution:
const [players1, players2] = game.players;
console.log(players1, players2);

// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name,
//  and one array('fieldPlayers') with all the remaining 10 field players
// const gk = players1[0];
// console.log(gk);
// const fieldPlayers = [...players1].slice(1);
// console.log(fieldPlayers);

// teachers solution:
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// const allPlayers = [...game.players[0], ...game.players[1]];
// console.log(allPlayers);

// teachers solution:
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// const players1Final = [...game.players[0], 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// teachers solution:
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// const team1 = game.odds.team1;
// const draw = game.odds.x;
// const team2 = game.odds.team2;

// console.log(team1, draw, team2);
// teachers solution:

const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console,
// along with the number of goals that were scored in total(number of player names passed in)

// teachers solution:
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored.`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// se o nome estiver em game.scored, conte quantas vezes o nome aparece e retorne o número de gols

// se não estiver retorne o nome com zero gols

// We want the above add function to take any number of arguments.

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// && short circuits when the 1st falsy value is found
// || Short circuits when the 1st truthy value is found
// so if team 1 odds are lower, it's truthy and 'team ${game.team1}' executes and does not executes the second part
// after || because the first truthy value was already found.

console.log(
  (game.odds.team1 < game.odds.team2 && `mostly like to win: ${game.team1}`) ||
    (game.odds.team1 > game.odds.team2 && `mostly like to win: ${game.team2}`)
);

// teachers solution:
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

/*
// 108 The Nullish Coalescing Operator (__).mp4

// this is the one that didn't worked in lesson 107
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// here we get 0 indeed.
// Nulish only verifies null and undefined (NOT verify 0 or ''), as if they were not falsy values.
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);


// 107 Short Circuiting (&& and ||).mp4
// SHORT CIRCUITING with || operator. Use ANY type, return ANY data type, it means that if the first value is a truthy value it will immediately return the first value.
console.log(`------OR------`);
console.log(3 || 'Paolo');
console.log('' || 'Paolo'); // '' is a falsy value, so it returns 'Paolo'.
console.log(true || 0); // true is a truthy value.
console.log(undefined || null); // undefined is a falsy value. null is also falsy value and here we have no short-circuiting.

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello is the 1st truthy value in the chain of OR operators.

// we want to check if there is a property in the restaurant object with the number of guests, we don't know if it exists.
// If this propertie doesn't exist we want to set a default value.
// restaurant.numGuests = 20; // if we comment this one out, the result is 20, if the number is 0, it is a falsy value then it will return 10.
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // so here we get 10 as an result. if we add the propertie (2 lines above) in the object it will return the property value.

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('-------AND-------');
console.log(0 && 'Paolo'); // short circuits when finds the first falsy value;
console.log(7 && 'Paolo');
console.log('Hello' && 23 && 'Umbu' && null && 'Joe'); // it stopped in the first falsy value.

// Practical example.
// if orderPizza exists, then execute the function.
if (restaurant.orderPizza) {
  restaurant.orderPizza('pineapple', 'cheese', 'egg');
}

// so basically we can use this to execute the second operand if first operand is true.
restaurant.orderPizza && restaurant.orderPizza('pineapple', 'cheese', 'egg');

/*
// 106 Rest Pattern and Parameters.mp4
// 1 - Desctructuring
// SPREAD, because on the RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST operator, because on the LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

// lets say we want pizza and risotto (1st and 3rd)
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
// Here let's separate saturday from weekdays (we have thursday and friday)
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // the result is that we have thu and fri in a separate object.

// 2 - Functions that takes any number of parameters.

const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

// We want the above add function to take any number of arguments.

add(2, 3);
add(5, 3, 7, 2);
add(9, 2, 4, 5, 6, 7, 8, 9);

// if we want to do with all the items of an array we can spread all of them.
const x = [23, 5, 7];
add(...x);

// Ordering pizza
restaurant.orderPizza('onion', 'lettuce', 'tomatoe');
restaurant.orderPizza('pepperoni');

// so the SPREAD operator is used where we would write values separated by commas;
// and the REST operator is used where we would writhe variable names separated by commas;

// this way we can use an array or any amount of numbers.

// here were we call the function we don't need to worry with the order of the elements.
restaurant.oderDelivery({
  time: '22:30',
  address: 'Via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// and now that we included the default values, we can pass a order delivery w/o all parameters.
restaurant.oderDelivery({
  address: 'Via del sole, 21',
  starterIndex: 1,
});


//103 Destructuring Arrays.mp4
destrcturing manualy
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// now destructuring the array
// notice that we have to declare the const
// the original array is not affected. we are just unpacking the array.
const [x, y, z] = arr;
console.log(x, y, z);

//destructuring the categories of the restaurant
const [first, second] = restaurant.categories;
console.log(first, second);

// it we want the first and third and naming them with more obvious names:
let [main, , secondary] = restaurant.categories;
console.log('');
console.log(main, secondary);

// so if we want to change the main and secondary we could do this:
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary); // Italian becomes secondary and Vegeterian becomes main.

// Using desctructuring we can do in one line;

[main, secondary] = [secondary, main];
console.log(main, secondary);

// How to receive 2 return values from a function.
console.log(restaurant.order(2, 0));
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, 'and', mainCourse);

// so let's see how that happens with nested elements. an array inside an array.

const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log('');
console.log(i, j); // let's say we wanted the first element then the array (third).

// now let's say we want the firs, the third and the fourth (first and second of the nested array)
const [i, , [j, k]] = nested;
console.log('');
console.log(i, j, k);

// if we don't know the size of the array
// default values
// if we try to extract 3 elements of an 2 sized array, pretending we don't knwo the array size
const [p, q, r] = [8, 9];
console.log('');
console.log(p, q, r);

// then we could set some values to the variables, something that doesn's make sense in the real world application.
const [d = 0, e = 0, f = 0] = [8, 9];
console.log('');
console.log(d, e, f); // so we would know that the third element is not present in the array.


// 104 Destructuring Objects.mp4
// in objects we can take any order of element doesn't mattet.
// we can take the first, last, then second...no need to skip like in arrays.
// destructuring objects also needs {}

const { nameRestaurant, openingHours, categories } = restaurant;
// console.log(nameRestaurant, openingHours, categories);

// renaming the elements - usefull when we are dealing with 3rd party data

const {
  nameRestaurant: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// retrieving and renaming at the same time:

// Defautl variables
// we are renaming starterMenu to starters and setting an empty value if it doesnt exists.
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log('');
console.log(menu, starters);
// so we got an empty array for menu and the starterMenu now renamed as starters

// Mutating variables
let a = 666;
let b = 999;
// // now we want to change a to 23, and b to 7
// const obj = { a: 23, b: 7, c: 14 };

// if we try simply this it won't work:
{ a, b; } = obj;

// but this will, we have to wrap it under ().
({ a, b } = obj);
console.log(a, b);

// nested objects
// this returns open and close hours
const { fri } = openingHours;
console.log(fri);

// this returns only the numbers
const {
  fri: { open, close },
} = openingHours;
// console.log(open, close);

// and we could also assign new variable names using ':'
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

// 105 The Spread Operator (...).mp4

// const arr = [7, 8, 9];
//now let's say we want a new one with new 2 elements in the begining:
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log('');
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

// we can use the spread operator to log the individual elements of the array
console.log(...newArr);
// the same of:
console.log(1, 2, 7, 8, 9);

// including a new element (expanding) in the mainMenu in a new const newMenu
const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(newMenu);

// the spread operator takes all the elements of the array and doesn't create new variables
// so we can use to destructuring where it would be necessary to type all the elements of the array

// create shallow copies and merge arrays
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays or more
const menuComplete = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menuComplete);

// the spread operator ... works in arrays, strings, maps, sets but NOT on objects

const str = 'Paolo';
const letters = [...str, '', 'S.'];
console.log(letters);
console.log(...str); // Here we get the individual elements
console.log(`${...str} Fullone`); // It does NOT work in a template literal.
// Multiple values separated by a comma only works in a function or on an array.

// Real world example:
const ingredients = [
  prompt("Let's make pasta! Ingredient 1 ?"),
  prompt('Ingredient 2:'),
  prompt('Ingredient 3: '),
];
console.log(ingredients);

// we could do it like this:
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// or better:
restaurant.orderPasta(...ingredients);

// Create a new object with all the data from the original one and some new data;
const newRestaurant = {
  founded: 1998,
  ...restaurant,
  founder: 'Giuseppe',
};
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.nameRestaurant = 'Ristorante Roma';
console.log(restaurantCopy.nameRestaurant);
console.log(restaurant.nameRestaurant);
*/

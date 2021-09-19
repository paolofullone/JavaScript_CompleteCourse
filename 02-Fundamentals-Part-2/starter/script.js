//032 Activating Strict Mode

"use strict";
// this command enables the strict mode in JS, it has to be the first line of code in the file.
// strict mode enables more secure codes, secure codes forbids us to do certain thinks,
// and it creates visualy errors in scenarios that without strict mode JS will fail silently and
// we won't know we did a mistake

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true; // we ommited the s of Drivers in purpose
if (hasDriversLicense) console.log("I can drive :D");

// so, if we comment the 'use strict' out, nothing is shown in console, and no mistake is shown.
// with strict mode enabled we get an 'hasDriverLicense' is not defined.

const interface = "Audio"; // this also is not shown if 'use strict' is not enabled.
const private = 534;
const if = 23; // same error as the other ones, if is already a reserved word.


// 033 functions
function logger() {
  console.log("My name is Joe.");
}

// calling, running of invoking the function:
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice; // the return allows us to take the value outside the function.
}

const appleJuice = fruitProcessor(2, 0);
console.log(appleJuice);
console.log("");

// this gives the same result:
console.log(fruitProcessor(2, 5));

//now a different output:
const appleOrangeJuice = fruitProcessor(3, 4);
console.log(appleOrangeJuice);


// 034 Function Declarations vs. Expressions.mp4

// function declaration
function calcAge1(birthYear) {
  return 2021 - birthYear;
}
const age1 = calcAge1(1978);

// function expression
const calcAge2 = function (birthYear) {
  //function w/o name or anonyous function
  return 2021 - birthYear;
};

const age2 = calcAge1(1978);
console.log(age1, age2);

// key takeaway - we can store a function inside a const, this will be
// very necessary latter on.
// we can move the call const age1 = calcAge1(1978); to before the
// function creation and that will still work, but if we do tha same with
// const age2 = calcAge1(1978); it will not work.



// 035 - arrow function

//arrow function - does not need the return if we have a one line function.

const calcAge3 = (birthYear) => 2021 - birthYear;
const age3 = calcAge3(1978);
console.log(age3);

// this one we will need the {} and the return.
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2021 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years.`;
};
console.log(yearsUntilRetirement(1978, "Joe"));
console.log(yearsUntilRetirement(1985, "Lola"));

// if we have lots of parameters, we can loose the benefit of being simple.



// 036 Functions Calling Other Functions.mp4

// we need to cut the fruits in 4 pieces to make the juice now, new requirement
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples); // this line is new in the frunction we did before
  const orangePieces = cutFruitPieces(oranges); // this line is new in the frunction we did before
  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}

console.log(fruitProcessor(2, 3));


// 037 Reviewing Functions

const calcAge = function (birthYear) {
  return 2021 - birthYear;
};

const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years.`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired.🎉`);
  }
  return -1; // we could return a string, but it is a good practice to return a number to indicate that it is already retired.
};

console.log(yearsUntilRetirement(1978, "Joe"));
console.log(yearsUntilRetirement(1930, "Lola"));

// Review:

// function declaration - can be used before it's declared
function calcAge1(birthYear) {
  return 2021 - birthYear;
}

// function expression - essentially a function value stored in a variable.
const calcAge2 = function (birthYear) {
  //function w/o name or anonyous function
  return 2021 - birthYear;
};

// arrow function - great for a quick one-line function. Has no this keyword.
const calcAge3 = (birthYear) => 2021 - birthYear;

*/

// 038 - Coding Challenge
/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.

TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores 😉

GOOD LUCK 😀


const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

// test 1
let avgDolphins = calcAverage(44, 23, 71);
let avgKolas = calcAverage(85, 54, 41);

console.log(avgDolphins, avgKolas);

function checkWinner(avgDolphins, avgKolas) {
  if (avgKolas > 2 * avgDolphins) {
    console.log(`Kolas win 🏆 (${avgKolas} vs ${avgDolphins}).`);
  } else if (avgDolphins > 2 * avgKolas) {
    console.log(`Dolphins win 🏆 (${avgDolphins} vs ${avgKolas}).`);
  } else {
    console.log("No team scored two times the average.");
  }
  return checkWinner;
}

checkWinner(avgDolphins, avgKolas);

//test 2
avgDolphins = calcAverage(85, 54, 41);
avgKolas = calcAverage(23, 34, 27);

checkWinner(avgDolphins, avgKolas);

// instructor solution:

const calcAverage = (a, b, c) => (a + b + c) / 3;
console.log(calcAverage(3, 4, 5));

// Test 1
let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
console.log(scoreDolphins, scoreKoalas);

const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win 🏆 (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= 2 * avgDolphins) {
    console.log(`Koalas win 🏆 (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log("No team wins...");
  }
};
checkWinner(scoreDolphins, scoreKoalas);

checkWinner(576, 111);

// Test 2
scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreDolphins, scoreKoalas);
checkWinner(scoreDolphins, scoreKoalas);


// 039 Introduction to Arrays

const friend1 = "Joe";
const friend2 = "Lola";
const friend3 = "Scalabosh";

const friends = ["Joe", "Lola", "Scalabosh"];
console.log(friends);

const y = new Array(1991, 2002, 1978, 2021); // not very usual

console.log(friends[0]); // first elementof the array

console.log(friends.length); // total number of elements off the array.

console.log(friends[friends.length - 1]); // last position of the array

friends[2] = "John"; // replacing friend number 2, even if it is declared as const because the array is not a primitive value, the array is mutable.
// however we cannot assign a new array with the same name:
// friends = ["Bob", "Mark"];
console.log(friends);

const firstName = "Paolo";
const paolo = [firstName, "Fullone", 2021 - 1978, "student", friends];
console.log(paolo);

// Exercise:

const calcAge = function (birthYear) {
  return 2021 - birthYear;
};

const years = [1990, 1967, 1978, 2010, 2011, 1955];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

// placing a function call inside an array.
const ages = [
  calcAge(years[0]),
  calcAge(years[1]),
  calcAge(years[years.length - 1]),
];
console.log(ages);


// 040 Basic Array Operations (Methods)

// add elements.
const friends = ["Joe", "Lola", "Scalabosh"];
const newLength = friends.push("Michael"); // adds an element in the end of the array and stores the newLenght of the array in a const. Push returns the size of the array.
console.log(friends);
console.log(newLength);

friends.unshift("John"); // inserts an element in the first position of the array.
console.log(friends);

// remove elements
const popped = friends.pop(); // removes the last element.
console.log(friends);
console.log(popped); // this method returns the popped element of the array, not the length.

friends.shift();
console.log(friends); // removes the first element of the array.

console.log(friends.indexOf("Lola"));
console.log(friends.indexOf("ElementNotInArray")); // for any element not in the array we get -1

friends.push(23);
console.log(friends.includes("Paolo")); // included in ES6 and just informs if Paolo is in the friends list. This method uses strict equality.
console.log(friends.includes("23")); // 23 the string is different than 23 the number.
console.log(friends.includes(23)); // this one returns true.

if (friends.includes("Lola")) {
  console.log("You have a friend called Lola.");
}

*/

// 041 - coding challenge.

/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
2. And now let's use arrays! So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 😉

GOOD LUCK 😀


let tip;

function calcTip(billValue) {
  if (billValue > 50 && billValue < 300) {
    tip = billValue * 0.15;
  } else {
    tip = billValue * 0.2;
  }
  return tip;
}

console.log(calcTip(100));
const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills, tips, total);

// instructor solution:
/*
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};
// const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills, tips, totals);


// 042 Introduction to Objects

const paolo = {
  firstName: "Paolo",
  lastName: "Fullone",
  age: 2021 - 1978,
  job: "student",
  friends: ["Joe", "Bob", "Esponja"],
};

//  043 Dot vs. Bracket Notation

console.log(paolo);
console.log(paolo.lastName);
console.log(paolo["lastName"]); //both of these gives the same result.

const nameKey = "Name";
console.log(paolo["first" + nameKey]); // in the square brackets [] we can put any expression,
console.log(paolo["last" + nameKey]); // same thing would now work in dot notation => paolo.'last' + nameKey

const interestedIn = prompt(
  "What do you want to know about Paolo? Choose between firstName, lastName, age, job and friends."
);

if (paolo[interestedIn]) {
  console.log(paolo[interestedIn]); //again dot notation is not going to work here.
  // if we try 'location' the result will be "undefined", which is a falsy value.
} else {
  console.log(
    "This data does not exist. Check the spell. Choose between firstName, lastName, age, job and friends."
  );
}

// use the . notation or brackets to include data in the dictionary.
paolo.location = "Brazil";
paolo["twitter"] = "@paolofullone";
console.log(paolo);

// chalenge: 'Jonas has 3 friends, and his best friend is called 'Joe'
// how I did:
console.log(
  paolo.firstName +
    " has " +
    paolo.friends.length +
    " friends, and his best friend is " +
    paolo.friends[0] +
    "."
);

// Instructor solution:
console.log(
  `${paolo.firstName} has ${paolo.friends.length} friends, and his best friend is ${paolo.friends[0]}.`
);

// 044 Object Methods

// Objects like arrays, can hold a different type of data, including arrays. Functions are a type of value.

const paolo = {
  firstName: "Paolo",
  lastName: "Fullone",
  birthYear: 1978,
  job: "student",
  friends: ["Joe", "Bob", "Esponja"],
  hasDriversLicense: true,

  //1st version
  //   calcAge: function (birthYear) {
  //     // no need to use const calcAge...
  //     // a function attached to an object is called method
  //     return 2021 - birthYear;
  //   },

  // 2nd version
  // calcAge: function () {
  //   // with the method this. we don't need to use any value inside ()
  //   //console.log(this); // 'this' is the entire paolo object and works for any object, instead of paolo.birthYear
  //   return 2021 - this.birthYear;
  // },

  calcAge: function () {
    this.age = 2021 - this.birthYear;
    return this.age;
  },
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()} years old ${
      this.job
    }, and has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
  },
};

// so we have boolean, string, function, methods...
console.log(paolo.calcAge());
console.log(paolo.age); // using dot notation
// console.log(paolo["calcAge"](paolo.birthYear)); // using brackets

// chalenge: Paolo is a 43 years old student, and he has a driver's license.

console.log(paolo.getSummary());

// 045 Coding Challenge #3

const mark = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const john = {
  fullName: "John Smith",
  mass: 92,
  height: 1.92,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

mark.calcBMI();
john.calcBMI();

// print the summary:

if (mark.BMI > john.BMI) {
  console.log(
    `${mark.fullName}'s BMI (${mark.BMI}) is higher than ${john.fullName}'s BMI (${john.BMI})`
  );
} else if (john.BMI > mark.BMI) {
  console.log(
    `${john.fullName}'s BMI (${john.BMI}) is higher than ${mark.fullName}'s BMI (${mark.BMI})`
  );
}



// 046 - Iteration The for loop

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
// }
const types = [];
const paolo = [
  "Paolo",
  "Fullone",
  2021 - 1978,
  "student",
  ["Joe", "Bob", "Esponja"],
  true,
];

for (let i = 0; i < paolo.length; i++) {
  console.log(paolo[i], typeof paolo[i]);

  //   // // filling an array with the types of data:
  //   // types[i] = typeof [paolo[i]];

  // another way of doing the same:
  types.push(typeof paolo[i]);
}

console.log(types);

//another example
const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2021 - years[i]);
}
console.log(ages);

// continue and break statements

console.log("");
console.log("---only strings---");
for (let i = 0; i < paolo.length; i++) {
  if (typeof paolo[i] !== "string") continue; // if type of paolo[i] is not a string continue(don't execute the next line, continue the loop)
  console.log(paolo[i], typeof paolo[i]);
}

console.log("");
console.log("---if you find a number, stop---");
for (let i = 0; i < paolo.length; i++) {
  if (typeof paolo[i] === "number") break; // if type of paolo[i] is not a string continue(don't execute the next line, continue the loop)
  console.log(paolo[i], typeof paolo[i]);
}


//048 Looping Backwards and Loops in Loops.mp4

const paolo = [
  "Paolo",
  "Fullone",
  2021 - 1978,
  "student",
  ["Joe", "Bob", "Esponja"],
  true,
  false,
];

for (let i = paolo.length - 1; i >= 0; i--) {
  console.log(i, paolo[i]);
}

// 3 exercises, 5 repetitions each
for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`---- Starting exercise ${exercise}. ----`);

  for (let rep = 1; rep <= 5; rep++) {
    console.log(
      `------- Exercise ${exercise}. Repetition number ${rep}. 🎾 -------`
    );
  }
}

// 049 The while Loop.mp4

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
// }

// same using while.
// let rep = 1;
// while (rep <= 10) {
//   console.log(`Lifting weights repetition ${rep} 🏋️‍♀️ using while.`);
//   rep++;
// }

// in while loop we can use it without any counter, with any condition.
// let's roll a dice untill we get a 6.

let dice = Math.trunc(Math.random() * 6) + 1; //Math.trunc rounds the number.

// if the dice is 6 in the first round, the loop will never happens and the console.logs will not be shown.
while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log("Loop is about to end...");
}

*/
//050 Coding Challenge #4.mp4

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let totals = [];
let tip;

function calcTip(billValue) {
  if (billValue > 50 && billValue < 300) {
    tip = billValue * 0.15;
  } else {
    tip = billValue * 0.2;
  }
  return tip;
}

for (let i = 0; i <= bills.length - 1; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(bills[i] + tips[i]);
  console.log(
    `${i + 1} - Bill: ${bills[i]}, Tip: ${tips[i]}, Total Bill: ${totals[i]}`
  );
}

function calcAverage(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length - 1; i++) {
    sum += arr[i];
  }
  let avg = sum / arr.length;
  return avg;
}

console.log(`The total bills average is ${calcAverage(totals)}`);
console.log(`The total tips average is ${calcAverage(tips)}`);

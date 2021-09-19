/*
let js = 'amazing';
console.log(40 + 8 + 23 - 10)

let firstName = 'Jonas';
console.log(firstName);
console.log(firstName);
console.log(firstName);
console.log(' ')
*/
let country = "Brazil";
let population = 230_000_000;
let continent = "South America";
/*
console.log(' ')
console.log(country);
console.log(population);
console.log(continent);
console.log(' ')
// primitive data tpes: number, string, bollean, undefined, null, symbol and big int.
let age = 23; // same as 23.0
let fistName = 'Paolo';
let fullAge = true;
let children; // variable declared without assign a value

null also means empty value, in different circunstances that will be addressed latter on.
Symbol (introduced in ES2015) value that is unique and cannot be changed [not useful for now]
BigInt (introduced in ES2020) larger integers than the Number type can hold.
in JavaScript the value of the variable determines the type, not the variable itself.


console.log(' ')
let JavaScriptIsFun = true;
console.log(JavaScriptIsFun)

console.log(typeof true);
console.log(typeof JavaScriptIsFun);
console.log(typeof 69);
console.log(typeof 'Paolo');

JavaScriptIsFun = 'YES!'; // this is dynamic typing, it was a boolean now it is a string.
console.log(typeof JavaScriptIsFun);

console.log(' ')

let year;
console.log(year);
console.log(typeof year)
year = 2021;
console.log(year);
console.log(typeof year)

console.log(' ')

console.log(typeof null); // this returns a 'object' type, this bug can lead to mistakes on code.
console.log(' ')

const isIsland = false;
let language;
const country = 'Brazil'
console.log(typeof isIsland)
console.log(typeof population)
console.log(typeof country)
console.log(typeof language)

// let is the best way to declare a mutable variable, or a variable w/o value.
let age = 30;
age = 31;

const birthYear = 2021; // this const cannot be mutated. so we cannot declare an empyt const.

// as a best practice we should always use const, only if we're sure that the variable should change we should use let.
// var is no longer beeing used, we should avoid it always.

language = 'Portuguese';


// Assignment operators
const now = 2021;
const agePaolo = now-1978;
const ageLuca = now-2010;
console.log(agePaolo, ageLuca, 'something else');
console.log(ageLuca*2, ageLuca/10, 2**10)
console.log(' ');

const firstName = 'Paolo';
const lastName = 'Fullone';
console.log(firstName + ' ' + lastName);

console.log(' ');
// Math operators
let x = 10 + 5;
x += 10;
x *= 4;
x++; // x = x + 1
x--; // x = x - 1
x--;
console.log(x)

// comparisson operators
console.log(agePaolo > ageLuca); // > < >= <=
console.log(ageLuca>=18);

const isFullAge = ageLuca >= 18;

console.log(now - 1978 > now -2010);

console.log(population / 2)
population++
console.log(population)
console.log(population > 6_000_000)
console.log(population > 33_000_000)
population--
description = country + ' is in ' + continent + ', and its ' + population/1000000 + ' million people sepeak portuguese.'
console.log(description)


// order of precedence.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

const now = 2021;
const agePaolo = now - 1978;
const ageLuca = now - 2010;

console.log(now - 1978 > now - 2010);

let x, y;
x = y = 25 - 10 - 5;
console.log(x, y);

const averageAge = (agePaolo + ageLuca) / 2;
console.log(ageLuca, agePaolo, averageAge);


// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / heightJohn ** 2;
const markHigherBMI = BMIMark > BMIJohn;

console.log(
  BMIMark,
  BMIJohn,
  "Marks BMI is higher than John's - " + markHigherBMI
);

const firstName = "Paolo";
const job = "Programmer";
const birthYear = 1978;
const year = 2021;

const paolo =
  "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + "!";
console.log(paolo);

// This is template strings introduced in ES6. We have to use `` which can also be used to all strings.
const paoloNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(paoloNew);

console.log(`just a normal string using backticks`);

// with ES6 we can use multiline with backticks
console.log(`this is
how we use
multiple lines`);

console.log("it used to\n\
be like \n\
this.");



const age = 15;

// comand + control + space to insert icons, emojis 

if (age >= 18) {
  console.log("Old enought to start her driving licence exam 🚗");
} else {
  const yearsLeft = 18 - age;
  console.log(`Gotta wait ${yearsLeft} years to take the driving exam.😟`);
}

// the if else statement is called "control structure." with this structure we can control blocks of code
// that should run and some block of code that should not run.

const birthYear = 1978;
let century;

if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);



// 019 coding challenge
// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / heightJohn ** 2;
console.log(BMIMark, BMIJohn);

if (BMIMark > BMIJohn) {
  console.log(`Mark's BMI (${BMIMark} is higher than John's (${BMIJohn})!`);
} else {
  console.log(`Johns's BMI (${BMIJohn} is higher than Mark's (${BMIMark})!`);
}


//020 - type conversion and coercion

// type conversion, when we deliberately convert
const inputYear = "1991"; // number as string
console.log(Number(inputYear), inputYear); // string converted to number and number as string
console.log(Number(inputYear) + 18); // when it will be full age? it works?

console.log(Number("Joe"));
console.log(typeof NaN); // not a number somehow is a number

console.log(String(23), 23);

// type coercion - when JS does that behind the scenes.
console.log("I am " + 23 + " years old.");
console.log("I am " + "23" + " years old.");
// both shows the same results in screen. JS will convert everything to string behing the scenes.

console.log("23" - "10" - "3"); // the minus operators transforms strings in numbers. opposite of + operator.
console.log("23" * "2");
console.log("23" / "2");
console.log("23" > "2"); // JS will convert strings to numbers in all these operations, the other way around only happens with + operator.


//021 - true and falsy objects
// falsy values in JS: 0, '', undefined, null, NaN
// these values will be converted to fasly if we try to convert them to a boolean.
// everything else is truthy values.

console.log(Boolean(0)); //false
console.log(Boolean(undefined)); //false
console.log(Boolean("")); //false
console.log(Boolean("Joe")); //true
console.log(Boolean({})); //true

// this function is hardly used in a explict way. but can be used like this:

let money = 0;
if (money) {
  console.log("Don't spend it all.");
} else {
  console.log("You should get a Job!");
}

money = 1;
if (money) {
  console.log("Don't spend it all.");
} else {
  console.log("You should get a Job!");
}

// check if a variable is defined or not?
let height;
if (height) {
  console.log("YAY, Height is defined!");
} else {
  console.log("Height is UNDEFINED.");
}
// this returns Height is UNDEFINED because despite it was declared, it does not have any value yet, and undefined
// is a falsy value as we saw up here.

height = 170;
if (height) {
  console.log("YAY, Height is defined!");
} else {
  console.log("Height is UNDEFINED.");
}
// this returns a YAY...
// we have to be aware of the situations when 0 is a valid input and should not be considered as undefined.



// const age = 18;
// if (age === 18) console.log("You just became an adult! (strict)"); // when the if has only one line the {} can be omitted.
// // when we assign a value we should use =, when we compare we use ===, which is a strict equality operator.
// // we also have ==, the loose equality operator that does coercion.
// if ("18" == 18)
//   console.log("Two == does coercy and '18' is equal to 18 in this case");

// // the == operator can introduce bugs very hard to find in code, the best practice is to use === instead of ==, even if
// // you need the type coercion, which can be done explicitly.

// const favourite = prompt("What's your favorite number?");
// console.log(favourite);
// console.log(typeof favourite); //remembering that the result will be a string containing the number.

// if (favourite == 23) {
//   // '23' == 23
//   console.log("Cool, 23 is an amazing number.");
// }

// if (favourite === 23) {
//   console.log("Cool, 23 is an amazing number."); // this will not return anything, because the string is not the same.
// }
// console.log("end of prompt as string.");
// console.log("");
// // to solve that and still use the ===, we should rewrite the input to:
// const favourite = Number(prompt("What's your favourite number?"));
// if (favourite == 23) {
//   // '23' == 23
//   console.log("Cool, 23 is an amazing number.");
// }

const favourite = Number(prompt("What's your favorite number?"));
if (favourite === 23) {
  console.log("Cool, 23 is an amazing number.");
} else if (favourite === 7) {
  console.log("Cool, 7 is also an amazing number.");
} else {
  console.log("Number is not 23 nor 7.");
}

if (favourite !== 23) console.log("Why not 23?");



/// 023 - boolean logic

/// 024 - boolean logic
const hasDriversLicense = true; // change these values to play around...
const hasGoodVision = true; // change these values to play around...

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense); // will convert from true to false or false to true

// const shouldDrive = hasDriversLicense && hasGoodVision;
// if (shouldDrive) {
//   console.log("Lola is able to drive.");
// } else {
//   console.log("Someone else (Joe?) should drive.");
// }

const isTired = false;

console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("Lola is able to drive.");
} else {
  console.log("Someone else (Joe?) should drive.");
}


// 025 - coding challenge

const dolphinsScores = 97 + 112 + 101;
const koalasScores = 109 + 95 + 106;
const dolphinsAverage = dolphinsScores / 3;
const koalasAverage = koalasScores / 3;
console.log(dolphinsAverage, koalasAverage);

if (dolphinsAverage > koalasAverage && dolphinsAverage >= 100) {
  console.log(
    `Dolphins team won with an average of ${dolphinsAverage} against Koala's average of ${koalasAverage}`
  );
} else if (koalasAverage > dolphinsAverage && koalasAverage >= 100) {
  console.log(
    `Koala team won with an average of ${koalasAverage} against Dolphins's average of ${dolphinsAverage}`
  );
} else if (koalasAverage === dolphinsAverage) {
  console.log("Ouch, we have a tie, let's flip a coin.");
} else if (dolphinsAverage > koalasAverage && dolphinsAverage < 100) {
  console.log(
    `Dolphins won, but the average must be at least 100 and you got ${dolphinsAverage}.`
  );
} else if (koalasAverage > dolphinsAverage && koalasAverage < 100) {
  console.log(
    `Koalas won, but the average must be at least 100 and you got ${koalasAverage}.`
  );
}

// instructor solved wit scoreDolphins = (96+10+89)/3


// 026 - switch statement
const day = "sunday";

switch (day) {
  case "monday": // same of if day === monday, so it fdoes an strict comparisson
    console.log("Plan course structure");
    console.log("all the lines are executed");
    console.log("in a case statement.");
    break; // we need the break statement. otherwise the code continues to execute.
  case "tuesday":
    console.log("prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("this block executes the same code for wednesday and thursday");
    break;
  case "friday":
    console.log("record videos");
    break;
  case "saturday":
  case "sunday":
    console.log("play tennis");
    break;
  default:
    console.log("Not a valid day format.");
}

if (day === "monday") {
  console.log("Plan course structure");
  console.log("all the lines are executed");
  console.log("in a case statement.");
} else if (day === "tuesday") {
  console.log("prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log("this block executes the same code for wednesday and thursday");
} else if (day === "friday") {
  console.log("record videos");
} else if (day === "saturday" || day === "sunday") {
  console.log("play tennis");
} else {
  console.log("Not a valid day format.");
}

// 027 Statements and Expressions
// examples of expressions:
3 + 4;
2021;
true && false && !false;

// statements - we write the programas as a sequence of actions, the actions are the statements.

if (23 > 10) {
  const str = "23 is bigger"; // this is a statement, '23 is bigger' is a expression inside the statement.
}

// expressions produces values and statements are full sentences that translate our actions.

console.log(`I am ${2021 - 1978} years old.`); // tjis works

console.log (`The if statement cannot be used here ${if (23 > 10) {
  const str = "23 is bigger"}}`)

// the error says that statements doesn't make sense when JS expects an expression.

*/

// 028 The Conditional (Ternary) Operator

const age = 23;
age >= 18
  ? console.log("I like to drink wine 🍷")
  : console.log("I like to drink water 💧");

// not so much used liked this.
// the operator is an expression, has the condition, if and else in one line.

// more used like this:
const drink = age >= 18 ? "wine 🍷" : "water 💧";
console.log(drink);

// now with the if else structure, we cannot declare a variable inside the if else?
let drink2;
if (age >= 18) {
  drink2 = "wine 🍷";
} else {
  drink2 = "water 💧";
}
console.log(drink2);

// the ternary operator produces a value, so we can have conditions inside a template literal, the error we got
// when we tried to insert an if inside a ${} is allowed with the ternary operator.

console.log("");
console.log(`I like to drink ${age >= 18 ? "wine 🍷" : "water 💧"}`);

// 029 - coding challenge #4

console.log("");
// my solution

const bill = 40;
let tip;
console.log(
  `The bill value is ${bill}. The tip value is: ${
    bill >= 50 && bill <= 300
      ? `${(tip = bill * 0.15)}`
      : `${(tip = bill * 0.2)}`
  }. The total value is ${tip + bill}.`
);

// video solution placed the "if else" inside const tip.

const bill2 = 275;
const tip2 = bill2 <= 300 && bill2 >= 50 ? bill2 * 0.15 : bill2 * 0.2;
console.log(
  `The bill2 value is ${bill2}. The tip2 value is ${tip2}, and the total value2 is ${
    bill2 + tip2
  }`
);

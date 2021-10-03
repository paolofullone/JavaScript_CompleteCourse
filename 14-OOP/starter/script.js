'use strict';

//? 203 Constructor Functions and the new Operator.mp4

// In OOP there's a convention that Constructor Functions always starts with a capital letter. Arrow function doest not work with
// Constructor Functions because it does not have the this keyword. Only function declarations and function expressions works.
const Person = function (firstName, birthYear) {
  //   console.log(this);
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function like this one:
  //   this.calcAge = function () {
  //     console.log(2021 - this.birthYear);
  //   };
  //* If we had a 1000 objects we would create a 1000 copies of the function...
  //* To solve it we use prototype and prototype inheritance.
};

const paolo = new Person('Paolo', 1978);
console.log(paolo);

// Behind the scenes this code generated 4 steps as we called the new operator:
//* Read {} as Object

// 1. New Object {} is created right away
// 2. function is called, this keyword now is equal to the new empty object (this = {})
// 3. {} is linked to prototype
// 4. {} is automatically returns from the function

// Blueprint analogy...
const kely = new Person('Kely', 1978);
const luca = new Person('Luca', 2011);
const manu = new Person('Manuela', 2012);

console.log(kely, luca, manu);

// To check if a object is from a class:
console.log('--- Check object ---');
const joe = 'Joe';

// paolo is an instance of Person
console.log(paolo instanceof Person);
console.log(joe instanceof Person);

//? 204 Prototypes.mp4

//* Each and every function in JS automatically has a property called prototype. Including of course the constructor
//* functions. Every object created by a certain constructor function get access to all the methods and properties
//* that we define on the constructors prototype property.
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

// Now I can call the calcAge method even though the paolo object does not contain the calcAge method. We can call it because of inheritance.
paolo.calcAge();

// This solves the problem of attaching the method directly to the Constructor Function. This way exists only one copy of the function.

//* Any object always has access to the methods and properties from its prototype.
console.log('--- Each object has a special property "proto" ---');
console.log(paolo.__proto__);
console.log(paolo.__proto__ === Person.prototype);
console.log(
  '\nThis confirms that Person.prototype is indeed the prototype of Jonas.'
);
console.log(Person.prototype.isPrototypeOf(paolo));

console.log('\nBut Person.prototype is not the prototype of Person.');
console.log(Person.prototype.isPrototypeOf(Person));

//* So basically the .prototype should be called something like .prototypeOfLinkedObjects or something like this.

//* The __proto__ property is created in step 3 of a Constructor Property.

// Setting properties on prototype.

Person.prototype.species = 'Homo Sapiens';
console.log(paolo, kely);
console.log(
  'So, firstName is a Own Porperty and Species is a property that the paolo object has access to because of the prototype.'
);
console.log(paolo.hasOwnProperty('firstName'));
console.log(paolo.hasOwnProperty('species'));

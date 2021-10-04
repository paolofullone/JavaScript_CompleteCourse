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
const john = 'John';

// paolo is an instance of Person
console.log(paolo instanceof Person);
console.log(john instanceof Person);

//? 210
Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this); // the this keyword is the entire constructor function here, that is exactly the object (Person) that is calling the
  // method.
};

// Person.hey();
// paolo.hey(); // as we cannot call a from method directly on an array, we cannot call paolo.hey() because the .hey() is not in the
// prototype of the paolo object.

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
  'So, firstName is a Own Property and Species is a property that the paolo object has access to because of the prototype.'
);
console.log(paolo.hasOwnProperty('firstName'));
console.log(paolo.hasOwnProperty('species'));

//? 205 Prototypal Inheritance and The Prototype Chain.mp4
/*
// PROTOTYPE CHAIN is very similar to SCOPE CHAIN.

//? 206 Prototypal Inheritance on Built-In Objects.mp4

console.log('--- Prototypes ---');
console.log(paolo.__proto__);
// Object.prototype is the top of the prototype chain.
console.log(paolo.__proto__.__proto__); // this is the prototype property of object. We can see that the constructor is the object.
// and we also can see that the object has the hasOwnProperty()
// Since object.prototype is the top of the prototype chain, this is null:
console.log(paolo.__proto__.__proto__.__proto__);

console.log('');
console.log(Person.prototype.constructor); // This returns the function.
console.dir(Person.prototype.constructor); // Now we can inspect the function.

console.log('--- Array Prototype ---');
const arr = [3, 4, 5, 6, 7, 3, 4, 5, 6];
console.log(arr.__proto__); // So we can see that all of the methods we studied (pop, push, fill, sort, splice...) are available because
// each array inherits these methods from it's prototype.

console.log(arr.__proto__ === Array.prototype); //* The prototype property of the constructor (Array.prototype) is gonna be the prototype
//* off al the objects created by that constructor (arr.__proto__)
//* Whenever we use [] to create an array, behind the scenes JS will grant access to all Array prototypes to the new object array.

console.log(arr.__proto__.__proto__); // Now we are back to having object.prototype, this one has hasOwnProperty and all the other methods
// available for objects while arr.__proto__ does not have. And this is simply because the prototype itself (arr.__proto__) is an object.
// And any object has access to all of these methods.

//* So the prototype is a mechanism of reuse code. So all the methods of an array has to exist in only one place in JS.

//* Using that knowledge we can extend the arrays methods ADDING A NEW METHOD for example:
Array.prototype.unique = function () {
  return [...new Set(this)]; // new Set will return all unique values, with argument 'this' we set the array, then we spread it with ... and
  // encapsulate everything in a array with []
};
// Now we can use it in all the arrays...
console.log(arr.unique());

//! It is NOT a good idea to add methods to native functions for many reasons. The next version of JS can include a method with the same
//! name and a different functionality, the code will use the new method and probably break the code.
//! Another reason is if the project involves more a team of programers if two uses the same name it will create so many bugs...

const h1 = document.querySelector('h1');
console.dir(h1); // as we can see the Prototype in the end of the object is a HTMLHeadingElement and if we expand it we get another prototype
// with HTMLElement that we studied in the beginning of the DOM section.
//* As we inspect it we can see 6 levels of chain prototypes

// Any function is also an object and therefore it also has prototype.
console.dir(x => x + 1); // This anonymous function contains apply, bind and call...That's why we can call these functions on it...

//? 207 Coding Challenge #1.mp4

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} Km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} Km/h`);
};

const bmw = new Car('BMW', 120);
console.log(bmw);
bmw.accelerate();
bmw.brake();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
bmw.accelerate();

const mercedes = new Car('Mercedes', 95);
console.log(mercedes);
mercedes.accelerate();
mercedes.brake();
mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();
*/

//? 208 ES6 Classes.mp4

// Let's do the same name objects but using classes instead of constructor functions.

//* Class Expression:

// const PersonCl = class {}

//* Or:
//* Class Declaration

// lola.greet(); just to prove #1

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance Methods.
  // Methods will be added to .prototype property (all instances can have access to them.)
  calcAge() {
    console.log(2021 - this.birthYear);
    // All the methods written outside the constructor but inside the class will be on the prototype of the objects and not on the objects
    // themselves. So we can see the calcAge method in the prototype of lola object and we can simply call lola.calcAge();
  }
  greet() {
    console.log(`Hey ${this.fullName}!`); // Important to notice that no , are necessary between methods.
  }

  get age() {
    // including this getter here from lection 209!
    return 2021 - this.birthYear;
  }

  // Set a property that already exists!
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    //* w/o the _ we get a error of Maximum Call stack size exceeded because the setter function and the constructor function are trying
    //* to set the same property name. The convention for this situation is to insert a _ in the name of the variable we're trying to create.
    //* The solution is also to create a getter for the variable.
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName; // with this getter we can call lola.fullName in the console and will receive the _fullName.
  }
  // Static Method //? 210
  static hey() {
    console.log('Hey there 👋');
    console.log(this); // the this keyword is the entire constructor function here, that is exactly the object (Person) that is calling the
    // method.
  }
}

const lola = new PersonCl('Lola Scherrer Fullone', 2013);
console.log(lola);
lola.calcAge();
console.log(lola.age); // using the getter we get the same result.
console.log(lola.__proto__ === PersonCl.prototype);

// Adding method manually to the class:
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.fullName}!`);
// }; // or we can add directly to the class
lola.greet();

const joe = new PersonCl('Joe Scherrer Fullone', 2015);

PersonCl.hey(); //? 210

//* 1. Classes are NOT hoisted (we cannot use them before they are declared in the code.)
//* 2. Classes are also first-class citizens, we can pass them into functions and also return them from functions. That is because classes
//* are really a special kind of functions behind the scenes.
//* 3. Classes are executed on strict mode. Even if we didn't activate it, the classes are executed in strict mode.

//* Constructor functions are 100% ok of use as well, this is more a personal preference.

//? 209 Setters and Getters.mp4
/*
// This feature is common to all objects in JS. Getters and Setters are assessor properties while the more normal properties are called
// data properties. Getters and Setters are basically a function that gets and sets a value as the name says.

const account = {
  owner: 'Paolo',
  movements: [200, 530, 900, 1800],

  get latest() {
    // the get word transforms it into a getter
    return this.movements.slice(-1).pop(); //* w/o the .pop it would return a [1800], we could also use destructure but not necessary
    //* to store it in a variable now.
  },
  set latest(mov) {
    //* it is not necessary to establish a setter together with a getter, just one of them is enough.
    //* The setter gets 1 parameter, in this case movement.
    this.movements.push(mov);
  },
};

console.log(account.latest); // we write latest as if it was a property, no need to call ()

account.latest = 50; // no need to do account.latest(50)
console.log(account.movements);
*/

//? 210 Static Methods.mp4

// In the console lets type: Array.from(document.querySelectorAll('h1'))
// This will return an array with h1, so the FROM method is attached to the ARRAY CONSTRUCTOR.
// So we cannot use the from method in an array like: [1,2,3].from() is not gonna work. So from is not a function.
// It's not on the prototype of the arrays, so they do not inherit it. It is attached to the constructor itself.
// Number.parseFloat(12) is the same case.

//? 211 Object.create.mp4

// So we learned about constructor and ES6 classes, and now let's see a 3rd way of implementing prototypal inheritance or delegation.
// Object.create works in a different way,

// With Object.create we can manually set the prototype to any object.

const PersonProto = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName; // looks like the constructor function however we will not use new operator, instead we will use init.
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // PersonProto is the object that we want to be the prototype of the new object (steven).
// steven right now is an empty object and will be linked to PersonProto object which will be it's prototype.
console.log(steven); // it is an empty object, but has the calcAge function on it.
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); // We just implemented prototype inheritance in a completely different way.

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

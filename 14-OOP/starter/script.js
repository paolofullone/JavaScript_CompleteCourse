'use strict';

//? 203 Constructor Functions and the new Operator.mp4
/*
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
/*
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
    //* w/o the _ we get an error of Maximum Call stack size exceeded because the setter function and the constructor function are trying
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
/*
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

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class CarCl {
  // cl stands for Class
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} Km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} Km/h`);
  }
  get speedUS() {
    return console.log(`${this.make} is going at ${this.speed / 1.6} mi/h`);
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford); // Ok
ford.speedUS; // Ok
ford.accelerate(); // Ok
ford.speedUS; // Ok
ford.brake(); // Ok
ford.speedUS; // Ok
ford.speedUS = 50; // 80 km/h
console.log(ford);
*/

//? 213 Inheritance Between _Classes__ Constructor Functions.mp4
/*
// Lets create a student class that will inherit the Person class.
// The idea is that student class can share behavior fro the parent Person class trough the prototype chain.

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

// So student has the same properties of person and an additional 'course'
const Student = function (firstName, birthYear, course) {
  //1 Since we already have this in the Person function, lets re-factor:
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  //2 Person(firstName, birthYear); //* This does not work because we are calling the Person constructor function as a regular construction call, by not using the
  //* new operator. And the regular function call the this keyword is set to undefined.

  //3 So we need to set the this keyword with the call method.
  Person.call(this, firstName, birthYear);

  //4 And include the new parameter.
  this.course = course;
};

// Linking prototypes
// With this the student.prototype object is now an object that inherits from person.prototype.
//* we have to create the object before we add any methods to the prototype object of student. Because object.create returns an empty object.
Student.prototype = Object.create(Person.prototype);
// console.log('🚀 ~ Student.prototype', Student.prototype);

// Student.prototype = Person.prototype // This does not work because that would say the student.prototype and person.prototype should be
// the exact same object. Not really what we want. We want the persons.prototype object to be the prototype of student.prototype.

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2000, 'Computer Science');
mike.introduce();
mike.calcAge(); // so we created a student that inherited from Person and it's possible to calcAge.

console.log(mike.__proto__); // this has only the introduce method, however it has another prototype in it. So lets see:
console.log(mike.__proto__.__proto__); // This one has the calcAge function from the Person.prototype.

console.log(mike instanceof Student);
console.log(mike instanceof Person); // if we take out the Student.prototype = Object.create(Person.prototype); this will return false (we also have to comment
// out the mike.calcAge() temporarily.
console.log(mike instanceof Object);

// we can see the same data in the console typing mike and inspecting.
// As we inspected we saw the the mike constructor is person and it should be student. That happens because of the Object.create based on Person.
Student.prototype.constructor = Student;
*/

//? 214 Coding Challenge #3.mp4
///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current
battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 
'accelerate'! HINT: Review the definition of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

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

const EV = function (make, speed, charge) {
  Car.call(this, make, speed); // setting the this keyword that we are using in EV
  this.charge = charge;
};

// Link the prototypes. We want that EV inherits prototype from Car.
EV.prototype = Object.create(Car.prototype); // this sets the Car as the EV prototype.

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h with a charge of ${this.charge}%.`
  );
};

tesla.brake(); // this one was inherited from Car class.
tesla.accelerate(); // this accelerate method is from EV class, not from Car class.

//* When there are 2 methods with the same name on the prototype chain, JS will pick the first one. And in this case overrides the accelerate method from Car
//* (parent class) in order to use the accelerate method of EV (child class).
*/

//? 215 Inheritance Between _Classes__ ES6 Classes.mp4
/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2021 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.fullName}!`);
  }

  get age() {
    return 2021 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }
  // Static Method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // we don't need a PersonCl.call(), instead we use the super function.
    // Always needs to happen first, the this keyword is set with the super call.
    super(fullName, birthYear); //super is basically the constructor of the parent class. And we pass the same arguments of the parent.
    this.course = course; //* It is not mandatory to have an additional parameter. Could be only new methods.
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  // Now let's override the calcAge method. Just to prove once again the prototype chain.
  calcAge() {
    console.log(
      `I'm ${
        2021 - this.birthYear
      } years old, but as a student I fell more like ${
        2021 - this.birthYear + 10
      } years old.`
    );
  }
}

// const lola = new StudentCl('Lola Jones', 2012); // with this we can simply have class StudentCl extends PersonCl {} and it works.
const lola = new StudentCl('Lola Jones', 2012, 'Computer Science');
console.log(lola);
lola.introduce();
lola.calcAge();

//* If we inspect lola at console, we will see that we have 3 levels of prototypes including all methods (get age, get fullName, set fullName)
*/

//? 216 Inheritance Between _Classes__ Object.create.mp4

// How to use object.create do implement a complex prototype chain.
/*
const PersonProto = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto); // creating an object that will be the prototype of students, for now an empty object. And the prototype will be
// PersonProto. Now we can use StudentProto to create new students.
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto); // Now the StudentProto is the prototype of Jay object. And PersonProto is the prototype of StudentProto. So PersonProto
// is a parent prototype of jay. => Inspect jay in console.
// jay can use all the objects in StudentProto and PersonProto
jay.init('Jay', 2010, 'Web Developer at Trybe');
jay.introduce();
jay.calcAge();

//* This version don't worry about constructors anymore nor prototype properties neither the New operator.
//* It is just objects linked to other objects.
*/

//* 217 Another Class Example.mp4

// Let's create a new class
/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    // Now lets add some properties not declared, that will be added to all accounts.
    this.movements = [];
    this.locale = navigator.language;
    console.log(`Thanks for opening an account ${owner}`);
  }

  //Public Interface
  deposit(val) {
    this.movements.push(val);
  }
  withdraw(val) {
    this.deposit(-val);
  }
  approveLoan(val) {
    return true; // no need to implement a complex logic here, just to show the funcitonality.
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      // if the approveLoan is true, then...
      this.deposit(val);
      console.log('Loan approved.');
    }
  }
}

const acc1 = new Account('Paolo', 'EUR', 1111);
console.log(acc1);

// Adding an movement, we could directly write like this, however it is not a good idea, let's create a method for that.
// acc1.movements.push(250);
// acc1.movements.push(-140);

// With the methods:
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
// if we had a logic in approveLoan in this scenario we could simply do: accc1.approveLoan = true, but in the real world we couldn't
// have access to approveLoan. This is why we need some data encapsulation and data privacy.
console.log(acc1);

// So deposit and withdraw are a public interface, or an interface to our objects, also called API.
// Using the API we abstracted away the fact that the user must input a negative value to a withdraw, that only can avoid bugs.
console.log(acc1.pin); // so the pin is accessible outside from outside of the class.

*/
//? 218 Encapsulation_ Protected Properties and Methods.mp4

// 2 reasons why we need data privacy:
//* 1st to avoid a code from outside the class manipulate the data inside the class. We did that using the movements.push(250)
//* 2nd when we expose only a small interface we can change the methods inside the class with more confidence, because external code will not rely
//* on the private methods.
//* However JS is not really ready to deal with encapsulation, it is not ready yet. Whe will fake an encapsulation using a convention.

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin; //* to "protect" it we will add the _
    // Now lets add some properties not declared, that will be added to all accounts.
    // Protected Data, it does not really protect, but the programers team will know it should not be modified outside the class.
    this._movements = []; //* to "protect" it we will add the _
    this.locale = navigator.language;
    console.log(`Thanks for opening an account ${owner}`);
  }

  //Public Interface
  getMovements() {
    // we could have a getter, but it is very common to have variables getSomething or setSomething without using getter or setter.
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }
  withdraw(val) {
    this.deposit(-val);
  }
  _approveLoan(val) {
    // since we inserted the _ before the name of this method, it should not be public outside the API, all the others should be.
    return true; // no need to implement a complex logic here, just to show the funcitonality.
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      // if the approveLoan is true, then...
      this.deposit(val);
      console.log('Loan approved.');
    }
  }
}

const acc1 = new Account('Paolo', 'EUR', 1111);
console.log(acc1);

// Adding an movement, we could directly write like this, however it is not a good idea, let's create a method for that.
// acc1.movements.push(250);
// acc1.movements.push(-140);

// With the methods:
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
// if we had a logic in approveLoan in this scenario we could simply do: accc1.approveLoan = true, but in the real world we couldn't
// have access to approveLoan. This is why we need some data encapsulation and data privacy.

// This would be a right way of getting the movements.
console.log(acc1.getMovements());

console.log(acc1);

// So deposit and withdraw are a public interface, or an interface to our objects, also called API.
// Using the API we abstracted away the fact that the user must input a negative value to a withdraw, that only can avoid bugs.
console.log(acc1.pin); // so the pin is accessible outside from outside of the class.

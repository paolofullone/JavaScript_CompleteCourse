'use strict';

//093 Scoping in Practice.mp4
// Scope Chain

/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `Output => ${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var milennial = true;
      // now we have two variables with the name: firstName, and that's not a problem at all, because they are in different scopes.
      // creating NEW variable with same name as outer scope's variable.
      const firstName = 'Joe';

      // reassigning outer scopes's variable.
      output = 'NEW OUTPUT'; // here we are manipulating a variable inside a child scope, an inner scope. we did not create a new variable.
      const str = `Oh, you're a milennial, ${firstName}.`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      // if we change this call to const output, than the NEW OUTPUT in the console will be replaced by the original output.
    }
    // console.log(str); // not accessible outside the block.
    console.log(milennial); // variables declared with var keyword are function scoped and can be accessed outside the block.
    // js will ignore the {}
    // console.log(add(2, 3)); // functions are block scoped and cannot be accessed outside the {}. If we take the 'use strict' mode, it will work.
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Paolo';
calcAge(1985);


// console.log(age); since age is defined in the global scope it's not accessible in the outer scope.
// we cannot have access to a child scope here.
// printAge(); same here, we can't access it.

// 095 Variable Environment_ Hoisting and The TDZ.mp4
// The Execution Content of JS has a Variable environment, a Scope Chain and a this keyword.
// Lets check the variable environment.

// In the creation phase before the execution the ode is scanned for variable declarations, and for
// each variable, a new property is created in the variable environment object.

// PRINTS...

// 096 The this Keyword.mp4

// special variable that is created for every execution content (every function). Takes the value of (points to) the
// "owner" of the function in which the this keyword is used.

// console.log(this);

const calcAge = function (birthYear) {
  //   console.log(2037 - birthYear);
  //   console.log(this);
};

calcAge(1978);

const calcAgeArrow = birthYear => {
  //   console.log(2037 - birthYear);
  //   console.log(this);
};

calcAgeArrow(1978);

// this keyword is undefined in the function and window in the arrow function.
// the arrow function does not get its own this keyword. It uses the lexical this keyword.
// it uses the this keyword of its parent function or its parent scope.
// In this case it is the global scope, as the first console.log(this);

const paolo = {
  year: 1978,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};

// now paolo will call the calcAge object, so it will use the this keyword. not because the calcAge is written inside the paolo object.
paolo.calcAge(); // the advantage is to use the this.year inside the const paolo and then pass the function w/o the year.

const manuela = {
  year: 2011,
};

manuela.calcAge = paolo.calcAge;
// if we type manuela in the console we will see the Manuela's age.

// this proofs that the this keyword always points to the object calling the method.
manuela.calcAge();

const f = paolo.calcAge;
// if we type f in the console we will see the function:

// ƒ () {
//     console.log(this);
//     console.log(2037 - this.year);
//   }

// if we call f():
f();

// we got an error because f now is undefined and cannot read the year of undefined.
// undefined.year of course does not exist.
// it happens because f(); it's a regular function call, it's not attached to an owner
// so the this keyword is undefined.


//098 Regular Functions vs. Arrow Functions.mp4

// when we call the greet arrow function, the return will be undefined. Arrow function doesn't
// have the this keyword, it inherits from it's parents scope, which in this case is global scope, where
// firstName was not defined.

// to demonstrate the behavior of var let's include another variable firstName
// var firstName = 'Kely';

const paolo = {
  firstName: 'Paolo',
  year: 1978,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
  greet: () => {
    console.log(this); // if we expand this window object in inspector we will see a firstName 'Kely'.
    console.log(`Hey, ${this.firstName}`);
  },
};
paolo.greet();
console.log(this.firstName); // when we try to access an property that doesn't exist on a certain
// object, we get undefined instead of an error.

// this behavior can be very dangerous, if we have another variable declared with var on the global object

// NEVER USE ARROW FUNCTION AS A METHOD.
// if we replace the () => by a regular 'function ()' the call of paolo.greet() will be fine.
*/

// in this code we will have an undefined this keyword inside the isMillennial function.
/*
const paolo = {
  firstName: 'Paolo',
  year: 1985,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    const isMillennial = function () {
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillennial();
  },
  greet: () => {
    console.log(this); // if we expand this window object in inspector we will see a firstName 'Kely'.
    console.log(`Hey, ${this.firstName}`);
  },
};
paolo.greet();
paolo.calcAge();
console.log(this.firstName);
*/

// One solution (previous ES6) is to store the this keyword outside the function:
/*
const paolo = {
  firstName: 'Paolo',
  year: 1985,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    const self = this; // self of that can be found in older code bases

    const isMillennial = function () {
      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillennial();
  },
  greet: () => {
    console.log(this); // if we expand this window object in inspector we will see a firstName 'Kely'.
    console.log(`Hey, ${this.firstName}`);
  },
};
paolo.greet();
paolo.calcAge();
*/

// with ES6 we have a modern solution using arrow function:
/*
const paolo = {
  firstName: 'Paolo',
  year: 1985,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    // Solution 1 (previous ES6)
    // const self = this; // self of that can be found in older code bases
    // const isMillennial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution 2:
    // Here the arrow function inherits the this keyword from the parent function.
    const isMillennial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillennial();
  },

  greet: () => {
    console.log(this); // if we expand this window object in inspector we will see a firstName 'Kely'.
    console.log(`Hey, ${this.firstName}`);
  },
};
paolo.greet();
paolo.calcAge();
*/

// arguments keyword
/*
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 9, 12); // even if we pass more parameters than predicted in the function
// they are stored in an array if we inspect the element, so we could for example loop trough all the parameters.

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b; // in arrow functions if we have more than 1 line of code we need to explicity return
};
addArrow(2, 5, 9); // this will result in an error. the arguments keywords exists only in regular functions.
// the arguments keyword is not very important in modern JS, but it's important to know.


//099 Primitives vs. Objects (Primitive vs. Reference Types).mp4

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge); // at this point we get 2 different ages

const me = {
  name: 'paolo',
  age: 43,
};

const kely = me;
kely.age = 40;
console.log('Kely', kely);
console.log('Me', me); // here we get the same age for both

// in the 099 Primitives vs. Objects (Primitive vs. Reference Types).png we can see that the primitives
// are stored in the call stack, while the reference types are stored in the heap

// 099 Primitives vs. Objects (Primitive vs. Reference Types)2.png
// Regarding primitive values on call stack:
// When we first set the age to 30, it stores that information in a so called 0001 memory address.
// oldAge is equal to age, so it has the same 0001 memory address.
// when we change the age to 31, a new memory address (0002) will be allocated with the new value.

// Reference values:
// So again, when we declare a variable as an object, an identifier is created,
// which points to a piece of memory in the stack, which in turn points to a piece of memory in the heap.
// And that is where the object is actually stored. And it works this way because objects might be
// too large to be stored in the stack. Instead they are stored in the heap, which is like an almost unlimited memory pool.
// And the stack just keeps a reference to where the object is actually stored in the heap
// so that it can find it whenever necessary.
//

// And by the way, even though we defined the Friend variable as a constant, we can actually still manipulate the object
// without problems. And when we think about that, it makes sense because we're actually not changing the value in memory
// for the Friend identifier, it is still D30F. So the reference to the object.
// All we did was to change the value in the heap, and that's not a problem.
// So it's a misconception that all variables declared with const are immutable.
// In fact, that is only true for primitive values, but not for reference values.
// So keep that in mind, whenever you're working with const.

// 099 Primitives vs. Objects (Primitive vs. Reference Types).png
// We can see that a reference value copied to another object has the same address in the HEAP.
// So if we change the value of this Address in HEAP the new value will point to all the objects.
// In this case the variables me and kely.

*/
// 100 Primitives vs. Objects in Practice.mp4

// as seen each primitive value is saved in it's own piece of memory in the stack, that's why we have both names.

// Primitive types:
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// now let's do the same with an object which is a reference value stored in the heap
// and the stack only keeps a reference to the memory position which the object is stored at the heap.
// reference types:
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica; // we are copying the jessica object to marriedJessica,
// however behind the scenes, this one is not a new object in the Heap. it's just another
// variable in the stack that holds the reference to the original object.
// Both marriedJessica and jessica variables point to the same memory address in the heap.
// because in the stack they both hold the same memory reference in the heap.
// This is why we can change the content of the const, which has a value in the stack that
// cannot be changed, in the stack the value only holds the reference to the heap, which we are not actually changing.
// We are changing the underlying object stored in the heap, and that has nothing to do with const or let.
// we cannot try to attempt a complete new object to marriedJessica because that would create a new memory address.

// Conclusion: completely changing an object, assigning a new object to it, is completely different than
// changing a property.
console.log('');
console.log('Before marriage, before update:', marriedJessica);

marriedJessica.lastName = 'Davis'; // now we just updated the object

console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

// Now how do we effective copy an object?
// Copying objects

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

// The object.assign will merge two objects and create a new one. Here we merged and empty
// object with the jessica2 const just created with the lastName williams.
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
console.log('');
console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);

// behind the scenes a new object was created in the heap.
// However, we still have a problem, the object.assign only works in the first level
// if we have an object inside the object, then the inner object will actually still be the same
// it will still point to the same place in memory. That's why object.assign creates a shallow copy
// and not a deep clone.

const jessica3 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'], // now we included this array.
};

// The object.assign will merge two objects and create a new one. Here we merged and empty
// object with the jessica2 const just created with the lastName williams.

// now and example of this issue:
const jessicaCopy3 = Object.assign({}, jessica3);
jessicaCopy3.lastName = 'Davis';
console.log('');
console.log('Before marriage:', jessica3);
console.log('After marriage:', jessicaCopy3);

// now adding some family members. Manipulating an object (array) inside the object (jessicaCopy3)
jessicaCopy3.family.push('Mary');
jessicaCopy3.family.push('John');
console.log('');
console.log('Before marriage:', jessica3);
console.log('After marriage:', jessicaCopy3);

// so now jessica3 and JessicaCopy3 has the 4 family members and not only jessicaCopy3

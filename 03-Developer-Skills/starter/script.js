// Remember, we're gonna use strict mode in all scripts now!
"use strict";

/*
// 059 - Using Google, StackOverflow and MDN

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this:
// "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that ;
// sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// What is temperature amplitude? Difference between the higher and the lower temperature.
// How to calculate the highest and lowest values in an array?
// What a sensor error looks like? What to do when it occurs?

// 2) Breaking up into sub-problems
// How to ignore errors?
// Find max value in temperature array;
// Find the min value in temp. array;
// Subtract min from max and return.

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];

    if (typeof curTemp !== "number") continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

// PROBLEM 2:
// Now the PM says the function should receive two arrays of temperatures and return one max and one min.

// 1) Understanding the problem
// with two arrays we need to implement functionality twice? No, just merge the arrays.

// 2) Breaking up into sub-problems
// How to merge 2 arrays?

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];

    if (typeof curTemp !== "number") continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeNew = calcTempAmplitudeNew([1, 2, 3], [4, 5, 6]);
console.log(amplitudeNew);

*/
// 060 Debugging (Fixing Errors).mp4
// 061 Debugging with the Console and Breakpoints.mp4

// const measurementKelvin = function () {
//   const measurement = {
//     type: `temp`,
//     unit: `celsius`,
//     // C - fix the bug by adding Number in prompt.
//     //    value: Number(prompt(`Degrees Celsius: `)), // this should be used to prompt.
//     value: 10, // for exercise purposes only
//   };
//   //B - Find the bug:
//   // console.log(measurement); // this shows the entire method, and we see that 10 is a string.
//   console.table(measurement); // this gives us a nicce formatedly table.
//   // console.log(measurement.value); // let`s check if there`s something wrong with measurement values.
//   // console.warn(measurement.value); // let`s check if there`s something wrong with measurement values.
//   // console.error(measurement.value); // let`s check if there`s something wrong with measurement values.
//   const kelvin = measurement.value + 273;
//   return kelvin;
// };
// // A - Identify the bug:
// console.log(measurementKelvin());

// using a debugger
// const calcTempAmplitudeBug = function (t1, t2) {
//   const temps = t1.concat(t2);
//   console.log(temps);

//   let max = 0; // we set the values to 0 and this caused 0 to be the minimum value.
//   let min = 0;

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];

//     if (typeof curTemp !== "number") continue;
//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }
//   console.log(max, min);
//   return max - min;
// };
// const amplitudeBug = calcTempAmplitudeBug([1, 9, 3], [4, 5, 12]);
// console.log(amplitudeBug);

// we steped inside the Sources in chrome and inserted a breakpoint where the values are compared, anc checked
// step by step inside the loop the values of each iteration.

// 062 Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]

// the inputt array can have multiple values
// print each value and respective day (count starting at 1)

*/
// let weather = [];
// function printForecast(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     weather.push(`... ${arr[i]} ºC in ${i + 1} days `);
//   }
//   return console.log(weather);
// }
// printForecast([17, 21, 23, 349]);

// my solution was as an array...not the same result but the same texts...
// instructor solution

// 1- understand the problem
// - array transformed to string broken in 3 pieces separated by 3 dots
// - what is the x days? index + 1;

// 2 - breaking into sub problems
// - transform the array into string.
// - transform each element into string with ºC
// - string needs to contain day (index + 1)
// - Add ... between elements and start and endo of string.

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += `... ${arr[i]}ºC in ${i + 1} days `;
  }
  console.log(str + "...");
};
printForecast(data1);
printForecast(data2);

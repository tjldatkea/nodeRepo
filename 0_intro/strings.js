// --------------------------------------
// Exercise 1 - Add numbers from string to float

const numberOne = "1.10";
const numberTwo = "2.30";

// add those two numbers and show the result
// you cannot touch line 1 neither line 2
let numberOneFloat = parseFloat(numberOne);
let numberTwoFloat = parseFloat(numberTwo);

let sum = numberOneFloat + numberTwoFloat;
console.log("sum of numberOne and numberTwo: " + sum);
// --------------------------------------


// --------------------------------------
// Exercise 2 - Add the numbers and the total with 2 decimals

const anotherNumberOne = "1.10";
const anotherNumberTwo = "2.30";

let sumTwo = parseFloat(anotherNumberOne) + parseFloat(numberTwoFloat);
console.log("sum of anotherNumberOne and Two(with two decimals): " + sumTwo.toFixed(2));
// --------------------------------------
// Exercise 3 - Decimals and average

const one = 10;
const two = 45;
const three = 98;

// Show in the console the avg. with 5 decimals
let avg = (one + two + three) / 3;

console.log("average: " + avg.toFixed(5));



// --------------------------------------
// Exercise 4 - Get the character by index

const letters = "abc";
// Get me the character "c"
console.log("Character c has index: " + letters.search("c"));



// --------------------------------------
// Exercise 5 - Replace

//const fact = "You are learning javascript!";
let fact = "You are learning javascript!";

// capitalize the J in Javascript
fact = fact.substring(0, 17) + fact[17].toUpperCase() + fact.substring(18);
console.log(fact);

let factTwo = "You are learning javascript!";

factTwo = factTwo.replace("j", "J");
console.log(factTwo);



// --------------------------------------


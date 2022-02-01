let navn = "Anders";

const age = 7;

console.log("navn: " + navn + " alder: " + age); // age ændres til en streng ved concatenation (type coercion)

navn = "Jens";

// age = 9; // kan ikke ændres da det er en const

console.log("navn: " + navn + " alder: " + age);

console.log("navn: " + navn + " alder: ", age); // med komma ændres age her ikke til en streng


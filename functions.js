

// der er en fejl i denne:
//const addArrowFunction (x,y) => {x + y;}//, hvor både ; og {} er valgfrie, i hvert fald, hvis der kun er en linie.

//Når man bruger en funktion som en parameter for en anden funktion, så hedder det en callback funktion. 

//callback funktion:
//function doActionWithSomeone(anyFunctionReference/* det her er callback funktionen */, name) {
function doActionWithSomeone(anyFunctionReference, name) {
    anyFunctionReference(name);
}

const running = (name) => console.log(`${name} is running`);
// bemærk ` på ovenstående linie, som laves med shift og knappen til venstre for backspace
// det virker ikke hvis man bruger "" eller ''

doActionWithSomeone(running, "Anders");

function doActionWithSomeoneAgainAndAgain(anyFunctionReference, name, number) {
    anyFunctionReference(name, number);
}

const passing = (name, number) => {
    while (number < 100) {
        number++;
        const endList = ["st", "nd", "rd", "th"];
        let ending = "";

        if (number % 10 === 1) {
            ending = "st";
            //ending = endList[number % 10 == 1];
        }
        else {
            if (number % 10 === 2) {
                ending = "nd";
                //ending = endList[number % 10 == 1];
            }
            else {
                if (number % 10 === 3) {
                    ending = "rd";
                    //ending = endList[number % 10 == 1];
                }
                else {
                    ending = "th";
                    //ending = endList[number % 10 == 1];
                }
            }
        }


        console.log(`${name} is running for the ${number}${ending} time`);
    }
}

doActionWithSomeoneAgainAndAgain(passing, "Anders", 0);


// objects
const chicken = {
    sound: "vsdsvd",
    color: "sdcdsdcjk"
}

console.log("chicken.sound: " + chicken.sound); // dot notation
console.log("chicken[\"sound\"]: " + chicken.sound); // dot notation


const numbers = [1, 2, 3]

//const newNumbers = numbers; // vil give problemer, når man bruger pop() på den ene, 
// da de referer til det samme objekt og begge variabler derfor får poppet et element

// I stedet kan man lave et nyt objekt til den nye variabel:
const newNumbers = numbers.slice();
// eller
const newNumbersTwo = [...numbers];

console.log("numbers: (before pop()): " + numbers);
numbers.pop();
console.log("numbers: (after pop()): " + numbers);

console.log("newNumbers: " + newNumbers);
console.log("newNumbersTwo: " + newNumbersTwo);
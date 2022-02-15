const express = require("express");
const app = express();


// Man kan bruge backticks (`) i stedet for "" når vi skriver HTML der skal returneres
// på den måde kan man skrive over flere linier og man kan bruge ${<variabelnavn>}

// I express kaldes der hvor HTML'erne ligger(i andre frameworks kaldes det assets/views/static eller noget helt fjerde)


app.get("/", (req, res) => {
    res.send(`<h1>Welcome to World Wide Express</h1><p>${true}</p>`);
});


// Her "serverer" man HTML filen
app.get("/activities", (req, res) => {
    res.sendFile(__dirname + "/public/activities.html");
    console.log(__dirname);
});

app.get("/clock", (req, res) => {
    res.sendFile(__dirname + "/public/urV2.html");
    console.log(__dirname);
});


app.listen(8080, () => { // the callback function
    console.log("The server is running", 8080);
})






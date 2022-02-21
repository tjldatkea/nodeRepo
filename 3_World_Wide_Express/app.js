const express = require("express");
const app = express();
app.use(express.static(__dirname + '/public'));

// Man kan bruge backticks (`) i stedet for "" når vi skriver HTML der skal returneres
// på den måde kan man skrive over flere linier og man kan bruge ${<variabelnavn>}

// I express kaldes dér hvor HTML'erne ligger for public(i andre frameworks kaldes det assets/views/static eller noget helt fjerde)


app.get("/", (req, res) => {
    res.send(`<h1>Welcome to World Wide Express</h1>
    <a href="activities.html">activities<a/>
    <a href="UrV2.html">clock<a/>
    <p>test</p>
    <p>${true}</p>`);
});


// Her "serverer" man HTML filen
app.get("/activities", (req, res) => {
    res.sendFile(__dirname + "/public/activities.html");
    console.log(__dirname);
});

app.get("/clock", (req, res) => {
    res.sendFile(__dirname + "/public/urV2.html");
    // Hvorfor virker nedenstående ikke? Brugte app.use istedet
    //res.sendFile(__dirname + "/public/digitalDigits/digital_0.bmp");
    //res.sendFile(__dirname + "/public/digitalDigits/digital_1.bmp");
    //res.sendFile(__dirname + "/public/digitalDigits/digital_2.bmp");
    //res.sendFile(__dirname + "/public/digitalDigits/digital_3.bmp");
    console.log(__dirname);
});


app.listen(8080, () => { // the callback function
    console.log("The server is running", 8080);
})






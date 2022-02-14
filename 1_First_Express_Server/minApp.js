// Test af idéer

// import express
const express = require("express");
const app = express();

// de to ovenstående linie kan slås sammen til følgende:
//const app = require("express")();

//console.log(express);

app.use(express.json());

//endpoint callback function
//an empty callback function: () => {}
// req: request, res: result
app.get("/", (req, res) => {
    //res.send({ message: "We did it!" });  // json
    let HTMLTekst = "";
    HTMLTekst += "<a href=\"/welcome\">Til welcome</a><br>";
    HTMLTekst += "<a href=\"/beers\">Til beers</a><br>";
    res.send(HTMLTekst);
    console.log("/");
});


app.get("/welcome", (req, res) => {
    res.send({ message: "Welcome" });  // json
    //res.send("<h1> Welcome </h1>"); // virker osse
    console.log("/welcome");
});

app.get("/beers", (req, res) => {
    let HTMLTekst = "<table>";
    // for (let i = 0; i < beers.length; i++) {
    //     HTMLTekst += ("beers[" + i + "].id: " + beers[i].id + " data: " + beers[i].data) + "<br>";
    // }
    for (let i = 0; i < beers.length; i++) {
        //HTMLTekst += "<tr><td> beers[" + i + "].id: " + beers[i].id + " data: " + beers[i].data + "</td><td><button onclick=\"deleteItem(" + beers[i].id + ")\">Delete</button</td></tr>";
        HTMLTekst += "<tr><td> beers[" + i + "].id: " + beers[i].id + " data: " + beers[i].data + "</td><td><a href=\"/beers/delete/" + beers[i].id + "\">Delete</a></td></tr>"; // " + beers[i].id + 
    }
    HTMLTekst += "</table>";
    res.send(HTMLTekst);
    console.log("/beers");
});

app.get("/beers/:id", (req, res) => {
    // res.send(req.params.id); // returnerer parameteren fra browseren

    let HTMLTekst = "";

    //let beer = [...beers.filter(x => x.id !== item.id)] // jeg mangler item

    //let idFraBruger = req.params.id;
    let beerIndex = beers.findIndex((element) => (element.id == req.params.id)); // Hvorfor virker det ikke med ===?
    console.log("beerIndex: " + beerIndex);

    HTMLTekst += "beers[" + beerIndex + "].id: " + beers[beerIndex].id + " data: " + beers[beerIndex].data + "<br>";

    res.send(HTMLTekst);
    console.log(`/beers/${req.params.id} get`);
});


app.delete("/beers/:id", (req, res) => {
    // res.send(req.params.id); // returnerer parameteren fra browseren


    beers = [...beers.filter(x => x.id !== req.params.id)]
    // Er grunden til at det ikke bliver slettet at det er hardcoded??
    // prøv at slette noget der er tilføjet, når den app.post er implementeret
    // fra postman { "id": 4, "data": "test4" }
    // Nået til 21:20 i mosh' rest api

    let HTMLTekst = "";
    for (let i = 0; i < beers.length; i++) {
        HTMLTekst += ("beers[" + i + "].id: " + beers[i].id + " data: " + beers[i].data) + "<br>";
    }
    res.send(HTMLTekst);
    console.log(`/beers/${req.params.id} delete`);
});

// Alternativ delete indtil jeg har noget bedre
app.get("/beers/delete/:id", (req, res) => {
    // res.send(req.params.id); // returnerer parameteren fra browseren


    beers = [...beers.filter(x => x.id !== req.params.id)]
    // Er grunden til at det ikke bliver slettet at det er hardcoded??
    // prøv at slette noget der er tilføjet, når den app.post er implementeret
    // fra postman { "id": 4, "data": "test4" }
    // Nået til 21:20 i mosh' rest api

    let HTMLTekst = "";
    for (let i = 0; i < beers.length; i++) {
        HTMLTekst += ("beers[" + i + "].id: " + beers[i].id + " data: " + beers[i].data) + "<br>";
    }
    res.send(HTMLTekst);
    console.log(`/beers/${req.params.id} delete`);
});



// data skal gemmes i et array, noget hardcoded data, da det der tastes ind glemmes
let beers = [{ id: 1, data: "test1" }, { id: 2, data: "test2" }];



app.post("/mirror", (req, res) => {
    //res.send(req.body);
    res.send({ "sdvskvkmlsd": "svdvsv" })
    beers.push(req.body)
    for (let i = 0; i < beers.length; i++) {
        console.log("beers[" + i + "]: " + beers[i].data);
    }
    console.log("/mirror");
});

// Hvorfor virker det her ikke???
// 
function deleteItem(id) {
    console.log(`DeleteItem function called with beer id: ${id}`)
}


// const port = process.env.PORT || 8080;

const port = 8080;



// denne linie skal holdes i bunden af dokumentet/scriptet, så andre let 
// kan finde ud af hvilken port de skal kigge efter
//app.listen(port, () => console.log("Listening on port " + port));
app.listen(port, () => console.log(`Listening on port ${port}`));

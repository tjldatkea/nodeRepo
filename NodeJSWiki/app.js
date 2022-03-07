const express = require("express");
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json()); // bruges for at kunne parse body'en som json

const fs = require("fs"); // filesystem


let dataJSON = fs.readFileSync("./public/emner.json"); // /components

//let data = JSON.parse(dataJSON);

const { allTopics } = JSON.parse(dataJSON);

//console.log("allTopics keys: " + Object.keys(allTopics));
//console.log("allTopics values: " + Object.values(allTopics));

let allTopicsKeysList = Object.keys(allTopics);

let allTopicsValuesList = Object.values(allTopics);

console.log("allTopicsKeysList: " + allTopicsKeysList[0]);

//console.log(Object.values(allTopics)[0]);


let content = makePageWithAllTopics(allTopicsValuesList);



function makePageWithAllTopics(valuesList) {
    let samletHTMLTekst = ""
    valuesList.forEach(element => {
        samletHTMLTekst += makeDataToHTML(element);
    });
    return samletHTMLTekst;
}


// Det virker men hvorfor returnerer det bare en fil med html teksten i stedet for at vise siden
//let HTMLPage = String(fs.readFileSync("./public/skabelon.txt"));
//console.log("HTMLPage: " + HTMLPage[10]);

let HTMLPage = `
<!DOCTYPE html>
<html lang="en">

<head>
  <title>%%PLACEHOLDER_TITLE%% + NodeJS Wiki</title>
  <meta http-equiv="content-type" content="text-html; charset=utf-8; width=device-width, initial-scale=1" />

  <link rel="stylesheet" type="text/css" href="css/stylesheet.css" />
  </head>

<body>
<!--
  <div id="navBarDiv"></div>
  <div id="textDiv"></div>
  
  <img src="https://da.wikipedia.org/wiki/Node.js#/media/Fil:Node.js_logo.svg" alt="nodeJS">
  -->

  
  
%%PLACEHOLDER_NAVBAR%%
%%PLACEHOLDER_BODY%%


<script>
console.log("Hello from Client side");

</script>
<script src="./js/clientSideScript.js"></script>
</body>

</html>

`

//secondPartOfBodySecondPage = makeDataToHTML(data);

//const secondPageForTheUser = startOfHTML + headerSecondPage + startOfBody + nav + partOfBodySecondPage + secondPartOfBodySecondPage + endOfBody + endOfHTML;
const title = "TEST";

let secondPageForTheUser = HTMLPage.replace("%%PLACEHOLDER_BODY%%", content)

secondPageForTheUser = secondPageForTheUser.replace("%%PLACEHOLDER_TITLE%%", title);

const navBar = makeNavBar(allTopicsValuesList);  // valuesList er lige nu global og så er det teknisk set ikke nødvendig at give den med som parameter.

secondPageForTheUser = secondPageForTheUser.replace("%%PLACEHOLDER_NAVBAR%%", navBar);



function makeDataToHTML(dataParam) {

    let HTMLTekst = "";

    HTMLTekst += "<h1 id=\"" + dataParam.id + "\">" + dataParam.title + "</h2>"

    //HTMLTekst += "<h1>" + dataParam.title + "</h2><br>"  // virker

    let line = 0;

    dataParam.text.forEach(element => {

        let idName = dataParam.id + "line" + line;
        let classNumber = element.includes("%code%") ? 1 : 0;

        element = element.replace("%code%", "");

        while (element.includes("%indent%")) {
            element = element.replace("%indent%", "&emsp;");
        }

        //HTMLTekst += "<p id=\"" + idName + "\" onclick=\"editLine(" + idName + "," + line + ")\">" + element + "</p>";
        HTMLTekst += "<div id=\"" + idName + "\"><p class=\"c" + classNumber + "\" onclick=\"editLine(" + idName + "," + line + ")\">" + element + "</p></div>";  // funktionen ligger clientside

        // midl udkomm indtil saveChanges er fuldt implementeret:
        //HTMLTekst += "<div id=\"" + idName + "\"><p>" + element + "</p>"; //  + "</p>"
        //HTMLTekst += "<button onclick=\"editLine(" + idName + "," + line + ")\">edit</button></div><br>"; 

        //console.log("idName: " + idName);

        line += 1;
    });

    return HTMLTekst;
}


function makeNavBar(valuesList) {
    let HTMLTekst = "";
    HTMLTekst += "<ul><li><a class=\"active\" href=\"#navBarDiv\">Home</a></li>";

    for (let i = 0; i < valuesList.length; i++) {

        HTMLTekst += "<li><a href=\"#" + valuesList[i].id + "\">" + valuesList[i].title + "</a></li>";

    }

    HTMLTekst += "</ul>";

    return HTMLTekst;




}


app.get("/", (req, res) => {
    res.send(secondPageForTheUser);

    // Når jeg bruger window.location.assign, så er det get der routers til og derfor forsøger 
    // jeg mig med at samle dataen op her med querystrings
    const changedData = req.query.data;
    console.log("data: " + changedData);

});


app.get("/second", (req, res) => {
    res.send(`<h1>Welcome to NodeJSWiki</h1>
    <a href="git.html">git kommandoer<a/>`);
    // <p>${true}</p>
});


// Her "serverer" man HTML filen
app.get("/git", (req, res) => {
    res.sendFile(__dirname + "/public/git.html");
    console.log(__dirname);
});



app.post("/", (req, res) => {
    //const changedData = req.body;

    //const changedData = req.query.data;
    //console.log("data: " + changedData);

    res.send(secondPageForTheUser); // siden skal rettes med de nye data ***
});

const PORT = 8080; // evt 3000 i stedet og evt med env.Port

app.listen(8080, () => { // the callback function
    console.log("The server is running", 8080);
})






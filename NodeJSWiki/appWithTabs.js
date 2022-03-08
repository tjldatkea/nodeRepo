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

`;


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

        if (element.includes("%codeStart%") || element.includes("%codeFinish%")) {
            element = element.replace("%codeStart%", "<div class=\"code\">");
            element = element.replace("%codeFinish%", "</div>");
            HTMLTekst += element;
        }
        else {

            let idName = dataParam.id + "line" + line;
            let classNumber = element.includes("%code%") ? 1 : 0;

            element = element.replace("%code%", "");

            while (element.includes("%indent%")) {
                element = element.replace("%indent%", "&emsp;");
            }

            //HTMLTekst += "<p id=\"" + idName + "\" onclick=\"editLine(" + idName + "," + line + ")\">" + element + "</p>";

            HTMLTekst += "<div id=\"" + idName + "\"><p class=\"c" + classNumber + "\" onclick=\"editLine(" + idName + "," + line + ")\">" + element + "</p></div>";  // funktionen ligger clientside

            //HTMLTekst += "<p class=\"c" + classNumber + "\" onclick=\"editLine(" + idName + "," + line + ")\">" + element + "</p>";  // funktionen ligger clientside


            // midl udkomm indtil saveChanges er fuldt implementeret:
            //HTMLTekst += "<div id=\"" + idName + "\"><p>" + element + "</p>"; //  + "</p>"
            //HTMLTekst += "<button onclick=\"editLine(" + idName + "," + line + ")\">edit</button></div><br>"; 

            //console.log("idName: " + idName);

            line += 1;
        } // slut på else
    });

    return HTMLTekst;
}


function makeNavBar(valuesList) {
    let HTMLTekst = "";
    HTMLTekst += "<ul><li><a class=\"active\" href=\"#navBarDiv\">Home</a></li>";

    for (let i = 0; i < valuesList.length; i++) {

        HTMLTekst += "<li><a href=\"#" + valuesList[i].id + "\">" + valuesList[i].title + "</a></li>";

    }

    // link til tabs siden:
    HTMLTekst += "<li><a href=\"/tabs\">Forsøg med tabs</a></li>";

    HTMLTekst += "</ul>";

    return HTMLTekst;

}


// ***************************************************
// HTML herunder er fra w3schools og rettet til så det passer til dette program
let alternativHTMLPage = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {font-family: Arial;}

/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  -webkit-animation: fadeEffect 1s;
  animation: fadeEffect 1s;
}

/* Fade in tabs */
@-webkit-keyframes fadeEffect {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fadeEffect {
  from {opacity: 0;}
  to {opacity: 1;}
}

div.code {
    font-size: 100%;
    font-style: italic;
    background-color: #999;
  }
</style>
</head>
<body>

%%PLACEHOLDER_BODY%%

<script>
function openTopic(evt, topicName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(topicName).style.display = "block";
  evt.currentTarget.className += " active";
}
</script>
<script src="./js/clientSideScript.js"></script>
   
</body>
</html> 

`;
// ***************************************************
//let pageWithTabs = "";

function makePageWithTabs(valuesList) {

    let HTMLTekst = '<div class="tab">';

    for (let i = 0; i < valuesList.length; i++) {
        HTMLTekst += `<button class="tablinks" onclick="openTopic(event, '${valuesList[i].title}')">${valuesList[i].title}</button>`
    }

    HTMLTekst += "</div>";

    for (let i = 0; i < valuesList.length; i++) {
        HTMLTekst += `
    <div id="${valuesList[i].title}" class="tabcontent">
      ${makeDataToHTML(valuesList[i])}
    </div>
    `;
    }

    //pageWithTabs = alternativHTMLPage.replace("%%PLACEHOLDER_BODY%%", HTMLTekst);

    return alternativHTMLPage.replace("%%PLACEHOLDER_BODY%%", HTMLTekst);
}



app.get("/", (req, res) => {
    res.send(secondPageForTheUser);

    // Når jeg bruger window.location.assign, så er det get der routers til og derfor forsøger 
    // jeg mig med at samle dataen op her med querystrings
    const changedData = req.query.data;
    console.log("data: " + changedData);

});

app.get("/tabs", (req, res) => {
    res.send(makePageWithTabs(allTopicsValuesList));
    console.log("pageWithTabs");
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






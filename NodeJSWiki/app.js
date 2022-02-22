const express = require("express");
const app = express();
app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
    res.send(`<h1>Welcome to NodeJSWiki</h1>
    <a href="git.html">git kommandoer<a/>`);
    // <a href="UrV2.html">clock<a/>
    // <p>test</p>
    // <p>${true}</p>
});


// Her "serverer" man HTML filen
app.get("/git", (req, res) => {
    res.sendFile(__dirname + "/public/git.html");
    console.log(__dirname);
});




app.listen(8080, () => { // the callback function
    console.log("The server is running", 8080);
})






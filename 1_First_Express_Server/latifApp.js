// Fra undervisning:

// import Express
const express = require("express");
const app = express();

// alternative way of doing it
// const app = require("express")();

app.use(express.json());

        // endpoint    callback function
app.get("/", (req, res) => {
    res.send({ message: "We did it!" });
});

// todo implement a route called welcome that welcomes the client
// todo same task: create a route handler on the endpoint /welcome

app.post("/mirror", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


app.listen(8080);
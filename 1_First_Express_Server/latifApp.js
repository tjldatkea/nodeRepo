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

app.get("/clientgreeting/:name", (req, res) => {
    res.send({ greeting: `Hello there, ${req.params.name}.` });
});

// url kangaroofacts?cankick=true   <-- query string
app.get("/kangaroofacts", (req, res) => {
    res.send(req.query);
});

app.post("/mirror", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

const PORT = 8080;
app.listen(PORT, (error) => {
    // if (error) {
    //     console.log(error);
    // }
    console.log("Server is running on port", PORT);
});


// How can I send data with a GET request???
// path variable        url: /1
// query string         url: ?key=value&key2=value2


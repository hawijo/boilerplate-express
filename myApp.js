require('dotenv').config()
let express = require('express');
let app = express();
console.log("Hello World");

path = __dirname + '/views/index.html'
var response = "Hello json"

app.get("/", (req, res) => {
    res.sendFile(path);
  });

app.use("/public", express.static(__dirname + "/public"));

if (process.env.MESSAGE_STYLE === "uppercase") {
  response = "HELLO JSON";
} else {
  response = "Hello json";
}

app.get("/json", (req, res) => {
  res.json({
    response
  });
});



























 module.exports = app;

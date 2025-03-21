require('dotenv').config()
let express = require('express');
let app = express();
console.log("Hello World");

path = __dirname + '/views/index.html'
var message = "Hello json"

app.get("/", (req, res) => {
    res.sendFile(path);
  });

app.use("/public", express.static(__dirname + "/public"));





app.get("/json", (req, res) => {
  if ( process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ "message": message });
});



























 module.exports = app;
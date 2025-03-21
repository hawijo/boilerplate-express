require('dotenv').config()
let express = require('express');
let app = express();
console.log("Hello World");

path = __dirname + '/views/index.html'

app.get("/", (req, res) => {
    res.sendFile(path);
  });

app.use("/public", express.static(__dirname + "/public"));

if (process.env.MESSAGE_STYLE == "uppercase"){
  message = message.toUpperCase
}

app.get("/json", (req, res) => {
  res.json({
    message: "Hello json"
  });
});



























 module.exports = app;

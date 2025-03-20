let express = require('express');
let app = express();
console.log("Hello World");

path = __dirname + '/views/index.html'

app.get("/", (req, res) => {
    res.sendFile(path);
  });

app.use("/public", express.static(__dirname + "/public"));



app.get("/json", (req, res) => {
  res.json({
    message: "Hello json"
  });
});



























 module.exports = app;

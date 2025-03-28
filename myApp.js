require('body-parser');
require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser')
let app = express();
console.log("Hello World");

path = __dirname + '/views/index.html';
var message = "Hello json";


app.use(bodyParser.urlencoded({extended: false}))
app.use(function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

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

app.get("/now",(req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({
      time: req.time
    });
  }
);

app.get("/:word/echo", (req, res, next) => {
  console.log(req.params.word);
  next(); 
  },
  
  (req, res) => {
    res.json({
      echo: req.params.word
    });
  }


);


app.get("/name", (req, res) => {
  console.log(req.query.first, req.query.last);
  var full = req.query.first + " " + req.query.last;
  res.json({
    name: full
  });
})


















 module.exports = app;
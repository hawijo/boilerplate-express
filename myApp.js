require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser')
let app = express();
console.log("Hello World");

path = __dirname + '/views/index.html';
getaquote = __dirname + '/views/get_a_quote.html';
login = __dirname + '/views/login.html';
loggedin = __dirname + '/views/loggedin.html'
map = __dirname + '/views/map.html'
signin = __dirname + '/views/signin.html'
var message = "Hello json";


app.use(bodyParser.urlencoded({extended: false}));

app.use(function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.get("/", (req, res) => {
    res.sendFile(path);
  });

app.use("/public", express.static(__dirname + "/public"));
app.use("/images", express.static(__dirname + "/images"));
app.use("/jscript", express.static(__dirname + "/jscript"))





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


app.get("/getaquote", (req, res) => {
  res.sendFile(getaquote);
});

app.get("/signin", (req, res) => {
  res.sendFile(signin);
});

app.get("/login", (req, res) => {
  res.sendFile(login);
});

app.get("/loggedin", (req, res) => {
  res.sendFile(loggedin);
});

app.get("/map", (req, res) => {
  res.sendFile(map);
});









 module.exports = app;
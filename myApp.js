require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
console.log("Hello World");

const filePath = path.join(__dirname, 'views', 'index.html');
let message = process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";

app.get("/", (req, res) => {
  res.sendFile(filePath);
});

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/json", (req, res) => {
  res.json({ response: message });
});

// Ensure server is listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

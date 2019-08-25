const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
var app = express();

app.use("/", express.static(path.join(__dirname,"public2/")));

app.listen(PORT, ()=>{console.log(`HTTP SERVER UP ON PORT: ${PORT}`);});
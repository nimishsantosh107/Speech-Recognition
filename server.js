const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const IP4 = "192.168.1.100";
const privateKey  = fs.readFileSync('./SSL_KEY/rtc.key', 'utf8');
const certificate = fs.readFileSync('./SSL_KEY/rtc.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

var app = express();
var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

app.use("/", express.static(path.join(__dirname,"routes/ml5js/")));

httpServer.listen(PORT, ()=>{console.log(`HTTPS SERVER UP ON PORT: ${PORT}`);});
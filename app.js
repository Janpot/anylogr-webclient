var express = require('express');
var http = require('http');
var app = express();

var pub_dir = __dirname + '/app';

app.configure(function(){ 
    app.use(express.static(pub_dir));
});

http.createServer(app).listen(process.env.PORT);

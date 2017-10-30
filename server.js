// var express = require('express');
// var path = require('path');
// var serveStatic = require('serve-static');
// app = express();
// app.use(serveStatic(__dirname + "/dist"));
// var port = process.env.PORT || 5000;
// app.listen(port);
// console.log('server started '+ port);
// var history = require('connect-history-api-fallback');

var history = require('connect-history-api-fallback');

var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
app = express()
//add this middleware
app.use(history());
app.use(serveStatic(__dirname))
var port = process.env.PORT || 5000
app.listen(port)
console.log('server started '+ port)

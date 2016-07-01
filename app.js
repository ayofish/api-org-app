var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Setup server
var app = express();

var expressConfig = require('./config/express');
var routes = require('./routes');
expressConfig(app);
routes(app);

module.exports = app;

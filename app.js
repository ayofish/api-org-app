var express = require('express');
var mongoose = require('mongoose');
var mongoConfig = require('./config/mongodb');
var expressConfig = require('./config/express');
var routes = require('./routes');

// Connect to MongoDB
mongoose.connect(mongoConfig.mongo.uri, mongoConfig.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Setup server
var app = express();


expressConfig(app);
routes(app);

module.exports = app;

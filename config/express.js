/**
 * Express configuration
 */

var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

module.exports = function(app) {
    app.set('appPath', path.join(path.normalize(__dirname + '/..'), '/public'));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use(cookieParser());
    // app.set('views', path.join(path.normalize(__dirname + '/..'), '/views'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
};

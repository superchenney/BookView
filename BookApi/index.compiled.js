'use strict';
// import

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
// const gc = require('idle-gc');
var path = require('path');
var http = require('http');

// app modules
var app = express();

// routes
var routes = require('./routes/');
app.use('/', routes);

//config
var config = require('./config/');
app.use(helmet());

//app static
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine("html", require("ejs").__express);
app.use('/static', express.static(path.join(__dirname, 'public')));

//app config
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app config
app.set('port', config.APP.PORT);

//serve
http.createServer(app).listen(app.get('port'), function () {
    // gc.start(); // Run at 5 second intervals.
    console.log('APP Is Runing\uFF01port at ' + app.get('port'));
}).on('error', function (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

//# sourceMappingURL=index.compiled.js.map
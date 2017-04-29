'use strict'

// import
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const gc = require('idle-gc');
const path = require('path');
const http = require('http');


// app modules
const app = express();

// routes

const routes = require('./routes/index');
// app.use('/', routes);
routes(app);

//app static
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine("html", require("ejs").__express);
app.use('/static', express.static(path.join(__dirname, 'public')))

//app config
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//port
// const port = process.env.PORT || '3000';
const port = 3000;
app.set('port', port);


//serve
http.createServer(app)
    .listen(port, () => {
        // gc.start(); // Run at 5 second intervals.
        console.log(`APP Is Runing！port at ${app.get('port')}`)
    })
    .on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }
    });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

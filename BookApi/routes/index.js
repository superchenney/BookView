var express = require('express');
var router = express.Router();


router.all('*', (req, res, next) => {

    const allowedOrigins = ['https://supre.cc', 'https://www.supre.cc'];
    const origin = req.headers.origin || '';
    if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    };
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
    res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Max-Age', '1728000');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('X-Powered-By', 'Chenney 1.0.0');


    // OPTIONS
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
        return false;
    };


    next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// // Api
router.get('/version', (req, res) => {
    res.jsonp({
        version: '1.0.0'
    })
});

// router.all('*', (req, res) => {
//     res.jsonp({
//         code: 0,
//         message: '无效的API请求'
//     })
// });

module.exports = router;

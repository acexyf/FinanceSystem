// import express from 'express';
// import routes from './routes/index.js';
// import flash from 'connect-flash';
// import session from 'express-session';
// import path from 'path';
// import bodyParser from 'body-parser';

var express=require('express');
var routes=require('./routes/index.js');
var flash=require('connect-flash');
var session=require('express-session');
var path=require('path');
var bodyParser=require('body-parser');

let app = express();
let port = process.env.PORT || 8023;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(flash());
// app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use('/public', express.static('public'));
app.use(session({
    secret: 'finance',
    key: 'index', //cookie name
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    }, //30 days
}));
routes(app);

let server = app.listen(port, function() {
    let ipaddress = getIPAdress();
    if (ipaddress) {
        console.log('please open ' + ipaddress + ':' + port + ' in browser');
    } else {
        ipaddress = '127.0.0.1';
        console.log('no networking, please open ' + ipaddress + ':' + port + ' in browser')
    }
});


/**
 * 获取本机IP
 * @return {[string]} [IP地址]
 */
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

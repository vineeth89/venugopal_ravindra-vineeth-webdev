var express = require('express');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);
require("./assignment/app.js")(app);

var port      = 3000;

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});


// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var routes = require('./routes');
var books = require('./app/src/users/bookModel');
var passport = require('passport');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');


// configuration =================

mongoose.connect('mongodb://localhost/test');     // connect to mongoDB database on modulus.io
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', callback);
//db.close();
//
//function callback() {
//
//    var silence = new books({ title: 'Silence' });
//    console.log(silence.title); // 'Silence'
//
//    var NewBook = new books({ title: 'THIS PROVES WE CAN CREATE NEW BOOKS THIS WAY' });
//     // "Meow name is fluffy"
//    NewBook.save(function (err, fluffy) {
//        if (err) return console.error(err);
//        fluffy.speak();
//    });
//}

app.use(express.static(__dirname + '/app'));  // set the static files location /app
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

require('./routes')(app);

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
exports = module.exports = app;
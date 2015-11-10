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

app.use(express.static(__dirname + '/app'));  // set the static files location /app
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
//app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(passport.session());

//// load up the user model
//var User   = require('./app/src/users/Users');
//
//// load the auth variables
//var configAuth = require('./app/src/config/auth');
//
//passport.serializeUser(function(user, done) {
//    done(null, user._id);
//});
//
//passport.deserializeUser(function(id, done) {
//    User.findById(id, function(err, user) {
//        done(err, user);
//    });
//});
//
//module.exports = function(passport) {
//
//    // used to serialize the user for the session
//    passport.serializeUser(function(user, done) {
//        done(null, user.id);
//    });
//
//    // used to deserialize the user
//    passport.deserializeUser(function(id, done) {
//        User.findById(id, function(err, user) {
//            done(err, user);
//        });
//    });
//
//    // code for login (use('local-login', new LocalStategy))
//    // code for signup (use('local-signup', new LocalStategy))
//    // code for facebook (use('facebook', new FacebookStrategy))
//
//    // =========================================================================
//    // TWITTER =================================================================
//    // =========================================================================
//    passport.use(new TwitterStrategy({
//
//            consumerKey     : configAuth.twitterAuth.consumerKey,
//            consumerSecret  : configAuth.twitterAuth.consumerSecret,
//            callbackURL     : configAuth.twitterAuth.callbackURL
//
//        },
//        function(token, tokenSecret, profile, done) {
//
//            // make the code asynchronous
//            // User.findOne won't fire until we have all our data back from Twitter
//            process.nextTick(function() {
//
//                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
//
//                    // if there is an error, stop everything and return that
//                    // ie an error connecting to the database
//                    if (err)
//                        return done(err);
//
//                    // if the user is found then log them in
//                    if (user) {
//                        return done(null, user); // user found, return that user
//                    } else {
//                        // if there is no user, create them
//                        var newUser                 = new User();
//
//                        // set all of the user data that we need
//                        newUser.twitter.id          = profile.id;
//                        newUser.twitter.token       = token;
//                        newUser.twitter.username    = profile.username;
//                        newUser.twitter.displayName = profile.displayName;
//
//                        // save our user into the database
//                        newUser.save(function(err) {
//                            if (err)
//                                throw err;
//                            return done(null, newUser);
//                        });
//                    }
//                });
//
//            });
//
//        }));
//
//};

require('./routes')(app);

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
exports = module.exports = app;
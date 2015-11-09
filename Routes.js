/**
 * Created by hnatina on 11/4/15.
 */
'use strict';
var books = require('./bookMethods');
var passport = require('passport');

/**
 * Application routes
 */
module.exports = function(app) {

    // Server API Routes
    //app.param('bookId', books.book);
    app.post('/api/books', books.create);
    app.get('/api/books', books.query);
    app.get('/api/books/:booksId', books.show);
    app.put('/api/books/:booksId', books.update);
    app.delete('/api/books/:booksId', books.delete);

    // All other routes to use Angular routing in app/scripts/app.js
    //app.get('/partials/*', index.partials);

    app.get('/', function (req, res) {
        //res.send("WE MADE IT HERE");
        res.sendFile(__dirname + '/app/index.html', { message: req.flash('message') });
    });

    app.route('/categories')
        .get(function (request, response) {
            response.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
        });

    /* Handle Login POST */
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/categories',
        failureFlash : true
    }));

    /* GET Registration Page */
    app.get('/signup', function(req, res){
        res.render('register',{message: req.flash('message')});
    });

    /* Handle Registration POST */
    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true
    }));

};

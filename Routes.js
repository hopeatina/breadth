/**
 * Created by hnatina on 11/4/15.
 */
'use strict';
var books = require('./bookMethods');

/**
 * Application routes
 */
module.exports = function(app) {

    // Server API Routes
    app.param('bookId', books.book);
    app.post('/api/books', books.create);
    app.get('/api/books', books.query);
    app.get('/api/books/:booksId', books.show);
    app.put('/api/books/:booksId', books.update);
    app.delete('/api/books/:booksId', books.delete);

    // All other routes to use Angular routing in app/scripts/app.js
    //app.get('/partials/*', index.partials);

    app.get('/', function (req, res) {
        //res.send("WE MADE IT HERE");
        res.sendFile(__dirname + '/app/index.html');
    });

    app.route('/categories')
        .get(function (request, response) {
            response.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
        });
};


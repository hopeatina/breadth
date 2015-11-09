/**
 * Created by hnatina on 11/4/15.
 */
var mongoose = require('mongoose');
var Book = require('./app/src/users/bookModel');

/**
 * Create a Book
 */
exports.create = function(req, res) {
    var book = new Book(req.body);

    book.save(function(err) {
        if (err) return res.status(500).json(err);
        res.json(book);
    });
};

/**
 * Find todo by id and store it in the request
 */
exports.book = function(req, next) {
     next();

};

/**
 * List of books
 */
exports.query = function(req, res) {
    Book.find().sort('-createdAt').exec(function(err, book) {
        if (err) return res.status(500).json(err);
        res.json(book);
    });
};

/**
 * Show a book
 */
exports.show = function(req, res) {
    res.json(req.body);
};

/**
 * Update a Book
 */
exports.update = function(req, res) {
    Book.update({ _id: req.body._id }, req.body, { }, function(err, updatedBook) {
        if (err) return res.status(500).json(err);
        res.json(updatedBook);
    });
};

/**
 * Delete a Book
 */
exports.delete = function(req, res) {
    var bookid = req.params.booksId;
    console.log(bookid);
    Book.remove({ _id: bookid}, function(err,book) {
        if (err) {return res.status(500).json(err)}
        else {res.json(book);}

    });
};

/**
 * List of Book
 */
exports.list = function(req, res) {

};
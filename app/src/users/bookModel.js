/**
 * Created by hnatina on 11/4/15.
 */
var mongoose = require('mongoose');

    var ObjectId = mongoose.Schema.Types.ObjectId;
    var bookSchema = mongoose.Schema({
        title: String,
        author: String,
        pages: Number,
        readtime: Number,
        brfdescrip: String,
        link: String,
        image: String,
        phase: Number,
        id: ObjectId

    });

    bookSchema.methods.speak = function () {
        var greeting = this.title
            ? "Meow name is " + this.title
            : "I don't have a name";
        console.log(greeting);
    };

module.exports = mongoose.model('Book', bookSchema);

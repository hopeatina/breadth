/**
 * Created by hnatina on 11/4/15.
 */
require('node-path')(module);

var mongoose = require('mongoose'),
    voting = require('mongoose-voting'),
    Schema = mongoose.Schema,
    User = require('./userModel');


    var ObjectId = mongoose.Schema.Types.ObjectId;

    //var Vote = mongoose.Schema({
    //    author: { type: ObjectId, ref: 'Citizen', required: true }
    //    , value: { type: String, enum: [ "positive", "negative" ], required: true }
    //    , createdAt: { type: Date, default: Date.now }
    //});

    var bookSchema = mongoose.Schema({
        title: String,
        author: String,
        pages: Number,
        readtime: Number,
        brfdescrip: String,
        link: String,
        image: String,
        phase: Number,
        id: ObjectId,
        suggested: Number,
        readby: String,
        year: Number
        //votes: [ Vote ]

    });

    //bookSchema.index({ createdAt: -1 });
    //bookSchema.index({ score: -1 });
    //
    //bookSchema.post('save', function(comment) {
    //var Element = this.context.charAt(0).toUpperCase() + this.context.slice(1);
    //
    //    try {
    //        Element = this.model(Element);
    //    } catch (err) {
    //        console.log(err);
    //        return;
    //    }
    //
    //    Element.findById(this.reference, function(err, element) {
    //        if (!element.participants) return;
    //        element.participants.addToSet(comment.author);
    //        comment.replies.forEach(function(reply) {
    //            element.participants.addToSet(reply.author);
    //        });
    //
    //        if(element.isModified()) {
    //            element.save(function(err) {
    //                if(err) console.log(err);
    //            });
    //        }
    //    });
    //});
    
    

    bookSchema.methods.speak = function () {
        var greeting = this.title
            ? "Meow name is " + this.title
            : "I don't have a name";
        console.log(greeting);
    };

    ///**
    // * Get `positive` votes
    // *
    // * @return {Array} voters
    // * @api public
    // */
    //
    //bookSchema.virtual('upvotes').get(function() {
    //    return this.votes.filter(function(v) {
    //        return "positive" === v.value;
    //    });
    //});
    //
    ///**
    // * Get `negative` votes
    // *
    // * @return {Array} voters
    // * @api public
    // */
    //
    //bookSchema.virtual('downvotes').get(function() {
    //    return this.votes.filter(function(v) {
    //        return "negative" === v.value;
    //    });
    //});


    /**
     * Vote Comment with provided citizen
     * and voting value
     *
     * @param {Citizen|ObjectId|String} citizen
     * @param {String} value
     * @param {Function} cb
     * @api public
     */


    //bookSchema.methods.vote = function(citizen, value, cb) {
    //    var vote = { author: citizen, value: value };
    //    this.unvote(citizen);
    //    this.votes.push(vote);
    //    this.score = this.upvotes.length - this.downvotes.length;
    //    console.log(this.score);
    //    this.save(cb);
    //};

    /**
     * Unvote Comment from provided citizen
     *
     * @param {Citizen|ObjectId|String} citizen
     * @param {Function} cb
     * @api public
     */

    //bookSchema.methods.unvote = function(citizen, cb) {
    //    var votes = this.votes;
    //    var c = citizen.get ? citizen.get('_id') : citizen;
    //
    //    var voted = votes.filter(function(v) {
    //        var a = v.author.get ? v.author.get('_id') : v.author;
    //        return a.equals
    //            ? a.equals(c)
    //            : a === c;
    //    });
    //
    //    log('About to remove votes %j', voted);
    //    voted.length && voted.forEach(function(v) {
    //        var removed = votes.id(v.id).remove();
    //        log('Remove vote %j', removed);
    //    });
    //
    //    if (cb) this.save(cb);
    //};

    bookSchema.plugin(voting,{ ref: 'User' });

module.exports = mongoose.model('Book', bookSchema);

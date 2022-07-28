var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async')
const {body, validationResult} = require('express-validator');

// Display list of all Genre.
exports.genre_list = function(req, res) {
    Genre.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_genre) {
        if (err) return next(err);
        res.render('genre_list', {title: "Genre List", genre_list: list_genre});
    })
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res) {
    async.parallel({
        genre(callback){
            Genre.findById(req.params.id)
                .exec(callback);
        },

        genre_book(callback){
            Book.find({'genre': req.params.id})
                .exec(callback)
        },

    }, function(err, results) {
        if (err) return next(error);
        if (results.genre == null){
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err)
        }

        res.render('genre_detail', {
            title: "Genre Detail",
            genre: results.genre,
            genre_book: results.genre_book
        })
    })
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.render("genre_form", {title: "Create Genre"});
};

// Handle Genre create on POST.
exports.genre_create_post = [
    // validate and sanitize the name field
    body('name', 'Genre name required').trim().isLength({min:1}).escape(),

    // process request after validation and sanitization
    (req,res,next) => {
        // extract the errors from a request
        const errors = validationResult(req);

        // create a new genre object with escaped and trimmed data
        const genre = new Genre({name: req.body.name});

        if (!errors.isEmpty()){
            // there are errors
            res.render('genre_form', {
                title: "Create Genre",
                genre,
                errors: errors.array(),
            });
            return;
        } else{
            //data is valid
            // check if genre with same name already exists
            Genre.findOne({name : req.body.name})
            .exec(function (err, found_genre){
                if (err) return next(err);

                if (found_genre){
                    res.redirect(found_genre.url);
                } else {
                    genre.save( (err) => {
                        if (err) return next(err);
                        // genre saved successfully
                        res.redirect(genre.url);
                    })
                }
            })
        }
    }
]
// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};

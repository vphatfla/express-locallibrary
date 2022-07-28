var Author = require('../models/author');
var Book = require('../models/book')
var async = require('async');

//display list of all Authors
exports.author_list = function(req,res) {
    Author.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_authors) {
        if (err) {return next(err); }
        res.render('author_list', {title:'Author List', author_list: list_authors})
    })
}

// display detail page for specific author
exports.author_detail = function(req, res){
    async.parallel({
        author(callback){
            Author.findById(req.params.id)
            .exec(callback)
        },
        book(callback){
            Book.find({'author':req.params.id}, 'title summary')
            .exec(callback)
        }
    }, function(err, results){
        if (err) return next(err);
        if (results.author == null) {
            var err = new Error('Author not found');
            err.status = 404;
            return next(err)
        }
        console.log(results.book)
        
        res.render('author_detail',{
            title:'Author detail',
            author: results.author,
            author_books : results.book
        })
    })
}

// display author creat form on GETWSWW
exports.author_create_get = function(req,res){ 
    res.send('NOT IMPLEMENTED: Author create GET');
}

// handle author create on POST
exports.author_create_post = function(req,res){
    res.send('NOT IMPLEMENTED: Author crreate POST');
}

// Display Author delete form on GET.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};

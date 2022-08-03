var Author = require('../models/author');
var Book = require('../models/book')
var async = require('async');
const {body, validationResult} = require('express-validator');

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
    res.render('author_form', {title: 'Create Author'});
}

// handle author create on POST
// Handle Author create on POST.
exports.author_create_post = [

    // Validate and sanitize fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.'),
    body('first_name').trim().isAlpha().escape().withMessage('First name has non-alphanumeric characters.'),


    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlpha().escape().withMessage('Family name has non-alphanumeric characters.').bail(),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            var author = new Author(
                {
                    first_name: req.body.first_name,
                    family_name: req.body.family_name,
                    date_of_birth: req.body.date_of_birth,
                    date_of_death: req.body.date_of_death
                });
            author.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(author.url);
            });
        }
    }
];

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

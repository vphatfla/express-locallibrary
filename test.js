const {body, validationResult} = require('express-validator');

//body: specifies a set of fields in the request body to validate/sanitize
//checking name with error: empty name
// trim to remove all whitespaces
// check length
// escape() remove any HTML characters that might be used in JS cross-site attack

body('name', "empty name").trim().isLength({min:1}).escape();

// check age as valid date
//optional() -> specify that null and empty strings will not fail validation

body('age', "invalid age").optional({checkFalsy: true}).isISO8601().toDate();


//check if preceding validators are true
body('name').trim().isLength({min:1}).withMessage('Name empty').isAlpha().withMessage('Name must be alphabet letters')

//valiadtionResult(req): run validation, making erros available in the form of validation result object

(req,res,next) => {
    //extract the validation errors from a request
    const erros = validationResult(req);

    if(!errors.isEmpty()) {
        // error form
    }
    else {
        //data is valid
    }
}
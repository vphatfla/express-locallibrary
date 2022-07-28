var mongoose = require('mongoose');
const {DateTime} = require('luxon');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        family_name: {type: String, required: true, maxLength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

AuthorSchema
.virtual('name')
.get(function(){
   var fullname = '';
   if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' +this.first_name
   }
   if (!this.first_name || !this.family_name) {
    fullname = '';
   }
   return fullname;
});

AuthorSchema
.virtual('lifespan')
.get(function(){
    var lifetime_string = '';
    if (this.date_of_birth == "" || !this.date_of_birth) lifetime_string = "NA"
    else if (this.date_of_birth) {
        lifetime_string = this.date_of_birth.getFullYear().toString();
    } 
    
    lifetime_string += ' - ';
    if (this.date_of_death){
        lifetime_string += this.date_of_death.getFullYear().toString();
    } else if (!this.date_of_death) lifetime_string += "Present or NA"

    return lifetime_string;
});

AuthorSchema
.virtual('url')
.get(function() {
    return '/catalog/author/' +this._id;
});

AuthorSchema
.virtual('date_of_birth_formatted')
.get(function(){
    if (this.date_of_birth && this.date_of_birth !== "")
        return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    else return "NA"
})

AuthorSchema
.virtual('date_of_death_formatted')
.get(function(){
    if (this.date_of_death && this.date_of_death!== "")
        return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    else return "Present or NA"
})
module.exports = mongoose.model('Author', AuthorSchema);
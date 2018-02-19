var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


var NewsflashSchema = new Schema({
    // `title` is required and of type String
    title: {
        type: String,
        required: true,
        unique: true
    },
    // `link` is required and of type String
    link: {
        type: String,
        required: true
    },
    // 'summary' is required and of type String
    summary: {
        type: String,
        required: true

    },
// 'saved' is required and of type Boolean
    saved: {
        type: Boolean,
        default: false
    },
    // `note` is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Newsflash with an associated Note
    notes: {
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }
});
// This creates our model from the above schema, using mongoose's model method
var Newsflash = mongoose.model("Newsflash", NewsflashSchema);
// Export the Article model
module.exports = Newsflash;
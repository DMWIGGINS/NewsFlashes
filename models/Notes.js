var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
// Creating a new NotesSchema object
var NotesSchema = new Schema({
  // `title` is of type String
  title: {
    type: String
  },
  // `text` is required and of type String
  text: {
    type: String,
    required: true
  },
  // 'saved' is of type Boolean 
  saved: {
    type: Boolean,
    default: true
  },

  newsflash: {
    type: Schema.Types.ObjectId,
    ref: "Newsflash"
  }
});
// This creates our model from the above schema, using mongoose's model method
var Notes = mongoose.model("Notes", NotesSchema);
// Export the Notes model
module.exports = Notes;
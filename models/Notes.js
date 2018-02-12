var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var NotesSchema = new Schema({
  // `title` is of type String
  title: String,
  // `body` is of type String
  body: String,
  // 'saved' is of type Boolean
  saved: Boolean
});
// This creates our model from the above schema, using mongoose's model method
var Notes = mongoose.model("Notes", NoteSchema);
// Export the Notes model
module.exports = Notes;

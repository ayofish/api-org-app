var mongoose = require('mongoose');

var NotesSchema = new mongoose.Schema({
    title: String,
    text: String,
    dateCreated: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      }
});

module.exports = mongoose.model('Notes', NotesSchema);

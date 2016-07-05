var Notes = require('./notes.model');

// Get list of notes
exports.index = function(req, res) {
  Notes.find().sort({dateCreated: -1}).exec(function (err, notes) {
    console.log(notes);
    if(err) { return handleError(res, err); }
    // return res.json(200, notes);
    return res.status(200).json(notes);
  });
  // res.json(200, [{c:1}, {c:2}]);
};

// Get a single note
exports.show = function(req, res) {
  Notes.findById(req.params.id, function (err, note) {
    if(err) { return handleError(res, err); }
    if(!note) { return res.send(404); }
    return res.json(note);
  });
};

// Creates a new note in the DB.
exports.create = function(req, res) {
  Notes.create(req.body, function(err, note) {
    if(err) { return handleError(res, err); }
    return res.json(201, note);
  });
};

// Updates an existing note in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Notes.findById(req.params.id, function (err, note) {
    if (err) { return handleError(res, err); }
    if(!note) { return res.send(404); }
    var updated = _.merge(note, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, note);
    });
  });
};

// Deletes a note from the DB.
exports.destroy = function(req, res) {
  Notes.findById(req.params.id, function (err, note) {
    if(err) { return handleError(res, err); }
    if(!note) { return res.send(404); }
    note.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
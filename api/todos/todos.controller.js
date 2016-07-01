// var Mood = require('./mood.model');

// Get list of moods
exports.index = function(req, res) {
  // Mood.find(function (err, moods) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, moods);
  // });
  res.json(200, [{a:1}, {a:2}]);
};

// Get a single mood
exports.show = function(req, res) {
  Mood.findById(req.params.id, function (err, mood) {
    if(err) { return handleError(res, err); }
    if(!mood) { return res.send(404); }
    return res.json(mood);
  });
};

// Creates a new mood in the DB.
exports.create = function(req, res) {
  Mood.create(req.body, function(err, mood) {
    if(err) { return handleError(res, err); }
    return res.json(201, mood);
  });
};

// Updates an existing mood in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Mood.findById(req.params.id, function (err, mood) {
    if (err) { return handleError(res, err); }
    if(!mood) { return res.send(404); }
    var updated = _.merge(mood, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mood);
    });
  });
};

// Deletes a mood from the DB.
exports.destroy = function(req, res) {
  Mood.findById(req.params.id, function (err, mood) {
    if(err) { return handleError(res, err); }
    if(!mood) { return res.send(404); }
    mood.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
var Todos = require('./todo.model');
var _ = require("lodash");

// Get list of todos
exports.index = function(req, res) {
  Todos.find().sort({dateCreated: -1}).exec(function (err, todos) {
    console.log(todos);
    if(err) { return handleError(res, err); }
    return res.status(200).json(todos);
  });
};

// Get a single todo
exports.show = function(req, res) {
  Todos.findById(req.params.id, function (err, todo) {
    if(err) { return handleError(res, err); }
    if(!todo) { return res.send(404); }
    return res.json(todo);
  });
};

// Creates a new todo in the DB.
exports.create = function(req, res) {
  Todos.create(req.body, function(err, todo) {
    if(err) { return handleError(res, err); }
    return res.json(201, todo);
  });
};

// Updates an existing todo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Todos.findById(req.params.id, function (err, todo) {
    if (err) { return handleError(res, err); }
    if(!todo) { return res.send(404); }
    var updated = _.merge(todo, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, todo);
    });
  });
};

// Deletes a todo from the DB.
exports.destroy = function(req, res) {
  Todos.findById(req.params.id, function (err, todo) {
    if(err) { return handleError(res, err); }
    if(!todo) { return res.send(404); }
    todo.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
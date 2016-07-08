(function() {
    'use strict';

    /**
     * The constructor of the Todos Controller
     * @param {[type]} $scope       [description]
     * @param {[type]} TodosService [description]
     */
    var TodosCtrl = function($scope, TodosService) {
        this.todoText = "";
        this.todosService = TodosService;
        this.$scope = $scope;
        this.todos = [];
        this.showTodos = false;
        this.todosLeft = 0;
        this.todosDone = 0;
        this.fetchTodos();
        return this;
    };

    /**
     * the methods of the NoteController
     * @type {Object}
     */
    TodosCtrl.prototype = {
        //filters for the list display
        isNotDoneFilter: function(todo) {
            return todo.done !== true;
        },
        isDoneFilter: function(todo) {
            return todo.done === true;
        },
        //fetch the todos from the webservice
        fetchTodos: function() {
            var self = this;
            this.todosService.get().then(function(res) {
                self.setTodos(res.data);
            });
        },
        //set the todos into the scope
        setTodos: function(todos) {
            this.todos = todos;
            this.setShowTodos();
        },
        //set the count of todos that are not yet done
        setTodosLeft: function(){
            this.todosLeft = this.todos.filter(this.isNotDoneFilter).length;
        },
        //set the count of the done todos
        setTodosDone: function(){
            this.todosDone = this.todos.filter(this.isDoneFilter).length;
        },
        //mark all todos as done
        setMarkAllDone: function(){
            for(var i=0;i<this.todos.length;i++){
                var todo = this.todos[i];
                todo.done = true;
                this.doSaveTodo(todo);
            }
        },
        //check if we need to show the todos
        setShowTodos: function() {
            if (this.todos.length > 0) {
                this.showTodos = true;
            } else {
                this.showTodos = false;
            }
            this.setTodosDone();
            this.setTodosLeft();
        },
        //set the done attribute on a todo
        setDoneTodo: function(todo) {
            this.doSaveTodo(todo);
        },

        //flag a todo for editing
        setEditTodo: function(todo) {
            todo.tempText = todo.text;
            todo.editing = true;
        },

        //cancel editing
        doCancelSave: function(todo) {
            if (todo && todo.editing) {
                delete todo.editing;
            }
            if(todo && todo.tempText){
                delete todo.tempText;
            }
        },

        doSaveTodo: function(todo) {
            if(todo.tempText){
                todo.text = todo.tempText;
            }
            var self = this;
            this.todosService.update(todo._id, {
                done: todo.done,
                text: todo.text
            }).then(function(res) {
                //get the todo data
                var queryRes = _.where(self.todos, { _id: res.data._id });
                var todo = _.first(queryRes);
                //merge it with the updated data
                _.merge(todo, res.data);
                self.doCancelSave(todo);
                self.setShowTodos();
            });
        },

        /**
         * handles the saving of a new todo
         * @return {void}
         */
        addToDo: function() {
            var self = this;
            //new note
            this.todosService.create({
                text: this.todoText
            }).then(function(res) {
                //put at the top of the array
                self.todos.splice(0, 0, res.data);
                self.setShowTodos();
                self.todoText = "";
            });
        },

        removeToDo: function(todo) {
            var self = this;
            if (todo._id) {
                this.todosService.remove(todo._id).then(function(res) {
                    _.remove(self.todos, { _id: todo._id });
                    self.setShowTodos();
                });
            }
        },
    };


    /**
     * @ngdoc function
     * @name lottoApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the lottoApp
     */
    angular.module('yoyotest')
        .controller('TodosCtrl', ['$scope', 'TodosService', TodosCtrl]);

})();

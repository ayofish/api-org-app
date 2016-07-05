(function() {
    'use strict';

    /**
     * The constructor of the NotesController
     * @param {[type]} $scope       [description]
     * @param {[type]} NotesService [description]
     */
    var NotesCtrl = function($scope, NotesService) {
        this.text = "";
        this.title = "";
        this.noteid = null;
        this.notesService = NotesService;
        this.$scope = $scope;
        this.notes = [];
        this.fetchNotes();
        return this;
    };

    /**
     * the methods of the NoteController
     * @type {Object}
     */
    NotesCtrl.prototype = {
        fetchNotes: function() {
            var self = this;
            this.notesService.get().then(function(res) {
                self.setNotes(res.data);
            });
        },

        setNotes: function(notes) {
            this.notes = notes;
        },
        /**
         * handles the saving of a new note
         * @return {void}
         */
        doSave: function() {
            var self = this;
            if (this.noteid !== null) {
                //update
                this.notesService.update({
                    id: this.noteid,
                    title: this.title,
                    text: this.text
                }).then(function() {
                    self.fetchNotes();
                });
            } else {
                //new note
                this.notesService.create({
                    title: this.title,
                    text: this.text
                }).then(function() {
                    self.fetchNotes();
                });
            }
        },
        /**
         * clear the current form
         * @return {void}
         */
        doCancel: function() {
            this.text = "";
            this.title = "";
            this.noteid = null;
        },
        removeNote: function(note) {
            var self = this;
            this.notesService.remove(note._id).then(function() {
                self.fetchNotes();
            });
        }
    };


    /**
     * @ngdoc function
     * @name lottoApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the lottoApp
     */
    angular.module('yoyotest')
        .controller('NotesCtrl', ['$scope', 'NotesService', NotesCtrl]);
})();

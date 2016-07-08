(function() {
    'use strict';

    /**
     * The constructor of the NotesController
     * @param {[type]} $scope       [description]
     * @param {[type]} NotesService [description]
     */
    var NotesCtrl = function($scope, NotesService, $uibModal, $uibModalInstance) {
        this.text = "";
        this.title = "";
        this.noteid = null;
        this.noteToEditText = "";
        this.noteToEditTitle = "";
        this.noteToEditNoteid = null;
        this.notesService = NotesService;
        this.$scope = $scope;
        this.notes = [];
        this.$uibModal = $uibModal;
        this.$uibModalInstance = $uibModalInstance;
        this.showNotes = false;
        this.noteToDelete = null;
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
            if (this.notes.length > 0) {
                this.showNotes = true;
            } else {
                this.showNotes = false;
            }
        },
        /**
         * handles the saving of a new note
         * @return {void}
         */
        doSave: function() {
            var self = this;
            //new note
            this.notesService.create({
                title: this.title,
                text: this.text
            }).then(function(res) {
                //put at the top of the array
                self.notes.splice(0, 0, res.data);
            });
            this.resetNoteData();
        },
        /**
         * clear the current form
         * @return {void}
         */
        doCancel: function() {
            this.resetNoteData();
        },

        //resets the note data
        resetNoteData: function() {
            this.text = "";
            this.title = "";
            this.noteid = null;
            this.noteToDelete = null;
        },

        //resets the edit note data
        resetEditNoteData: function() {
            this.noteToEditText = "";
            this.noteToEditTitle = "";
            this.noteToEditNoteid = null;
        },

        //opens modals
        //delete modal open
        removeNote: function(note) {
            this.noteToDelete = note;
            $('#confirm-delete').modal({ backdrop: 'static', keyboard: false });
        },
        //edit note modal open
        editNote: function(note) {
            this.noteToEditText = note.text;
            this.noteToEditTitle = note.title;
            this.noteToEditNoteid = note._id;
            $("#edit-note").modal({ backdrop: 'static', keyboard: false });
        },
        //modal actions
        doSaveEditNote: function() {
            if (this.noteToEditNoteid !== null) {
                var self = this;
                this.notesService.update(this.noteToEditNoteid, {
                    title: this.noteToEditTitle,
                    text: this.noteToEditText
                }).then(function(res) {
                    //get the note data
                    var queryRes = _.where(self.notes, { _id: res.data._id });
                    var note = _.first(queryRes);
                    //merge it with the updated data
                    _.merge(note, res.data);
                });
            }
            //reset the attributes of the class
            this.resetEditNoteData();
            //hide modal
            $("#edit-note").modal("hide");
        },
        doCancelEditNote: function() {
            this.resetEditNoteData();
            $("#edit-note").modal("hide");
        },
        confirmDelete: function() {
            var self = this;
            if (this.noteToDelete !== null) {
                this.notesService.remove(this.noteToDelete._id).then(function(res) {
                    _.remove(self.notes, {_id: self.noteToDelete._id});
                    self.noteToDelete = null;
                    $('#confirm-delete').modal('hide');
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
        .controller('NotesCtrl', ['$scope', 'NotesService', NotesCtrl]);

})();

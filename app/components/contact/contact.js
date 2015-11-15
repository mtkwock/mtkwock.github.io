(function(){
    'use strict';

    var app = angular.module('magecap');
    app.controller('ContactController', ContactController);

    ContactController.$inject = ['$scope'];
    function ContactController($scope){
        var vm = this;
        angular.extend(vm, {
        })
    };
})();

function sendEmail(){
    console.log("Email Sent (Not implemented yet)");
}

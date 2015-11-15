(function(){
    'use strict';

    angular.module('magecap').directive('blogEntry', blogEntry);

    function blogEntry(){
        console.log(this);
        return {
            restrict: "E", // E: Element Attribute
            replace: true, // Replaces respective element
            //template: '<b>Hello</b>',
            scope: {},
            templateUrl: '../home/entry.html',
            controller: BlogEntryController,
            controllerAs: 'vm' // Can bind functions to controller, like scope
        };
    }

    BlogEntryController.$inject = ['$state'];
    function BlogEntryController($state){

    }
})();

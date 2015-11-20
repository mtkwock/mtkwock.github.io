(function(){
    'use strict';

    angular.module('magecap').directive('footer', footer);

    function footer(){
        return {
            restrict: "E", // E: Element Attribute
            replace: true, // Replaces respective element
            scope: {},
            templateUrl: '../footer/footer.html',
            controller: FooterController,
            controllerAs: 'vm' // Can bind functions to controller, like scope
        };
    }

    FooterController.$inject = ['$state'];
    function FooterController($state){
        var vm = this;

        angular.extend(vm, {
        });

    }
})();

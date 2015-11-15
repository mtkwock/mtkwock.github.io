(function(){
    'use strict';

    angular.module('magecap').directive('navBar', navBar);

    function navBar(){
        return {
            restrict: "EA", // E: Element Attribute
            replace: true, // Replaces respective element
            templateUrl: 'navbar.html',
            controller: NavBarController,
            controllerAs: 'vm' // Can bind functions to controller, like scope
        }
    }

    function NavBarController(){
        var vm = this;

        angular.extend(vm, {
            f1: f1,
            f2, f2
        });

        function f1(){

        }

        function f2(){

        }
    }
})();

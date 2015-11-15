(function(){
    'use strict';

    angular.module('magecap').directive('navBar', navBar);

    function navBar(){
        return {
            restrict: "EA", // E: Element Attribute
            replace: true, // Replaces respective element
            //template: '<b>Hello</b>',
            scope: {},
            templateUrl: '../navbar/navbar.html',
            controller: NavBarController,
            controllerAs: 'vm' // Can bind functions to controller, like scope
        };
    }

    NavBarController.$inject = ['$state'];
    function NavBarController($state){
        var vm = this;
        var tabs = [
            { name: 'Gallery',      path: "gallery"},
            { name: 'For Sale',     path: "products"},
            { name: 'About',        path: "about"},
            { name: 'Contact',      path: "contact"}
        ];

        angular.extend(vm, {
            tabs: tabs,
            currentTab: "Home",
            changeTab: changeTab
        });

        function changeTab(tab){
            vm.currentTab = tab.name;
            $state.go(tab.path);
        }

    }
})();

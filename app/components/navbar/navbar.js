(function(){
    'use strict';

    angular.module('magecap').directive('navBar', navBar);

    function navBar(){
        return {
            restrict: "E", // E: Element Attribute
            replace: true, // Replaces respective element
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
            { name: 'For Sale',     path: "shop"},
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

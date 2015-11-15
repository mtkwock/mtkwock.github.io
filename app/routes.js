(function(){
    'use strict'

    var app = angular.module('magecap');

    app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");

        var states = [
            {
                name: "home",
                url: "/home",
                //template: "<div>Home</div>",
                templateUrl: "../home/home.html",
                controller: "HomeController",
                controllerAs: "vm"
            },
            {
                name: "gallery",
                url: "/gallery",
                templateUrl: "../gallery/gallery.html",
                controller: "GalleryController",
                directive: "gallery",
                controllerAs: "vm"
            },
            {
                name: "products",
                url: "/products",
                template: "<div>For Sale!</div>"
            },
            {
                name: "about",
                url: "/about",
                templateUrl: "../about/about.html",
                controller: "AboutController",
                controllerAs: "vm"
            },
            {
                name: "commissions",
                url: "/commissions",
                template: "<div>Commissions</div>"
            },
            {
                name: "contact",
                url: "/contact",
                template: "<div>Contact Me</div>"
            }
        ];

        states.forEach(function(state){
            $stateProvider.state(state.name, state);
        })
    })
})();

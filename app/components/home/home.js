(function(){
    'use strict';

    var app = angular.module('magecap');

    app.controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];
    function HomeController($scope){
        var vm = this;
        $scope.focus = focus;
        angular.extend(vm, {
            entries: _.memoize(formatted),
            focus: focus
        })
    };

    function loadJSON(filename, callback) {
       var xobj = new XMLHttpRequest();
           xobj.overrideMimeType("application/json");
       xobj.open('GET', "../../../" + filename, true); // Replace 'my_data' with the path to your file
       xobj.onreadystatechange = function () {
             if (xobj.readyState == 4 && xobj.status == "200") {
               // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
               callback(xobj.responseText);
             }
       };
       xobj.send(null);
    }

    var blogEntries = [];

    loadJSON("services/blog.json", function(responseText){
        var thing = JSON.parse(responseText);
        blogEntries = thing;
    })

    function formatted(){
        return blogEntries.map(function(entry){
            return {
                id: entry.title.hashCode(),
                href: "#" + entry.title.hashCode(),
                title: entry.title,
                body: entry.body
            };
        });
    }

    function focus(id){
        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 500);
    }

})();

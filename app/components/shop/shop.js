(function(){
    'use strict';

    var app = angular.module('magecap');

    app.controller('ShopController', ShopController);

    ShopController.$inject = ['$scope', '$window'];
    function ShopController($scope, $window){
        var vm = this;
        // $scope.focus = focus;
        angular.extend(vm, {
            listings: _.memoize(function(){
                return shopListings;
            }),
            setFocus: setFocus,
            focusedListing: function(){
                return focused;
            }
            // entries: _.memoize(formatted)
        });
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

    var shopListings = [];
    var focused = {};

    loadJSON("services/listings.json", function(responseText){
        shopListings = JSON.parse(responseText);
        focused = shopListings[0];
    });

    function setFocus(listing){
        focused = listing;
    }

})();

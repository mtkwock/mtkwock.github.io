(function(){
    'use strict';

    var app = angular.module('magecap');

    app.controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$scope', '$window'];
    function GalleryController($scope, $window){
        var vm = this;
        $scope.focus = focus;
        angular.extend(vm, {
            entries: _.memoize(formatted)
        });

        // Deal with window resizes so that the pictures scale to screen
        var w = angular.element($window);
        w.bind('resize', function(){
            vm.entries = _.memoize(formatted);
            $scope.$apply();
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

    var unparsed = "";
    var galleryEntries = [];

    loadJSON("services/gallery.json", function(responseText){
        unparsed = responseText;
    })

    function formatted(){
        var galEntries = []
        var width = $("#gallery-area").width() * 0.99; // Needs to be recalculated later
        var buffer = 6; // Min distance between images
        var perRow = 3;
        var line = JSON.parse(unparsed);
        while(line.length){
            var row = [];
            var actual = width + buffer;
            var aspects = []

            for(var i = 0; i < perRow; i++){
                if(line.length){
                    row.push(line.shift())
                    actual -= buffer;
                    aspects.push(row[i].width / row[i].height);
                }
            }

            var aspTotal = aspects.reduce(function(a, b){ return a + b; });
            var height = actual / aspTotal;

            row.forEach(function (img, idx){
                img.width = aspects[idx] * height;// widths[idx];
                img.height = height;
            });
            galEntries.push(row);
        }
        return galEntries;
    }

})();

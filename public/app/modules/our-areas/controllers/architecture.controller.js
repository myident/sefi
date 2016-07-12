/*global angular*/
(function () {
    var controller = function ($scope, $vash) {
        
        var offsetStart = [
            {
                "x": 500,
                "y": 300
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            }
        ];
        var offsetEnd = [
            {
                "x": 230,
                "y": 80
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            }
        ];
        
        var margin = {
            height: 10,
            width: 10
        };
        
        var lineToConexion = $vash.getLineToConexion(offsetStart, offsetEnd, margin);
        
        console.log(lineToConexion);
    };
    controller.$inject = ['$scope', '$vash'];
    angular
        .module('mArchitecture').controller('ArchController', controller);
})();
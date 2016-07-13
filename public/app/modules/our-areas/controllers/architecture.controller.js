/*global angular*/
(function () {
    var controller = function ($scope, $rootScope, $vash, $glass) {
        
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
        
        $scope.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        console.log($scope.vh);
        console.log(lineToConexion);
        
        $scope.areas = [1,2,3,4,5,6];
        
        $glass.get(function(data){
            console.log(data);
        });
    };
    controller.$inject = ['$scope', '$rootScope', '$vash', '$glass'];
    angular
        .module('mArchitecture').controller('ArchController', controller);
})();
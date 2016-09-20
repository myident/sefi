/* global angular */

(function () {
    var Directive = function ($window, $abcUpdate) {
        var Link = function ($scope) {
        
            // Cerrar una tarjeta
            $scope.closeOne = function(index) {
                $scope.source[index].flipped = !$scope.source[index].flipped;
            };
            
            $scope.diagram = function(){
                $window.location = '#/abc-diagrama';
            };
            
            $scope.consultEdit = function(){
                $window.location = '#/abc-consulta';
            };
            
            $scope.createContents = function(){
                $abcUpdate.update = false;
                $window.location = '#/abc-create';
            };
            
            // Voltear una tarjeta
            $scope.flipOne = function (index) {
                for (var i in $scope.source) {
                    $scope.source[i].flipped = false;
                }
                $scope.source[index].flipped = !$scope.source[index].flipped;
                $scope.get(index);
            };

        };
        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/modules/abc-flipcard/abc-flipcard.template.html',
            link: Link,
            scope: {
                source: '=set',
                get: '='
            }
        };
    };
    angular
        .module('abcFlipcard', [])
        .directive('abcFlipcard', Directive);
})();
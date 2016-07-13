/* global angular */

(function () {
    var Directive = function () {
        var Link = function ($scope, $elem) {
            $scope.height = $elem[0].offsetHeight;
            console.log($scope.height);
        };
        return {
            restrict: 'A',
            link: Link
        };
    };
    angular
        .module('mGetdimensions', [])
        .directive('ngGetdimensions', Directive);
})();
/*global angular*/

(function () {
    var Controller = function($scope) {
        $scope.open = false;
        $scope.toggleOpen = function() {
            $scope.open = !$scope.open;
        };
    };
    Controller.$inject = ['$scope'];
    angular.module('mAreas').controller('ArqContenidosController', Controller);
})();
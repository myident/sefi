/*global angular*/

(function () {
    var Controller = function($scope) {
        $scope.go = function() {
            window.location = '#/areas/arquitectura/gobierno';  
        };
    };
    Controller.$inject = ['$scope'];
    angular.module('mAreas').controller('ArqAreasController', Controller);
})();
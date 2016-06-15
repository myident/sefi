/*global angular*/

(function () {
    var Controller = function($scope) {
        $scope.go = function() {
            window.location = '#/areas/arquitectura/areas';  
        };
    };
    Controller.$inject = ['$scope'];
    angular.module('mAreas').controller('GobiernoController', Controller);
})();
/*global angular*/

(function () {
    var Controller = function($scope) {
        $scope.go = function() {
            window.location = '#/areas/arquitectura/';  
        };
    };
    angular.module('mAreas').controller('TrayectoriaController', Controller);
})();
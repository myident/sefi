/*global angular*/

(function () {
    var Controller = function($scope) {
        $scope.go = function() {
            window.location = '#/areas/arquitectura/trayectoria';  
        };
    };
    angular.module('mAreas').controller('ArquitecturaController', Controller);
})();
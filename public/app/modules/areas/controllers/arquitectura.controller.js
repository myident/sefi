/*global angular*/

(function () {
    var Controller = function($scope) {
        $scope.go = function() {
            window.location = '#/areas/arquitectura/trayectoria';  
        };

        $scope.parrafo = "Enterprise architecture framework is the enabler to optimize the legacy of processes to an integrated environment, respond to business changes, support delivery of business strategy and get the right balance between IT efficiency and business innovation. \\n This framework shows a clear view on how design meets the criteria defined in each one of the projects, ensuring business partners, architects and operations support use standard terminology for IT solutions";
    };
    angular.module('mAreas').controller('ArquitecturaController', Controller);
})();
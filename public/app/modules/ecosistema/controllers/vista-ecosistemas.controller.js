/*global angular*/
(function () {
    var Controller = function($scope, $location) {
        $scope.goProcesos = function() {
            $location.path('/procesos');
        };
    };
    
    Controller.$inject = ['$scope', '$location'];
    
    angular
        .module('mEcosistema').controller('VistaEcosistemasController', Controller);
})();
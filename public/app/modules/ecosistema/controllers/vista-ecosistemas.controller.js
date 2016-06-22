/*global angular*/
(function () {
    var Controller = function($rootScope, $scope, $location) {
        $scope.goProcesos = function() {
            $location.path('/procesos');
        };
        
        $scope.dominios = $rootScope.source.arquitectura[0].dominios;

        console.log($scope.dominios);
    };
    
    Controller.$inject = ['$rootScope','$scope', '$location'];
    
    angular
        .module('mEcosistema').controller('VistaEcosistemasController', Controller);
})();
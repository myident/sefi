/*global angular*/
(function () {
    var Controller = function($rootScope, $scope, $location) {
        $scope.goProcesos = function() {
            $location.path('/procesos');
        };
        
        $scope.dominios = $rootScope.source.arquitectura[0].dominios;

        $scope.link = function(i1,i2,i3,i4){
        	window.location = '#/procesos/'+i1+'/detalle/'+i2+'/mega/'+i3+'/macro/'+i4;
        };
    };
    
    Controller.$inject = ['$rootScope','$scope', '$location'];
    
    angular
        .module('mEcosistema').controller('VistaEcosistemasController', Controller);
})();
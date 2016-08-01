/*global angular*/

(function () {
    var Controller = function ($scope, $rootScope, $window, $arquitecturas, $megaprocesos, $macroprocesos, $procesos) {

        $rootScope.spin = false;

        $scope.arquitecturas = {};
        $scope.arquitectura = {};
        $scope.dominios = [];
        $scope.megaprocesos = [];
        $scope.macroprocesos = [];
        $scope.procesos = [];

        $scope.arquitecturaElegida = 0;
        $scope.dominioElegido = 0;

        // webservice dominios
        $scope.arquitecturas = $arquitecturas.get(function (data) {
            $scope.arquitectura = data.arquitectura[$scope.arquitecturaElegida];
            if (data.arquitectura[$scope.arquitecturaElegida].dominios.length) {
                // Fill Dominios
                $scope.dominios = data.arquitectura[$scope.arquitecturaElegida].dominios;
                $scope.dominios[$scope.dominioElegido].open = true;
                // Fill megaprocesos
                $scope.megaprocesos = $megaprocesos.query({
                    iddominio: $scope.dominios[$scope.dominioElegido].id
                }, function(){
                    
                }, function(e){
                   console.log(e); 
                });
            }
        }, function (e) {
            console.log(e);
        });

        // webservice dominios //*** se activa desde la directiva
        $scope.dominioIndex = function (value) {
            $scope.megaprocesos = $megaprocesos.query({
                iddominio: value
            }, function(){
                
            }, function(e){
                console.log(e);
            });
        };

        // webservice macroprocesos //*** se activa desde la directiva
        $scope.megaprocesoIndex = function (value, index) {
            $scope.macroprocesos = $macroprocesos.query({
                idmegaproceso: value
            }, function (data) {
                $scope.megaprocesos[index].macroprocesos = data;
            }, function (e) {
                console.log(e);
            });
        };

        // webservice procesos //*** se activa desde la directiva
        $scope.macroprocesoIndex = function (value) {
            $procesos.get({
                idmacroproceso: value
            }, function (data) {
                $scope.procesos = data.procesos;
            }, function (e) {
                console.log(e);
            });
        };

        $scope.regresar = function () {
            $window.history.back();
        };
    };

    Controller.$inject = ['$scope', '$rootScope', '$window', '$arquitecturas', '$megaprocesos', '$macroprocesos', '$procesos'];

    angular
        .module('mDiagrama').controller('DiagramaController', Controller);
})();
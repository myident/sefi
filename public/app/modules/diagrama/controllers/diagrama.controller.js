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

        var $indexArquitectura = 0;
        var $indexDominio = 0;

        // webservice dominios //*** se activa desde el INICIO
        $scope.arquitecturas = $arquitecturas.get(function (data) {
            $rootScope.spin = true;
            // Set arquitectura
            $scope.arquitectura = data.arquitectura[$indexArquitectura];
            if (data.arquitectura[$indexArquitectura].dominios.length) {
                // Fill Dominios
                $scope.dominios = data.arquitectura[$indexArquitectura].dominios;
                $scope.dominios[$indexDominio].open = true;
                // Fill megaprocesos
                $scope.megaprocesos = $megaprocesos.query({
                    iddominio: $scope.dominios[$indexDominio].id
                }, function(){
                    $rootScope.spin = false;
                }, function(e){
                    $rootScope.spin = false;
                   console.log(e); 
                });
            }
        }, function (e) {
            $rootScope.spin = false;
            console.log(e);
        });

        // webservice dominios //*** se activa desde DG-INDICE
        $scope.dominioIndex = function (value) {
            $rootScope.spin = true;
            $scope.megaprocesos = $megaprocesos.query({
                iddominio: value
            }, function(){
                $rootScope.spin = false;
            }, function(e){
                $rootScope.spin = false;
                console.log(e);
            });
        };

        // webservice macroprocesos //*** se activa desde DG-INDICE
        $scope.megaprocesoIndex = function (value, index) {
            $rootScope.spin = true;
            $scope.macroprocesos = $macroprocesos.query({
                idmegaproceso: value
            }, function (data) {
                $rootScope.spin = false;
                $scope.megaprocesos[index].macroprocesos = data;
            }, function (e) {
                $rootScope.spin = false;
                console.log(e);
            });
        };

        // webservice procesos //*** se activa desde DG-INDICE
        $scope.macroprocesoIndex = function (value) {
            $rootScope.spin = true;
            $procesos.get({
                idmacroproceso: value
            }, function (data) {
                $rootScope.spin = false;
                $scope.procesos = data.procesos;
            }, function (e) {
                $rootScope.spin = false;
                console.log(e);
            });
        };

        $scope.regresar = function () {
            $window.history.back();
        };

        $scope.source = {
            "processes":[
                    {
                        "name":"processes - fracaso total",
                        "capabilities":[
                            {
                                "name":"capabilities - fracaso total",
                                "sortAreas":[
                                    {
                                        "areas":[
                                            {"name":"Areas - fracaso total"}
                                        ],
                                        "Applications":[
                                            {"name":"Applications - fracaso total"}
                                        ],
                                        "kpis":[
                                            {"name":"kpis - fracaso total"}
                                        ]
                                    }
                                ],
                            }
                        ]
                    },
                ],
            "kpis":[
                    {"name":"kpi - fracaso total"}
                ]
            };

        };

    Controller.$inject = ['$scope', '$rootScope', '$window', '$arquitecturas', '$megaprocesos', '$macroprocesos', '$procesos'];

    angular
        .module('mDiagrama').controller('DiagramaController', Controller);
})();
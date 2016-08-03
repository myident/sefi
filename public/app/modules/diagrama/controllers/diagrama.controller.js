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

        $scope.historial = [];

        var $indexArquitectura = 0;
        var $indexDominio = 0;
        var $indexMegaproceso = 0;

        // webservice dominios //*** se activa desde el INICIO
        $scope.arquitecturas = $arquitecturas.get(function (data) {
            $rootScope.spin = true;
            // Set arquitectura
            $scope.arquitectura = data.arquitectura[$indexArquitectura];
            if (data.arquitectura[$indexArquitectura].dominios.length) {
                // Update Dominios
                $scope.dominios = data.arquitectura[$indexArquitectura].dominios;
                $scope.dominios[$indexDominio].open = true;
                // Update Historial
                $scope.updateHistorial(
                    $scope.arquitectura.name, 
                    $scope.dominios[$indexDominio].title);
                // Update megaprocesos
                $scope.megaprocesos = $megaprocesos.query({
                    iddominio: $scope.dominios[$indexDominio].id
                }, function () {
                    $rootScope.spin = false;
                }, function (e) {
                    $rootScope.spin = false;
                    console.log(e);
                });
            }
        }, function (e) {
            $rootScope.spin = false;
            console.log(e);
        });

        // webservice dominios //*** se activa desde DG-INDICE
        $scope.dominioIndex = function (value, index) {
            $rootScope.spin = true;
            $scope.megaprocesos = $megaprocesos.query({
                iddominio: value
            }, function () {
                // Update Historial
                $scope.updateHistorial(
                    $scope.arquitectura.name, 
                    $scope.dominios[index].title);
                // Update indexDominio
                $indexDominio = index;
                // Close spin
                $rootScope.spin = false;
            }, function (e) {
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
                // Update Historial
                $scope.updateHistorial(
                    $scope.arquitectura.name,
                    $scope.dominios[$indexDominio].title,
                    $scope.megaprocesos[index].title);
                // Update indexMegaproceso
                $indexMegaproceso = index;
                // Update Macroprocesos
                $scope.megaprocesos[index].macroprocesos = data;
                // Close spin
                $rootScope.spin = false;
            }, function (e) {
                console.log(e);
                $rootScope.spin = false;
            });
        };

        // webservice procesos //*** se activa desde DG-INDICE
        $scope.macroprocesoIndex = function (value, index) {
            $rootScope.spin = true;
            $procesos.get({
                idmacroproceso: value
            }, function (data) {
                // Update Historial
                $scope.updateHistorial(
                    $scope.arquitectura.name, 
                    $scope.dominios[$indexDominio].title, 
                    $scope.megaprocesos[$indexMegaproceso].title, 
                    $scope.macroprocesos[index].title);
                // Update Procesos
                $scope.procesos = data.procesos;
                // Close spin
                $rootScope.spin = false;
            }, function (e) {
                $rootScope.spin = false;
                console.log(e);
            });
        };

        // update historial function
        $scope.updateHistorial = function (arquitectura, dominio, megaproceso, macroproceso) {
            if (arquitectura && dominio && megaproceso && macroproceso) {
                $scope.historial = [arquitectura, dominio, megaproceso, macroproceso];
            } else if (arquitectura && dominio && megaproceso) {
                $scope.historial = [arquitectura, dominio, megaproceso];
            } else if (arquitectura && dominio) {
                $scope.historial = [arquitectura, dominio];
            } else if (arquitectura) {
                $scope.historial = [arquitectura];
            } else {
                $scope.historial = [];
            }
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
                                "sortAreas": {
                                        "areas":[
                                            {"name":"Areas - fracaso total"}
                                        ],
                                        "applications":[
                                            {"name":"Applications - fracaso total"}
                                        ],
                                        "kpis":[
                                            {"name":"kpis - fracaso total"}
                                        ]
                                    }
                                }
                            ]
                        }
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
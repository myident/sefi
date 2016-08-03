/*global angular*/

(function () {
    var Controller = function ($scope, $rootScope, $window, $indice, $historial, $barraHerramientas) {

        $rootScope.spin = false;

        // indice
        $scope.arquitecturas = {};
        $scope.arquitectura = {};
        $scope.dominios = [];
        $scope.megaprocesos = [];
        $scope.macroprocesos = [];
        $scope.procesos = [];

        // historial
        $scope.historial = [];
        
        // barra herramientas
        $scope.view = $barraHerramientas.view;
        $scope.organize = $barraHerramientas.organize;
        $scope.show = $barraHerramientas.show;

        // $indexes
        var $indexArquitectura = 0;
        var $indexDominio = 0;
        var $indexMegaproceso = 0;

        // init arquitecturas, dominios, megaprocesos
        $scope.arquitecturas = $indice.arquitecturas(function(data){
            $scope.arquitectura = data.arquitectura[$indexArquitectura];
            if (data.arquitectura[$indexArquitectura].dominios.length) {
                // Update Dominios
                $scope.dominios = data.arquitectura[$indexArquitectura].dominios;
                $scope.dominios[$indexDominio].open = true;
                // Update Historial
                $scope.historial = $historial.update(
                    $scope.arquitectura.name,
                    $scope.dominios[$indexDominio].title);
                // Update megaprocesos
                $scope.megaprocesos = $indice.megaprocesos($scope.dominios[$indexDominio].id, function(){});
            }
        });

        //MARK: - getters indice
        $scope.getMegaprocesos = function (value, index) {
            $scope.megaprocesos = $indice.megaprocesos(value, function () {
                // Update Historial
                $scope.historial = $historial.update(
                    $scope.arquitectura.name,
                    $scope.dominios[index].title);
                // Update indexDominio
                $indexDominio = index;
            });
        };

        $scope.getMacroprocesos = function (value, index) {
            $scope.macroprocesos = $indice.macroprocesos(value, index, function (data) {
                // Update Historial
                $scope.historial = $historial.update(
                    $scope.arquitectura.name,
                    $scope.dominios[$indexDominio].title,
                    $scope.megaprocesos[index].title);
                // Update indexMegaproceso
                $indexMegaproceso = index;
                // Update Macroprocesos
                $scope.megaprocesos[index].macroprocesos = data;
            });
        };
        
        $scope.getProcesos = function (value, index) {
            $indice.procesos(value, index, function (data) {
                // Update Historial
                $scope.historial = $historial.update(
                    $scope.arquitectura.name,
                    $scope.dominios[$indexDominio].title,
                    $scope.megaprocesos[$indexMegaproceso].title,
                    $scope.macroprocesos[index].title);
                // Update Procesos
                $scope.procesos = data.procesos;
            });
        };
        

        //MARK: - getters Barra de Herramientas
        $scope.getView = function (value) {
            // Update view
            $barraHerramientas.view = value;
        };

        $scope.getOrganize = function (value) {
            // Update organize
            $barraHerramientas.organize = value;
        };

        $scope.getShow = function (value) {
            // Update show
            $barraHerramientas.show = value;
        };

        $scope.regresar = function () {
            $window.history.back();
        };

        $scope.source = {
            "processes": [
                {
                    "name": "processes - fracaso total",
                    "capabilities": [
                        {
                            "name": "capabilities - fracaso total",
                            "sortAreas": [
                                {
                                    "areas": [
                                        {
                                            "name": "Areas - fracaso total"
                                        }
                                    ],
                                    "Applications": [
                                        {
                                            "name": "Applications - fracaso total"
                                        }
                                    ],
                                    "kpis": [
                                        {
                                            "name": "kpis - fracaso total"
                                        }
                                    ]
                                }
                            ],
                        }
                    ]
                },
            ],
            "kpis": [
                {
                    "name": "kpi - fracaso total"
                }
            ]
        };

    };

    Controller.$inject = ['$scope', '$rootScope', '$window', '$indice', '$historial', '$barraHerramientas'];

    angular
        .module('mDiagrama').controller('DiagramaController', Controller);
})();
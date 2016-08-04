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
        $scope.zoom = $barraHerramientas.zoom;

        // $indexes
        var $indexArquitectura = 0;
        var $indexDominio = 0;
        var $indexMegaproceso = 0;

        // init arquitecturas, dominios, megaprocesos
        $scope.arquitecturas = $indice.arquitecturas(
            function (data) {
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
                    $scope.megaprocesos = $indice.megaprocesos(
                        $scope.dominios[$indexDominio].id,
                        function () {});
                }
            });

        //MARK: - getter Megaprocesos
        $scope.getMegaprocesos = function (value, index) {
            $scope.megaprocesos = $indice.megaprocesos(
                value,
                function () {
                    // Update Historial
                    $scope.historial = $historial.update(
                        $scope.arquitectura.name,
                        $scope.dominios[index].title);
                    // Update indexDominio
                    $indexDominio = index;
                });
        };
        //MARK: - getter Macroprocesos
        $scope.getMacroprocesos = function (value, index) {
            $scope.macroprocesos = $indice.macroprocesos(
                value,
                index,
                function (data) {
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
        //MARK: - getter Procesos
        $scope.getProcesos = function (value, index) {
            $indice.procesos(
                value,
                index,
                function (data) {
                    // Update Historial
                    $scope.historial = $historial.update(
                        $scope.arquitectura.name,
                        $scope.dominios[$indexDominio].title,
                        $scope.megaprocesos[$indexMegaproceso].title,
                        $scope.macroprocesos[index].title);
                    // Update Procesos
                    $scope.procesos = data.procesos;
                    console.log($scope.procesos);
                });
        };


        //MARK: - getter View
        $scope.getView = function (value) {
            // Update view
            $scope.view = value;
            $barraHerramientas.view = value;
        };
        //MARK: - getter Organize
        $scope.getOrganize = function (value) {
            // Update organize
            $scope.organize = value;
            $barraHerramientas.organize = value;
        };
        //MARK: - getter Show
        $scope.getShow = function (value) {
            // Update show
            $scope.show = value;
            $barraHerramientas.show = value;
        };
        //MARK: - getter Zoom
        $scope.getZoom = function(value) {
            $scope.zoom = value;
            $barraHerramientas.zoom = value;
        };
        

        //MARK: - Regresar
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
                            "sortAreas": {
                                "areas": [
                                    {
                                        "name": "Areas - fracaso total"
                                    }
                                        ],
                                "applications": [
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
                                }
                            ]
                        }
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
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
        
        $scope.areasList = $indice.areasList();

        // historial
        $scope.historial = [];

        // barra herramientas
        $scope.view = $barraHerramientas.view;
        $scope.organize = $barraHerramientas.organize;
        $scope.show = $barraHerramientas.show;
        $scope.zoom = $barraHerramientas.zoom;

        

        // $indexes
        var $indexArquitectura = $indice.$indexArquitectura || 0;
        var $indexDominio = $indice.$indexDominio || 0;
        var $indexMegaproceso = $indice.$indexMegaproceso || 0;
        var $indexMacroproceso = $indice.$indexMacroproceso || 0;

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
                        function () {

                            
                        });
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
            console.log('Macros');
            console.log(value);
            console.log(index);
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
            console.log('Procesos');
            console.log(value);
            console.log(index);
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
                    console.log(data);
                    $scope.source = {procesos: data.procesos, kpis:data.procesos, areas: data.areas};
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
        // MARK: - getter Print
        $scope.getPrint = function() {
            $scope.printPDF('pdf');
        };
        
        $scope.getSVG = function(value){
            console.log(value);
        };
        

        //MARK: - Regresar
        $scope.regresar = function () {
            $window.history.back();
        };

        $scope.source = {
            procesos: []
        };

    };

    Controller.$inject = ['$scope', '$rootScope', '$window', '$indice', '$historial', '$barraHerramientas'];

    angular
        .module('mDiagrama').controller('DiagramaController', Controller);
})();
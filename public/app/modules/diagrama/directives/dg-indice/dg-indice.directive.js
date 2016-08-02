/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            // Click en megaproceso
            $scope.sendMega = function (value, index) {

                // Controller
                $scope.getIndexmega(value, index);

                // Reset macroprocesos
                for (var i = 0; i < $scope.megaprocesos[index].macroprocesos.length; i++) {
                    $scope.megaprocesos[index].macroprocesos[i].open = false;
                }
                
                if ($scope.megaprocesos[index].open) {
                    $scope.megaprocesos[index].open = false;
                } else {
                    
                    // Clean megaprocesos
                    for (var j = 0; j < $scope.megaprocesos.length; j++) {
                        $scope.megaprocesos[j].open = false;
                    }
                    
                    // Select megaproceso
                    $scope.megaprocesos[index].open = true;
                }

            };

            $scope.sendMacro = function (value, index, parent) {
                
                // Controller
                $scope.getIndexmacro(value);

                // Clean macroprocesos
                for (var i = 0; i < $scope.megaprocesos[parent].macroprocesos.length; i++) {
                    $scope.megaprocesos[parent].macroprocesos[i].open = false;
                }
                
                //Select macroproceso
                $scope.megaprocesos[parent].macroprocesos[index].open = true;
            };

            $scope.sendDominio = function (value, index) {
                
                // Controller
                $scope.getIndexdominio(value);
                
                // Clean dominios
                for (var i = 0; i < $scope.dominios.length; i++) {
                    $scope.dominios[i].open = false;
                }
                
                // Select dominio
                $scope.dominios[index].open = true;
            };


        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/diagrama/directives/dg-indice/dg-indice.template.html',
            link: Link,
            scope: {
                arquitectura: '=',
                dominios: '=',
                megaprocesos: '=',
                getIndexmega: '=',
                getIndexmacro: '=',
                getIndexdominio: '='
            }
        };
    };
    angular
        .module('dgDiagramaIndice', [])
        .directive('dgIndice', Directive);
})();
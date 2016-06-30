/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {


            $scope.indexMega = $scope.mega;
            $scope.indexMacro = $scope.macro;
            $scope.macroprocesos = [];

            $scope.$watch('megaprocesos', function () {

                if ($scope.indiceAbierto && $scope.megaprocesos.length) {
                    
                    // Abre el megaproceso seleccionado
                    $scope
                        .megaprocesos[$scope.indexMega].open = true;
                    
                    // Se le informa al controlador, cuál megaproceso está abierto
                    $scope.getIndex('mega',
                        $scope.indexMega,
                        $scope
                        .megaprocesos[$scope.indexMega].id);
                

                    if ($scope.megaprocesos[$scope.indexMega].macroprocesos.length) {
                        
                        $scope
                            .megaprocesos[$scope.indexMega]
                            .macroprocesos[$scope.indexMacro].selected = true;

                        $scope.getIndex('macro',
                            $scope.indexMacro,
                            $scope
                            .megaprocesos[$scope.indexMega]
                            .macroprocesos[$scope.indexMacro].id);
                        
                    }
                }

            });
            
            $scope.$watch('macros', function(){

                if ($scope.indiceAbierto && $scope.megaprocesos.length) {
                    if ($scope.megaprocesos[$scope.indexMega].macroprocesos.length) {
                        
                        $scope
                            .megaprocesos[$scope.indexMega]
                            .macroprocesos[$scope.indexMacro].selected = true;

                        $scope.getIndex('macro',
                            $scope.indexMacro,
                            $scope
                            .megaprocesos[$scope.indexMega]
                            .macroprocesos[$scope.indexMacro].id);
                    }
                }
                
            });
            
            

            for (var n in $scope.megaprocesos) {
                $scope.megaprocesos[n].open = false;
                for (var m in $scope.megaprocesos[n].macroprocesos) {
                    $scope.megaprocesos[n].macroprocesos[m].selected = false;
                }
            }

            // Si el Megaproceso tiene macroprocesos
            if ($scope.megaprocesos.length) {
                if ($scope.megaprocesos[$scope.indexMega].macroprocesos.length) {

                    $scope.macroprocesos = $scope.megaprocesos[$scope.indexMega].macroprocesos;
                    // Si el macroproceso tiene procesos
                    if ($scope.macroprocesos[$scope.indexMacro].procesos.length) {
                        $scope.procesos = $scope.macroprocesos[$scope.indexMacro].procesos;
                    }
                }
            }





            // Cuando se selecciona un megaproceso del índice
            $scope.open = function (megaprocesos, megaproceso, index) {
                var value = !megaproceso.open;
                for (var i in megaprocesos) {
                    megaprocesos[i].open = false;
                }
                megaproceso.open = value;
                $scope.getIndex('mega', index, megaproceso.id);
            };

            // Cuando se selecciona un macroproceso del índice
            $scope.selected = function (macroprocesos, macroprocesoActual, index) {
                for (var i in macroprocesos) {
                    macroprocesos[i].selected = false;
                }
                macroprocesoActual.selected = true;

                $scope.indexMacro = index;
                $scope.getIndex('macro', index, macroprocesoActual.id);

            };
        };

        return {
            restrict: 'E',
            templateUrl: 'app/shared/directives/procesos/ng-index/ng-index.template.html',
            link: Link,
            scope: {
                megaprocesos: '=source',
                macros: '=',
                mega: '=',
                macro: '=',
                getIndex: '=get',
                indiceAbierto: '='
            }
        };
    };
    angular
        .module('mIndex', [])
        .directive('ngIndex', Directive);
})();
/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            $scope.indexMega = 0;
            $scope.indexMacro = 0;
            $scope.macroprocesos = [];

            for (var n in $scope.megaprocesos) {
                $scope.megaprocesos[n].open = false;
                for(var m in $scope.megaprocesos[n].macroprocesos){
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
                $scope.getIndex('mega', index);
            };

            // Cuando se selecciona un macroproceso del índice
            $scope.selected = function (macroprocesos, macroprocesoActual, index) {
                for (var i in macroprocesos) {
                    macroprocesos[i].selected = false;
                }
                macroprocesoActual.selected = true;

                $scope.indexMacro = index;
                $scope.getIndex('macro', index);

            };
        };

        return {
            restrict: 'E',
            templateUrl: 'app/shared/directives/procesos/ng-index/ng-index.template.html',
            link: Link,
            scope: {
                megaprocesos: '=source',
                getIndex: '=get'
            }
        };
    };
    angular
        .module('mIndex', [])
        .directive('ngIndex', Directive);
})();
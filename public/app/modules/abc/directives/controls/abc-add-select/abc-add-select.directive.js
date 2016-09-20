/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {

            $scope.source = [
                {
                    modelSelected: false,
                    showOptions: false,
                    model: '',
                    status: 1
                },
                {
                    modelSelected: false,
                    showOptions: false,
                    model: '',
                    status: 1
                }
            ];
            
            // Muestra las opciones
            $scope.toggleShowOptions = function (index) {
                if ($scope.options) {
                    $scope.source[index].showOptions = !$scope.source[index].showOptions;
                } else {
                    console.log('WARNING: Las opciones de la directiva Select ' + $scope.label + ', no están definidas');
                }
            };

            // Selecciona una opcion
            $scope.selectOption = function (parentIndex, index) {
                $scope.source[parentIndex].modelSelected = true;
                $scope.source[parentIndex].showOptions = false;
                $scope.source[parentIndex].model = $scope.options[index].area_id;
                $scope.source[parentIndex].area_desc = $scope.options[index].area_desc;
                $scope.saveModel();
            };

            $scope.canDelete = true;

            $scope.addElementToSource = function () {
                var element = {
                    modelSelected: false,
                    showOptions: false,
                    model: '',
                    status: 1
                };
                $scope.source.push(element);
                $scope.canDelete = true;
            };

            // Elimina un input del arreglo
            $scope.deleteElementFromSource = function (index) {
                if ($scope.source.length > 1) {
                    $scope.source.splice(index, 1);
                    if ($scope.source.length > 1) {
                        $scope.canDelete = true;
                    } else {
                        $scope.canDelete = false;
                    }
                } else {
                    $scope.canDelete = false;
                }
            };

            // Execute the event configured
            $scope.triggerEvent = function () {
                if ($scope.event) {
                    $scope.event();
                } else {
                    console.log('WARNING: El evento de la directiva Textarea, no está definido');
                }
            };

            // Actualiza el modelo que enviamos
            $scope.saveModel = function(){
                var obj = {};
                // Reset del model para rellenar
                $scope.model = [];
                // Llenamos el model
                for (var i in $scope.source) {
                    if ($scope.source[i].model !== '' && $scope.source[i].model) {
                        obj = {
                            area_ID: $scope.source[i].model,
                            mcro: $scope.source[i].mcro || 0,
                            status: $scope.source[i].status
                        };
                        $scope.model.push(obj);
                    }
                }
                console.log($scope.model);
            };
    
            // Recibe la configuracion del modelo
            $scope.$watch('model',function(){
                $scope.source = [];
                var optionsTemp = $scope.options;
                for (var i in $scope.model) {
                    obj = {
                        model: $scope.model[i].area_ID,
                        area_desc: $scope.getNameArea(optionsTemp, $scope.model[i].area_ID),
                        mcro:$scope.model[i].mcro,
                        status: 2,
                        modelSelected: true,
                        showOptions: false,
                    };
                    $scope.source.push(obj);
                }
            });

            $scope.getNameArea = function(optionsTemp, id){
                var name = '';
                for(var i in optionsTemp){
                    if(optionsTemp[i].area_id == id){
                        name = optionsTemp[i].area_desc
                    }
                }
                return name;
            };

        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-add-select/abc-add-select.template.html',
            scope: {
                label: '@',
                model: '=',
                holder: '=',
                options: '=',
                event: '='
            },
            link: Link
        };
    };
    angular
        .module('abcAddSelect', [])
        .directive('abcAddSelect', Directive);
})();
/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {

            $scope.source = [
                {
                    modelSelected: false,
                    showOptions: false,
                    model: '',
                    objective: '',
                    status:1,
                    mcro: 0
                },
                {
                    modelSelected: false,
                    showOptions: false,
                    model: '',
                    objective: '',
                    status:1,
                    mcro: 0
                }
            ];

            $scope.toggleShowOptions = function (index) {
                if ($scope.options) {
                    $scope.source[index].showOptions = !$scope.source[index].showOptions;
                } else {
                    console.log('WARNING: Las opciones de la directiva Select ' + $scope.label + ', no están definidas');
                }
            };

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
                    status:1,
                    mcro:0
                };
                $scope.source.push(element);
                $scope.canDelete = true;
            };

            $scope.deleteElementFromSource = function (index) {
                if ($scope.source.length > 1) {
                    $scope.source.splice(index, 1);
                    if ($scope.source.length > 1) {
                        $scope.canDelete = true;
                    } else {
                        $scope.canDelete = false;
                    }
                    $scope.saveModel();
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
            
            $scope.saveModel = function(){
                $scope.model = [];
                for (var i in $scope.source) {
                    if ($scope.source[i].model !== '' && $scope.source[i].objective !== '') {
                        var obj = {
                            area_ID: $scope.source[i].model,
                            mcro: $scope.source[i].mcro,
                            obj: $scope.source[i].objective,
                            status: $scope.source[i].status
                        };
                        $scope.model.push(obj);
                    }
                }
                console.log($scope.model);
            };

            // Recibe la configuracion del modelo
            $scope.$watch('model',function(){
                $scope.model && $scope.model.length && (function(){
                $scope.source = [];
                    var optionsTemp = $scope.options;
                    for (var i in $scope.model) {
                        obj = {
                            model: $scope.model[i].area_ID,
                            area_desc: $scope.getNameArea(optionsTemp, $scope.model[i].area_ID),
                            mcro:$scope.model[i].mcro,
                            status: $scope.model[i].status === 0 ? 2 : $scope.model[i].status,
                            modelSelected: true,
                            showOptions: false,
                            objective: $scope.model[i].obj
                        };
                        $scope.source.push(obj);
                    }
                })();
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
            templateUrl: 'app/modules/abc/directives/controls/abc-add-select-obj/abc-add-select-obj.template.html',
            scope: {
                label: '@',
                model: '=',
                holders: '=',
                options: '=',
                event: '='
            },
            link: Link
        };
    };
    angular
        .module('abcAddSelectObj', [])
        .directive('abcAddSelectObj', Directive);
})();
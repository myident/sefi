/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {
            console.log($scope.options)
            $scope.eventUpdate = true;
            $scope.resetDirective = function () {
                $scope.source = [
                    {
                        act_ID: undefined,
                        pro_BUS: '',
                        func_RES: '',
                        chn_ID: '',
                        mcro: 0,
                        status: 1,
                        modelSelected: false,
                        showOptions: false,
                        model: ''
                    },
                    {
                        act_ID: undefined,
                        pro_BUS: '',
                        func_RES: '',
                        chn_ID: '',
                        mcro: 0,
                        status: 1,
                        modelSelected: false,
                        showOptions: false,
                        model: ''
                    }
                ];
            };
            
            $scope.resetDirective();


            $scope.canDelete = true;


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
                $scope.source[parentIndex].model = $scope.options[index].id;
                $scope.source[parentIndex].name = $scope.options[index].name;
                $scope.saveModel();
            };


            $scope.addElementToSource = function () {
                var element = {
                    act_ID: 0,
                    pro_BUS: '',
                    func_RES: '',
                    chn_ID: '',
                    mcro: 0,
                    status: 1,
                    modelSelected: false,
                    showOptions: false,
                    model: ''
                };
                $scope.source.push(element);
                $scope.canDelete = true;
            };

            // Elimina un input del arreglo
            $scope.deleteElementFromSource = function (index) {
                console.log($scope.source[index].status)
                if ($scope.source.length > 1) {
                    $scope.source[index].status = 3;
                    console.log($scope.source[index].status)
                    if ($scope.getLength() > 1) {
                        $scope.canDelete = true;
                    } else {
                        $scope.canDelete = false;
                    }
                    $scope.saveModel();
                } else {
                    $scope.canDelete = false;
                }
            };

            $scope.getLength = function(){
                var count = 0;
                for(var i in $scope.source){
                    if($scope.source[i].status !== 3){
                        count++;
                    }
                }
                return count;
            };

            // Execute the event configured
            $scope.triggerEvent = function () {
                if ($scope.event) {
                    $scope.event();
                } else {
                    console.log('WARNING: El evento de la directiva Textarea, no está definido');
                }
            };

            $scope.saveModel = function () {
                $scope.eventUpdate = false;
                $scope.model = [];
                for (var i in $scope.source) {
                    if ($scope.source[i].id !== '' && $scope.source[i].activity !== '' && $scope.source[i].project !== '' && $scope.source[i].func_RES !== '') {
                        var obj = {
                            act_ID: Number($scope.source[i].act_ID),
                            pro_BUS: $scope.source[i].pro_BUS,
                            func_RES: $scope.source[i].func_RES,
                            chn_ID: $scope.source[i].chn_ID,
                            mcro: $scope.source[i].mcro,
                            status: $scope.source[i].status
                        };
                        $scope.model.push(obj);
                    }
                }
                console.log($scope.model);
            };


            $scope.$watch('model', function () {
                //console.log($scope.model);
                if ($scope.eventUpdate && $scope.model && $scope.model.length) {
                    $scope.source = [];
                    var obj = {};
                    for (var i in $scope.model) {
                        obj = {
                            act_ID: $scope.model[i].act_ID,
                            pro_BUS: $scope.model[i].pro_BUS,
                            func_RES: $scope.model[i].func_RES,
                            chn_ID: $scope.model[i].chn_ID,
                            mcro: $scope.model[i].mcro,
                            status: $scope.model[i].status === 0 ? 2 : $scope.model[i].status
                        };
                        $scope.source.push(obj);
                    }
                }
                $scope.eventUpdate && $scope.model && $scope.model.length === 0 && (function(){
                    $scope.resetDirective();
                })();
            });


            $scope.getNameApp = function (optionsTemp, id) {
                var name = '';

                for (var i in optionsTemp) {
                    if (optionsTemp[i].id == id) {
                        name = optionsTemp[i].name;
                    }
                }
                return name;
            };

        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-add-input-multiple/abc-add-input-multiple.template.html',
            scope: {
                label: '@',
                model: '=',
                holders: '=',
                event: '=',
                options: '='
            },
            link: Link
        };
    };
    angular
        .module('abcAddInputMultiple', [])
        .directive('abcAddInputMultiple', Directive);
})();
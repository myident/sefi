/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {

            $scope.source = [
                {
                    modelSelected: false,
                    showOptions: false,
                    model: ''
                },
                {
                    modelSelected: false,
                    showOptions: false,
                    model: ''
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
                    model: ''
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
                var obj = {};
                if ($scope.model){
                    for (var j in $scope.source) {
                        if ($scope.source[j].model !== '') {
                            obj = {
                                area_ID: $scope.source[j].model,
                                mcro: $scope.model[j].mcro,
                                status: 2
                            };
                            $scope.model.push(obj);
                        }
                    }
                } else {
                    $scope.model = [];
                    for (var i in $scope.source) {
                        if ($scope.source[i].model !== '') {
                            obj = {
                                area_ID: $scope.source[i].model,
                                mcro: 0,
                                status: 0
                            };
                            $scope.model.push(obj);
                        }
                    }
                }
                console.log($scope.model)

            };
            
            
            if ($scope.model){
                if ($scope.model.length){
                    $scope.source = [];
                    for (var i in $scope.model){
                        var obj = {
                            modelSelected: false,
                            showOptions: false,
                            model: $scope.model[i].area_ID
                        };
                        $scope.source.push(obj);
                    }
                }

            }
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
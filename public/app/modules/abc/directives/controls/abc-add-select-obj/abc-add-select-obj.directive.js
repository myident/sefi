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
                $scope.source[parentIndex].model = $scope.options[index].area_desc;
                $scope.model = [];
                for (var i in $scope.source) {
                    if ($scope.source[i].model !== '') {
                        var obj = {
                            area: $scope.source[i].model
                        };
                        $scope.model.push(obj);
                    }
                }
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
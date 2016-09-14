/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            $scope.source = [
                {
                    id: '',
                    activity: '',
                    project: '',
                    brule: ''
                },
                {
                    id: '',
                    activity: '',
                    project: '',
                    brule: ''
                }
            ];

            $scope.canDelete = true;

            $scope.addElementToSource = function () {
                var element = {
                    id: '',
                    activity: '',
                    project: '',
                    brule: ''
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

            $scope.saveModel = function () {
                $scope.model = [];
                for (var i in $scope.source) {
                    if ($scope.source[i].id !== '' && $scope.source[i].activity !== '' && $scope.source[i].project !== '' && $scope.source[i].brule !== '') {
                        var obj = {
                            id: $scope.source[i].id,
                            activity: $scope.source[i].activity,
                            project: $scope.source[i].project,
                            brule: $scope.source[i].brule
                        };
                        $scope.model.push(obj);
                    }
                }
                console.log($scope.model);
            };
        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-add-input-multiple/abc-add-input-multiple.template.html',
            scope: {
                label: '@',
                model: '=',
                holders: '=',
                event: '='
            },
            link: Link
        };
    };
    angular
        .module('abcAddInputMultiple', [])
        .directive('abcAddInputMultiple', Directive);
})();
/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {
            $scope.eventUpdate = true;
            $scope.source = [
                {
                    act_ID: 0,
                    pro_BUS: '',
                    func_RES: '',
                    chn_ID: '',
                    mcro: 0,
                    status: 1
                },
                {
                    act_ID: 0,
                    pro_BUS: '',
                    func_RES: '',
                    chn_ID: '',
                    mcro: 0,
                    status: 1
                }
            ];

            $scope.canDelete = true;

            $scope.addElementToSource = function () {
                var element = {
                    act_ID: 0,
                    pro_BUS: '',
                    func_RES: '',
                    chn_ID: '',
                    mcro: 0,
                    status: 1
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
                            status: $scope.model[i].status
                        };
                        $scope.source.push(obj);
                    }
                }
            });

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
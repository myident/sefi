/* global angular */
(function () {
    var Directive = function (Upload) {

        var Link = function ($scope) {

            $scope.eventUpdate = true;
            $scope.source = [
                {
                    name: '',
                    description: ''
                },
                {
                    name: '',
                    description: ''
                }
            ];

            $scope.canDelete = true;

            $scope.addElementToSource = function () {
                var element = {
                    name: '',
                    description: ''
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

            $scope.convertBase64 = function (index) {
                Upload
                    .base64DataUrl($scope.source[index].file)
                    .then(function (data) {
                        $scope.source[index].fileBase64 = data;
                        $scope.saveModel();
                    });

            };

            $scope.saveModel = function () {
                $scope.eventUpdate = false;
                $scope.model = [];


                for (var i in $scope.source) {
                    if ($scope.source[i].name !== '' && $scope.source[i].description !== '' && $scope.source[i].file !== undefined) {
                        var obj = {};
                        // Operative
                        if ($scope.tipo !== 'attach') {
                            obj = {
                                tipo: $scope.source[i].file.type,
                                base64: '' + $scope.source[i].fileBase64,
                                oper_ID: 0,
                                mcro: 0,
                                nombreArch: $scope.source[i].file.name,
                                oper_DES: $scope.source[i].description,
                                urll: '',
                                oper_NAME: $scope.source[i].name,
                                status: 0,
                                opp: 0
                            };
                        } else { // Attach
                            obj = {
                                tipo: $scope.source[i].file.type,
                                attc_ID: 0,
                                base64: '' + $scope.source[i].fileBase64,
                                mcro: 0,
                                nombreArch: $scope.source[i].file.name,
                                attc_NAME: $scope.source[i].name,
                                attc_DES: $scope.source[i].description,
                                urll: '',
                                status: 0
                            };
                        }

                        $scope.model.push(obj);
                    }
                }
            };

            // Recibe la configuracion del modelo
            $scope.$watch('model', function () {
                if ($scope.model && $scope.model.length && $scope.eventUpdate) {

                    $scope.source = [];
                    var obj = {};
                    for (var i in $scope.model) {

                        // Operative
                        if ($scope.tipo !== 'attach') {
                            obj = {
                                name: $scope.model[i].oper_NAME,
                                description: $scope.model[i].oper_DES,
                            };
                        } else { // Attach
                            obj = {
                                name: $scope.model[i].attc_NAME,
                                description: $scope.model[i].attc_DES,
                            };
                        }

                        $scope.source.push(obj);
                    }

                }
            });

        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-add-input-file/abc-add-input-file.template.html',
            scope: {
                label: '@',
                model: '=',
                holders: '=',
                event: '=',
                nameFile: '@',
                tipo: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcAddInputFile', [])
        .directive('abcAddInputFile', Directive);
})();
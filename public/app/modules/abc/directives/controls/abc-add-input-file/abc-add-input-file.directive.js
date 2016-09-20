/* global angular */
(function () {
    var Directive = function (Upload) {

        var Link = function ($scope) {

            $scope.source = [
                {
                    name: '',
                    description: '',
                    campo: ''
                },
                {
                    name: '',
                    description: '',
                    campo: ''
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
                console.log($scope.source[index].file);
                Upload
                    .base64DataUrl($scope.source[index].file)
                    .then(function (data) {
                        $scope.source[index].fileBase64 = data;
                        $scope.saveModel();
                    });

            };

            $scope.saveModel = function () {
                $scope.model = [];
                
                
                for (var i in $scope.source) {
                    if ($scope.source[i].name !== '' && $scope.source[i].description !== '' && $scope.source[i].file !== undefined) {
                        var obj = {};
                        if ($scope.tipo !== 'attach'){
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
                        } else {
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
                console.log($scope.model);
            };

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
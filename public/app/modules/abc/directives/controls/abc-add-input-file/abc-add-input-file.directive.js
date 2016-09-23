/* global angular */
(function () {
    var Directive = function (Upload) {

        var Link = function ($scope) {

            $scope.eventUpdate = true;
            $scope.source = [
                {
                    name: '',
                    description: '',
                    status: 1,
                    opp: 0,
                    mcro: 0,
                    attc_ID: 0,
                    oper_ID: 0,
                    urll: ''
                },
                {
                    name: '',
                    description: '',
                    status: 1,
                    opp: 0,
                    mcro: 0,
                    attc_ID: 0,
                    oper_ID: 0,
                    urll: ''
                }
            ];

            $scope.canDelete = true;

            $scope.addElementToSource = function () {
                var element = {
                    name: '',
                    description: '',
                    status: 1,
                    opp: 0,
                    mcro: 0,
                    attc_ID: 0,
                    oper_ID: 0
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
                                oper_ID:  $scope.source[i].oper_ID,
                                mcro: $scope.source[i].mcro,
                                nombreArch: $scope.source[i].file.name,
                                oper_DES: $scope.source[i].description,
                                urll: $scope.source[i].urll,
                                oper_NAME: $scope.source[i].name,
                                status: $scope.source[i].status,
                                opp: $scope.source[i].opp
                            };
                        } else { // Attach
                            obj = {
                                tipo: $scope.source[i].file.type,
                                attc_ID:  $scope.source[i].attc_ID,
                                base64: '' + $scope.source[i].fileBase64,
                                mcro: $scope.source[i].mcro,
                                nombreArch: $scope.source[i].file.name,
                                attc_NAME: $scope.source[i].name,
                                attc_DES: $scope.source[i].description,
                                urll: $scope.source[i].urll,
                                status: $scope.source[i].status
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
                                status: $scope.model[i].status,
                                opp: $scope.model[i].opp,
                                mcro: $scope.model[i].mcro,
                                attc_ID: 0,
                                oper_ID: $scope.model[i].oper_ID,
                                file: {name:$scope.model[i].urll}
                            };
                        } else { // Attach
                            obj = {
                                name: $scope.model[i].attc_NAME,
                                description: $scope.model[i].attc_DES,
                                status: $scope.model[i].status,
                                opp: 0,
                                mcro: $scope.model[i].mcro,
                                attc_ID: $scope.model[i].attc_ID,
                                oper_ID: 0,
                                file: {name:$scope.model[i].urll}
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

    angular
        .module('abcAddInputFile')
        .filter('fileName', function () {
          return function (str) {
            str = str || '';
            var fileName = str;
                for(var i = str.length; i > 0;--i){
                    if(str[i] === "/" ){ 
                        fileName = str.slice((i+1),str.length);
                        break;
                    }
                }
            return fileName;
          };
    });
})();
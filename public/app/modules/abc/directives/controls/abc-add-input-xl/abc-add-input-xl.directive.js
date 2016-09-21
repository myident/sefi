/* global angular */
(function () {
    var Directive = function () {
        
        var Link = function ($scope) {
            
            $scope.source = [
                {
                    name: '',
                    status: 1
                },
                {
                    name: '',
                    status: 1
                }
            ];
            
            $scope.canDelete = true;
            
            $scope.addElementToSource = function(){
                var element = {
                    name: '',
                    status: 1
                };
                $scope.source.push(element);
                $scope.canDelete = true;
            };
            
            $scope.deleteElementFromSource = function(index){
                if ($scope.source.length > 1){
                    $scope.source.splice(index, 1);
                    if ($scope.source.length > 1){
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
                if ($scope.event){
                    $scope.event();
                } else {
                    console.log('WARNING: El evento de la directiva Textarea, no está definido');
                }
            };
            
            $scope.saveModel = function(){
                $scope.model = [];
                for (var i in $scope.source) {
                    if ($scope.source[i].name !== '') {
                        var obj = {
                            assu_ID:  $scope.source[i].assu_ID || 0,
                            mcro: $scope.source[i].mcro || 0,
                            assu_DES: $scope.source[i].name,
                            status: $scope.source[i].status
                        };
                        $scope.model.push(obj);
                    }
                }
                console.log($scope.model);
            };

            // Recibe la configuracion del modelo
            $scope.$watch('model',function(){
                console.log($scope.model);
                $scope.model && $scope.model.length && (function(){
                    $scope.source = [];
                    var optionsTemp = $scope.options;
                    for (var i in $scope.model) {
                        obj = {
                            name: $scope.model[i].assu_DES,
                            mcro: $scope.model[i].mcro,
                            assu_ID: $scope.model[i].assu_ID,
                            status: $scope.model[i].status === 0 ? 2 : $scope.model[i].status,
                            modelSelected: true,
                            showOptions: false,
                        };
                        $scope.source.push(obj);
                    }
                })();
            });

            
        };
        
        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-add-input-xl/abc-add-input-xl.template.html',
            scope: {
                label: '@',
                model: '=',
                holder: '=',
                event: '='
            },
            link: Link
        };
    };
    angular
        .module('abcAddInputXl', [])
        .directive('abcAddInputXl', Directive);
})();
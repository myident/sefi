/* global angular */
(function () {
    var Directive = function () {
        
        var Link = function ($scope) {
            $scope.eventUpdate = true;
            $scope.resetDirective = function(){
                $scope.source = [
                    {
                        description: '',
                        sla: '',
                        status:1,
                        mcro:0,
                        sl_ID: 0
                    },
                    {
                        description: '',
                        sla: '',
                        status:1,
                        mcro:0,
                        sl_ID: 0
                    }
                ];
            };
            $scope.resetDirective();
            
            $scope.canDelete = true;
            
            $scope.addElementToSource = function(){
                var element = {
                    description: '',
                    sla: '',
                    status:1,
                    mcro:0,
                    sl_ID: 0
                };
                $scope.source.push(element);
                $scope.canDelete = true;
            };
            
            $scope.deleteElementFromSource = function(index){
                if ($scope.source.length > 1){
                    // $scope.source.splice(index, 1);
                    $scope.source[index].status = 3;
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
                $scope.eventUpdate = false;
                $scope.model = [];
                for (var i in $scope.source) {
                    if ($scope.source[i].description !== '' && $scope.source[i].sla !== '') {
                        var obj = {
                            sl_DES: $scope.source[i].description,
                            mcro: $scope.source[i].mcro,
                            sl_NAME: $scope.source[i].sla,
                            sl_ID: $scope.source[i].sl_ID,
                            status: $scope.source[i].status
                        };
                        $scope.model.push(obj);
                    }
                }
                console.log($scope.model);
            };

            // Recibe la configuracion del modelo
            $scope.$watch('model',function(){
                
                $scope.eventUpdate && $scope.model && $scope.model.length && (function(){
                    $scope.source = [];
                    var optionsTemp = $scope.options;
                    for (var i in $scope.model) {
                        obj = {
                            sl_ID: $scope.model[i].sl_ID,
                            description: $scope.model[i].sl_DES,
                            sla: $scope.model[i].sl_NAME,
                            mcro:$scope.model[i].mcro,
                            status: $scope.model[i].status === 0 ? 2 : $scope.model[i].status,
                            modelSelected: true,
                            showOptions: false,
                        };
                        $scope.source.push(obj);
                    }
                })();
                $scope.eventUpdate && $scope.model && $scope.model.length === 0 && (function(){
                    $scope.resetDirective();
                })();
                
            });
            
        };
        
        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-add-numeric-input/abc-add-numeric-input.template.html',
            scope: {
                label: '@',
                model: '=',
                holders: '=',
                event: '=',
                eventUpdate:'='
            },
            link: Link
        };
    };
    angular
        .module('abcAddNumericInput', [])
        .directive('abcAddNumericInput', Directive);
})();
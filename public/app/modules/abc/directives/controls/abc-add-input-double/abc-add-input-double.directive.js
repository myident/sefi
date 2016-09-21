/* global angular */
(function () {
    var Directive = function () {
        
        var Link = function ($scope) {
            $scope.eventUpdate = true;
            $scope.resetDirective = function(){
                $scope.source = [
                    {
                        name: '',
                        definition: '',
                        status:1,
                        mcro:0,
                        ter_ID: 0
                    },
                    {
                        name: '',
                        definition: '',
                        status:1,
                        mcro:0,
                        ter_ID: 0
                    }
                ];
            };
            $scope.resetDirective();
            
            $scope.canDelete = true;
            
            $scope.addElementToSource = function(){
                var element = {
                    name: '',
                    definition: '',
                    status:1,
                    mcro:0,
                    ter_ID: 0
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
                    if ($scope.source[i].name !== '' && $scope.source[i].definition !== '') {
                        var obj = {
                            ter: $scope.source[i].name,
                            ter_DEF: $scope.source[i].definition,
                            mcro: $scope.source[i].mcro,
                            ter_ID: $scope.source[i].ter_ID,
                            status: $scope.source[i].status
                        };
                        $scope.model.push(obj);
                    }
                }
   
            };

            // Recibe la configuracion del modelo
            $scope.$watch('model',function(){

                 $scope.eventUpdate && $scope.model && $scope.model.length && (function(){
                    $scope.source = [];

                    var optionsTemp = $scope.options;
                    for (var i in $scope.model) {
                        obj = {
                            ter_ID: $scope.model[i].ter_ID,
                            name: $scope.model[i].ter,
                            definition: $scope.model[i].ter_DEF,
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
            templateUrl: 'app/modules/abc/directives/controls/abc-add-input-double/abc-add-input-double.template.html',
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
        .module('abcAddInputDouble', [])
        .directive('abcAddInputDouble', Directive);
})();
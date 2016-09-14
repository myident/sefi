/* global angular */
(function () {
    var Directive = function () {
        
        var Link = function ($scope) {
            
            $scope.source = [
                {
                    description: '',
                    sla: ''
                },
                {
                    description: '',
                    sla: ''
                }
            ];
            
            $scope.canDelete = true;
            
            $scope.addElementToSource = function(){
                var element = {
                    description: '',
                    sla: ''
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
                    if ($scope.source[i].description !== '' && $scope.source[i].sla !== '') {
                        var obj = {
                            description: $scope.source[i].description,
                            sla: $scope.source[i].sla
                        };
                        $scope.model.push(obj);
                    }
                }
                console.log($scope.model);
            };
            
        };
        
        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-add-numeric-input/abc-add-numeric-input.template.html',
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
        .module('abcAddNumericInput', [])
        .directive('abcAddNumericInput', Directive);
})();
/* global angular */
(function () {
    var Directive = function () {
        
        var Link = function ($scope) {
            
            $scope.source = [
                {
                    name: ''
                },
                {
                    name: ''
                }
            ];
            
            $scope.canDelete = true;
            
            $scope.addElementToSource = function(){
                var element = {
                    name: ''
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
                            name: $scope.source[i].name
                        };
                        $scope.model.push(obj);
                    }
                }
                console.log($scope.model);
            };
            
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
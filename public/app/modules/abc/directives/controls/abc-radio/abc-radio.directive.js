/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            // Execute the event configured
            $scope.triggerEvent = function () {
                if ($scope.event){
                    $scope.event();
                } else {
                    console.log('WARNING: El evento de la directiva Textarea, no está definido');
                }
            };
            
            $scope.selectOption = function(index){
                $scope.model = index;
                if ($scope.options.length){
                    for(var i in $scope.options){
                        $scope.options[i].active = false;
                    }
                    if ($scope.options[index]){
                        $scope.options[index].active = true;
                    }
                } else {
                    console.log('WARNING: Las opciones no están definidas');
                }
            };
            
            $scope.$watch('model', function(newVal){
                $scope.selectOption(newVal);
            });
            
            $scope.selectOption($scope.model);

        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-radio/abc-radio.template.html',
            scope: {
                options: '=',
                model: '=',
                label: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcRadio', [])
        .directive('abcRadio', Directive);
})();
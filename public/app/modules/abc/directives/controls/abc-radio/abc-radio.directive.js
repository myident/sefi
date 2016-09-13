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
                for(var i in $scope.options){
                    $scope.options[i].active = false;
                }
                $scope.options[index].active = true;
            };
            
            

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
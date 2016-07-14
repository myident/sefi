/* global angular */

(function () {
    var Directive = function () {
        var Link = function ($scope) {
            $scope.arr = [''];
            var count = 0;
            for(var i = 0; i < $scope.text.length; i++){
                // console.log($scope.text[i]);
                
                if($scope.text[i] + $scope.text[i+1] === '\\n'){
                    count++;
                    i++;
                    $scope.arr[count] = '';
                }else{
                    $scope.arr[count] += $scope.text[i];
                }
            }
        };
        return {
            restrict: 'E',
            templateUrl: 'app/shared/directives/main/ng-paragraph/ng-paragraph.template.html',
            link: Link,
            scope: {
                text:"=text"
            }
        };
    };
    angular
        .module('mParagraph', [])
        .directive('ngParagraph', Directive);
})();
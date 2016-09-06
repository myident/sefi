/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {
            $scope.name = '';
            $scope.shortname = '';
            // Save the object Domain
            $scope.save = function () {
                if ($scope.name !== undefined && $scope.name !== '') {
                    if ($scope.shortname !== undefined && $scope.shortname !== '') {
                        console.log($scope.name);
                        console.log($scope.shortname);
                    }
                }
            };
            // Clear
            $scope.clear = function () {
                $scope.name = '';
                $scope.shortname = '';
            };
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/abc-domain/abc-domain.template.html',
            scope: {
                title: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcDomain', [])
        .directive('abcDomain', Directive);
})();
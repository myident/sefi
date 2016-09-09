/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {

            $scope.canSave = false;

            // Data structure
            $scope.name = '';
            $scope.shortname = '';

            // Active the save button
            $scope.toggleActiveButton = function () {
                if ($scope.name !== undefined && $scope.name !== '') {
                    if ($scope.shortname !== undefined && $scope.shortname !== '') {
                        $scope.canSave = true;
                    } else {
                        $scope.canSave = false;
                    }
                } else {
                    $scope.canSave = false;
                }
            };

            // Save the object Domain
            $scope.save = function () {
                if ($scope.canSave) {
                    console.log($scope.name);
                    console.log($scope.shortname);
                }
            };

            // Clear the data structure
            $scope.clear = function () {
                $scope.name = '';
                $scope.shortname = '';
                $scope.canSave = false;
            };

        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-domain/abc-domain.template.html',
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
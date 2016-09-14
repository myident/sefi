/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {

            $scope.canSave = false;

            // Data structure
            $scope.name = '';
            $scope.domain = '';

            if ($scope.source) {
                $scope.name = $scope.source.name;
                $scope.domain = $scope.source.domain;
            }

            // Active the save button
            $scope.toggleActiveButton = function () {
                if ($scope.name !== undefined && $scope.name !== '') {
                    if ($scope.domain !== undefined && $scope.domain !== '') {
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
                    $scope.event($scope.name, $scope.domain);
                }
            };

            // Clear the data structure
            $scope.clear = function () {
                $scope.name = '';
                $scope.domain = '';
                $scope.canSave = false;
            };
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-megaprocess/abc-megaprocess.template.html',
            scope: {
                title: '@',
                dominios: '=',
                event: '='
            },
            link: Link
        };
    };
    angular
        .module('abcMegaprocess', [])
        .directive('abcMegaprocess', Directive);
})();
/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {
            $scope.canSave = false;

            // Data structure
            $scope.name = '';
            $scope.domain = '';

            // Active the save button
            $scope.toggleActiveButton = function () {
                if ($scope.name !== undefined && $scope.name !== '') {
                    if ($scope.name !== undefined && $scope.name !== '') {
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
            templateUrl: 'app/modules/abc/directives/modules/abc-capability/abc-capability.template.html',
            scope: {
                title: '@',
                dominios: '=',
                event: '='
            },
            link: Link
        };
    };
    angular
        .module('abcCapability', [])
        .directive('abcCapability', Directive);
})();
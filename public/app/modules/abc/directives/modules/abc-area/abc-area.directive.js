/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {

            $scope.canSave = false;
            $scope.name = '';
            $scope.type = 0;
            $scope.typeOptions = [
                {
                    name: 'Operative',
                    active: true
                },
                {
                    name: 'Executive',
                    active: false
                }
            ];

            // Active the save button
            $scope.toggleActiveButton = function () {
                if ($scope.name !== undefined && $scope.name !== '') {
                    $scope.canSave = true;
                } else {
                    $scope.canSave = false;
                }
            };

            // Save the object Domain
            $scope.save = function () {
                var type = 'O';
                if ($scope.canSave) {
                    if ($scope.type == 1) {
                        type = 'E';
                    }
                    $scope.event($scope.name, type);
                }
            };

            // Clear the data structure
            $scope.clear = function () {
                $scope.name = '';
                $scope.type = 0;
                $scope.canSave = false;
            };
            
            // MARK: - Update
            if ($scope.source) {
                $scope.name = $scope.source.name;
                $scope.type = $scope.source.type;
                $scope.toggleActiveButton();
            }
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-area/abc-area.template.html',
            scope: {
                title: '@',
                source: '=',
                event: '='
            },
            link: Link
        };
    };
    angular
        .module('abcArea', [])
        .directive('abcArea', Directive);
})();
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

            $scope.edit = function () {
                var type = 'O';
                console.log($scope.canSave);
                if ($scope.canSave) {
                    if ($scope.type == 1) {
                        type = 'E';
                    }
                    $scope.eventUpdate($scope.id, $scope.name, type);
                }
            };

            $scope.delete = function () {
                $scope.eventDelete($scope.id);
            };

            // Clear the data structure
            $scope.clear = function () {
                $scope.name = '';
                $scope.type = 0;
                $scope.canSave = false;
            };
            
            // MARK: - Update
            if ($scope.source) {
                $scope.id = $scope.source.id;
                $scope.name = $scope.source.name;
                $scope.type = $scope.source.type;
                $scope.toggleActiveButton();
            }
            
            $scope.internalControl = $scope.control || {};
            $scope.internalControl.clear = function(){
                $scope.clear();  
            };
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-area/abc-area.template.html',
            scope: {
                title: '@',
                source: '=',
                event: '=',
                eventUpdate: '=',
                eventDelete: '=',
                control: '=',
                update:'='
            },
            link: Link
        };
    };
    angular
        .module('abcArea', [])
        .directive('abcArea', Directive);
})();
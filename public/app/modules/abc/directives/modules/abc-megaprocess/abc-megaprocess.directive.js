/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {

            $scope.canSave = false;
            $scope.name = '';
            $scope.domain = {};

            // Active the save button
            $scope.toggleActiveButton = function (select) {
                if ($scope.name !== undefined && $scope.name !== '') {
                    if (select !== undefined || $scope.domain.name !== undefined) {
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
                $scope.domain = {};
                $scope.canSave = false;
            };
            
            // MARK: - Update
            if ($scope.source) {
                $scope.name = $scope.source.name;
                $scope.domain = $scope.source.domain;
                $scope.toggleActiveButton();
            }
            
            $scope.internalControl = $scope.control || {};
            $scope.internalControl.clear = function(){
                $scope.clear();  
            };
            
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-megaprocess/abc-megaprocess.template.html',
            scope: {
                dominios: '=',
                event: '=',
                source: '=',
                control: '='
            },
            link: Link
        };
    };
    angular
        .module('abcMegaprocess', [])
        .directive('abcMegaprocess', Directive);
})();
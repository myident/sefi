/* global angular */
(function () {
    var Controller = function ($scope, $rootScope, $abcCreate) {
        
        $scope.types = $abcCreate.types;
        
        $scope.toggleType = function (index) {
            for (var i in $scope.types) {
                if (i == index) {
                    $scope.types[index].active = !$scope.types[index].active;
                } else {
                    $scope.types[i].active = false;
                }
            }

        };
        
        $scope.domain = {};
        $scope.domain.name = 'R';
        
        $scope.print = function(){
            console.log($scope.domain.name);
        };
    };
    Controller.$inject = ['$scope', '$rootScope', '$abcCreate'];
    angular
        .module('mAbc')
        .controller('AbcCreateController', Controller);
})();
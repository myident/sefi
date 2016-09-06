/* global angular */
(function(){
    var Controller = function($scope){
        $scope.init = 'Loading';
    };
    Controller.$inject = ['$scope'];
    angular.module('mAbc').controller('abcCreateController', Controller);
})();
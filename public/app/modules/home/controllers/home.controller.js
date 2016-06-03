/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams) {
    	// $scope.user = new Entry();
    	// $scope.user.name = 'Martin';
    	// $scope.user.apellido = 'Mtz';
    	// $scope.user.$save(function(data){
    		
    	// },function(err){

    	// });
        
    };
    controller.$inject = ['$scope','$rootScope','$routeParams'];
    angular.module('mHome').controller('HomeController', controller);

})();
(function(){

	var controller = function($rootScope, $scope, $serviceLogin){

		$scope.session = function(){

            $serviceLogin.session()
                .then(function(data) {
                	console.log(data);
                    if(data.success){
                        $scope.name = data.data.name;
                    }else{
                    	//$scope.out();
                    }
                    
                }, function(error) {
                    console.log(error);
                });
        };

		$scope.logout = function(){

            $rootScope.exit();

            $serviceLogin.logout()
                .then(function(data) {
                    if(data.success){
                        $scope.out();
                    }else{
                    	$scope.out();
                    }
                    
                }, function(error) {
                    console.log(error);
                });
        };

        $scope.out = function(){
        	//window.location.href = "http://alom.mx/sefi/home.html";
        	window.location.href = "http://myidenti.com";
        };
        //$scope.session();

        $scope.setBlur = function(){
            $('header, .content').foggy({
               blurRadius: 3,          // In pixels.
               opacity: 0.8,           // Falls back to a filter for IE.
               cssFilterSupport: true  // Use "-webkit-filter" where available.
             });
        };
        $scope.removeBlur = function(){
            $('header, .content').foggy(false);
        };

        $rootScope.enter = function(data){
            $scope.removeBlur();
            $scope.user        = data;
            $scope.name         = data.name;
            $rootScope.signed   = true;
        };


        $rootScope.exit = function(){
            $scope.setBlur();
            $scope.user = {};
            $rootScope.signed = false;
        };

        $rootScope.getUser = function(){
            return $scope.user;
        };
         
         $scope.setBlur();
         //$rootScope.enter('876875687');
	};
	controller.$inject = ['$rootScope','$scope','serviceLogin'];
	angular.module('app').controller('HeaderController',controller);
})();
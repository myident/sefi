(function(){

	var controller = function($rootScope, $scope, $serviceLogin){

        $scope.data = {
            user: '',
            password: ''
        };
        $scope.spin = false;
        $scope.toggleAlert = true;

		$scope.login = function(){

            $scope.spin = true;
			$serviceLogin.login($scope.data)
                .then(function(data) {
                    $scope.spin = false;
                    if(data.success){
                         $rootScope.enter(data.data);
                    }else{
                        $scope.toggleAlert = true;
                    	$scope.message = data.description;
                    }
                    
                }, function(error) {
                    console.log(error);
                });
		};
        $scope.logout = function(){

            $scope.spin = true;
            $serviceLogin.login($scope.data)
                .then(function(data) {
                    $scope.spin = false;
                    if(data.success){
                        //window.location.href = "http://alom.mx/sefi/home.html";
                        window.location.href = "http://myidenti.com";
                    }else{

                    }
                    
                }, function(error) {
                    console.log(error);
                });
        };

		
	};
	controller.$inject = ['$rootScope','$scope','serviceLogin'];
	angular.module('app').controller('LoginController',controller);
})();
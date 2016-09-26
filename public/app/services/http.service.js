(function(){
	
	var service = function($rootScope, $http, $q){
		$rootScope.count = 0;

		$rootScope.$watch('count',function(val){
			$rootScope.spin = val == 0 ? false : true;
		})
		var shared = {};
		var baseUrl = 'https://salty-reaches-54696.herokuapp.com/';
		//var baseUrl = 'http://localhost:5000/';
		var req = {
			 method: 'POST',
			 url: '',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {}
			}
		var ejecute = function(obj){
			
			obj.data = JSON.stringify(obj.data);
			$rootScope.count++;
			return $http(obj)
                .then(function(response) {
                	$rootScope.count--;
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function(response) {
                    $rootScope.count--;
                    return $q.reject(response.data);
                });
		};

        shared.build = function(data) {
        	req.data = data;
        	req.url = baseUrl+'build';
        	console.log(data);
            return ejecute(req);
        };


        return shared;
	};
	service.$inject = ['$rootScope', '$http', '$q'];
	angular.module('http',[]).factory('service',service)

})();
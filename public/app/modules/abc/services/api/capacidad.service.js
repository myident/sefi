(function(){
	angular.module('mAbc').factory('$apicapacidad',function($resource, $singleton){
		return $resource($singleton.path+'Capacidad/:id');
	});
})();
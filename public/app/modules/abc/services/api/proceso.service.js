(function(){
	angular.module('mAbc').factory('$apiproceso',function($resource, $singleton){
		return $resource($singleton.path+'Proceso/:id');
	});
})();
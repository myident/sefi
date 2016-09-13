(function(){
	angular.module('mAbc').factory('$apimegaproceso',function($resource, $singleton){
		return $resource($singleton.path+'Megaprocesos/:id');
	});
})();
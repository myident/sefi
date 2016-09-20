(function(){
	angular.module('mAbc').factory('$apiarea',function($resource, $singleton){
		return $resource($singleton.path+'Area/:id');
	});
})();
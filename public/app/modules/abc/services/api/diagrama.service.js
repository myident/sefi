(function(){
	angular.module('mAbc').factory('$apidiagrama',function($resource, $singleton){
		return $resource($singleton.path+'Diagrama');
	});
})();
(function(){
	angular.module('mAbc').factory('$apikpi',function($resource, $singleton){
		return $resource($singleton.path+'Kpi/:id');
	});
})();
(function(){
	angular.module('mAbc').factory('Kpi',function($resource, $singleton){
		return $resource($singleton.path+'Dominio/:id');
	});
})();
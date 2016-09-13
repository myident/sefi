(function(){
	angular.module('mAbc').factory('$apidominio',function($resource, $singleton){
		return $resource($singleton.path+'Dominio/:id');
	});
})();
(function(){
	angular.module('mAbc').factory('Dominio',function($resource, $singleton){
		return $resource($singleton.path+'Dominio/:id');
	});
})();
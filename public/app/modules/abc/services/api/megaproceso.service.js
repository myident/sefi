(function(){
	angular.module('mAbc').factory('Megaproceso',function($resource, $singleton){
		return $resource($singleton.path+'Dominio/:id');
	});
})();
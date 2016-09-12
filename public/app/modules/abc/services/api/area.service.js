(function(){
	angular.module('mAbc').factory('Area',function($resource, $singleton){
		return $resource($singleton.path+'Dominio/:id');
	});
})();
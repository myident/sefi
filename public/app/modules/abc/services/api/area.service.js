(function(){
	angular.module().factory('Area',function($source, $singleton){
		return $resource($singleton.path+'Dominio/:id');
	});
})();
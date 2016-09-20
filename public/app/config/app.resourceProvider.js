angular.
	  module('app').
		 config(['$resourceProvider', function ($resourceProvider) {
		    $resourceProvider.defaults.actions.update =	{method: 'PUT'};
		    $resourceProvider.defaults.actions.delete =	{method: 'DELETE'};
		  }]);
angular.module('app', ['ngResource', 'ui.bootstrap', 'ui.scroll', 'ui.scroll.jqlite', 'smart-table']).run([
	'$rootScope', '$log', function($rootScope, $log) {
		return $rootScope.$on('$routeChangeSuccess', function(event, currentRoute, priorRoute) {
			return $rootScope.$broadcast(currentRoute.controller + "$routeChangeSuccess", currentRoute, priorRoute);
		});
	}
]);
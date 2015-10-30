angular.module('app').factory('resourceFactory', [
	'$resource', function($resource) {
		return $resource('api', {}, {
			get: {
				method: 'GET'
			},
			list: {
				method: 'GET',
				isArray: true
			},
			post: {
				method: 'POST'
			},
			create: {
				method: 'PUT'
			},
			remove: {
				method: 'DELETE'
			}
		});
	}
]);
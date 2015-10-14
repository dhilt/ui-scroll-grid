angular.module('app').directive('parentWidthPropagating', function() {
	return function(scope, element, attrs) {
		return scope.$watch(attrs.parentWidthPropagating, function() {
			if (!scope[attrs.parentWidthPropagating]) {
				return;
			}
			return element.width(element.parent().get(0).clientWidth);
		});
	};
});
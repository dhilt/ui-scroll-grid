angular.module('app').directive('parentWidthPropagating', function() {
	return function(scope, element, attrs) {
		scope.$watch(attrs.parentWidthPropagating, function() {
			if (!scope[attrs.parentWidthPropagating]) {
				return;
			}
			var width = element.parent()[0].clientWidth;
			if(width) {
				element.css('width', width + 'px');
			}
		});
	};
});
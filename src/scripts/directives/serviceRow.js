angular.module('app').directive('serviceRow', [
	'$timeout', function ($timeout) {
		return function (scope, element, attrs) {

			var getTHeadRow = function () {
				var tmp;
				if (!(tmp = element.parent())) return false;
				if (!(tmp = tmp.children()).length) return false;
				if (!(tmp = tmp[0])) return false;
				if (!(tmp = tmp.children).length) return false;
				if (!(tmp = tmp[0])) return false;
				return tmp;
			};

			var getColumnsWidth = function () {
				var tHeadRow = getTHeadRow();
				if (!tHeadRow) {
					return false;
				}

				var columns = [];
				for (var i = 0; i < tHeadRow.children.length; i++) {
					var child = tHeadRow.children[i];
					columns.push(child.clientWidth);
				}
				return columns;
			};

			var createServiceRow = function (columnsWidth) {
				var serviceRowContents = '';
				for (var i = 0; i < columnsWidth.length; i++) {
					serviceRowContents += '<td style="width:' + columnsWidth[i] + 'px; height: 0; padding: 0; border-width: 0;"></td>';
				}
				var table = angular.element('<table><tr>' + serviceRowContents + '</tr></table>');
				return table.find('tr');
			};

			scope.$watch(attrs.serviceRow, function () {
				if (!scope[attrs.serviceRow]) {
					return;
				}

				var columnsWidth = getColumnsWidth();
				if (!columnsWidth) {
					return false;
				}

				var serviceRow = createServiceRow(columnsWidth);
				if (!serviceRow) {
					return false;
				}

				element.prepend(serviceRow);
			});

		};
	}
]);
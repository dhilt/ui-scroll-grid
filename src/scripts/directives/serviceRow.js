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
					serviceRowContents += '<td style="width:' + columnsWidth[i] + 'px;"></td>';
				}
				var table = angular.element('<table><tr class="serviceRow">' + serviceRowContents + '</tr></table>');
				return table.find('tr');
			};

			var injectServiceRow = function(serviceRow) {
				var tmp;
				if (!(tmp = element.children()).length) return false;
				if (!(tmp = tmp[0])) return false; // need to inject after 1st empty (ui-scroll padding) row
				if (!(tmp = angular.element(tmp))) return false;
				tmp.after(serviceRow);
			};

			scope.$watch(attrs.serviceRow, function () {
				if (!scope[attrs.serviceRow]) {
					return;
				}

				var columnsWidth, serviceRow;

				if (!(columnsWidth = getColumnsWidth())) {
					return;
				}
				if (!(serviceRow = createServiceRow(columnsWidth))) {
					return;
				}

				injectServiceRow(serviceRow);
			});

		};
	}
]);
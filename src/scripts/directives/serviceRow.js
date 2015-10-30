angular.module('app').directive('serviceRow', [
	'$timeout', function ($timeout) {
		return function (scope, element, attrs) {

			var serviceRowColumns = null;

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

			var injectServiceRow = function (serviceRow) {
				var tmp;
				if (!(tmp = element.children()).length) return false;
				if (!(tmp = tmp[0])) return false; // need to inject after 1st empty (ui-scroll padding) row
				if (!(tmp = angular.element(tmp))) return false;
				tmp.after(serviceRow);
			};

			var createServiceRow = function (columnsWidth) {
				var serviceRowContents = '';
				for (var i = 0; i < columnsWidth.length; i++) {
					serviceRowContents += '<td style="width:' + columnsWidth[i] + 'px;"></td>';
				}
				var table = angular.element('<table><tr class="serviceRow">' + serviceRowContents + '</tr></table>');

				serviceRowColumns = table.find('td');
				injectServiceRow(table.find('tr'));
			};

			var updateServiceRow = function (columnsWidth) {
				// todo dhilt : thin about dealing with changes of columns number
				for (var i = 0; i < columnsWidth.length; i++) {
					var elt = angular.element(serviceRowColumns[i]);
					elt.css('width', columnsWidth[i].clientWidth + 'px');
				}
			};

			scope.$watch(attrs.serviceRow, function () {
				if (!scope[attrs.serviceRow]) {
					return;
				}

				var columnsWidth;
				if (!(columnsWidth = getColumnsWidth())) {
					return;
				}

				if (!serviceRowColumns) {
					createServiceRow(columnsWidth);
				}
				else {
					updateServiceRow(columnsWidth);
				}

			});

		};
	}
]);
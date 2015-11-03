angular.module('app').directive('serviceRow', [
	'$timeout', function ($timeout) {
		return function (scope, element, attrs) {

			var tHeadRow = null;
			var serviceRow = null;
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
				tHeadRow = getTHeadRow();
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
					serviceRowContents += '<td><div style="width:' + (columnsWidth[i] + 1) + 'px;"></div></td>';
				}
				var table = angular.element('<table><tr class="serviceRow">' + serviceRowContents + '</tr></table>');
				serviceRow = table.find('tr');
				serviceRowColumns = table.find('td');
				injectServiceRow(serviceRow);
			};

			var updateServiceRow = function (columnsWidth) {
				for (var i = 0; i < columnsWidth.length; i++) {
					var elt = angular.element(serviceRowColumns[i]).find('div');
					elt.css('width', (columnsWidth[i] + 1) + 'px');
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

				// the number of columns has been changed
				if(tHeadRow && serviceRow && serviceRowColumns.length !== columnsWidth.length) {
					serviceRow.remove();
					serviceRow = null;
					if (!(columnsWidth = getColumnsWidth())) {
						return;
					}
				}

				if (!serviceRow) {
					createServiceRow(columnsWidth);
				}
				else {
					updateServiceRow(columnsWidth);
				}

			});

		};
	}
]);
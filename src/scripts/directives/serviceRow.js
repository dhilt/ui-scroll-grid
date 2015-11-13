angular.module('app').directive('serviceRow', [
	'$timeout', function($timeout) {
		return function(scope, element, attrs) {
			var clearWidths, columnsNumber, createServiceRow, getColumnsNumber, getTHeadRow, injectServiceRow, serviceRow, serviceRowColumns, tHeadRow, updateWidths;
			tHeadRow = null;
			columnsNumber = null;
			serviceRow = null;
			serviceRowColumns = null;

			getTHeadRow = function() {
				var tmp;
				tmp = void 0;
				if (!(tmp = element.parent())) {
					return;
				}
				if (!(tmp = tmp.children()).length) {
					return;
				}
				if (!(tmp = tmp[0])) {
					return;
				}
				if (!(tmp = tmp.children).length) {
					return;
				}
				if (!(tmp = tmp[0])) {
					return;
				}
				return tmp;
			};

			getColumnsNumber = function() {
				tHeadRow = tHeadRow || getTHeadRow();
				if (!tHeadRow) {
					return;
				}
				return tHeadRow.children.length;
			};

			injectServiceRow = function(serviceRow) {
				var tmp;
				tmp = void 0;
				if (!(tmp = element.children()).length) {
					return;
				}
				if (!(tmp = tmp[0])) {
					return;
				}
				if (!(tmp = angular.element(tmp))) {
					return;
				}
				tmp.after(serviceRow);
				return true;
			};

			createServiceRow = function() {
				var i, serviceRowContents, table;
				serviceRowContents = '';
				i = -1;
				while (++i < columnsNumber) {
					serviceRowContents += '<td><div></div></td>';
				}
				table = angular.element('<table><tr class="serviceRow">' + serviceRowContents + '</tr></table>');
				serviceRow = table.find('tr');
				serviceRowColumns = table.find('td');
				injectServiceRow(serviceRow);
			};

			clearWidths = function() {
				var i, results;
				i = -1;
				results = [];
				while (++i < columnsNumber) {
					results.push(tHeadRow.children[i].children[0].style.width = '');
				}
				return results;
			};

			updateWidths = function() {
				var cssWidth, i, results;
				i = -1;
				results = [];
				while (++i < columnsNumber) {
					cssWidth = serviceRowColumns[i].clientWidth + 'px';
					serviceRowColumns[i].firstChild.style.width = cssWidth;
					results.push(tHeadRow.children[i].children[0].style.width = cssWidth);
				}
				return results;
			};

			scope.$watch(attrs.serviceRow, function() {
				if (!scope[attrs.serviceRow]) {
					return;
				}
				if (!(columnsNumber = getColumnsNumber())) {
					return;
				}
				if (tHeadRow && serviceRow && serviceRowColumns.length !== columnsNumber) {
					clearWidths();
					serviceRow.remove();
					serviceRow = null;
				}
				if (!serviceRow) {
					createServiceRow();
				}
				updateWidths();
			});

		};
	}
]);

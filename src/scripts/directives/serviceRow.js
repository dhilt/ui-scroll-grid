angular.module('app').directive('serviceRow', [
	'$timeout', function ($timeout) {
		return function (scope, element, attrs) {

			var tHeadRow = null;
			var columnsNumber = null;
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

			var getColumnsNumber = function () {
				tHeadRow = tHeadRow || getTHeadRow();
				if (!tHeadRow) {
					return false;
				}
				return tHeadRow.children.length;
			};

			var injectServiceRow = function (serviceRow) {
				var tmp;
				if (!(tmp = element.children()).length) return false;
				if (!(tmp = tmp[0])) return false; // need to inject after 1st empty (ui-scroll padding) row
				if (!(tmp = angular.element(tmp))) return false;
				tmp.after(serviceRow);
			};

			var createServiceRow = function () {
				var serviceRowContents = '';
				for (var i = 0; i < columnsNumber; i++) {
					serviceRowContents += '<td><div></div></td>';
				}
				var table = angular.element('<table><tr class="serviceRow">' + serviceRowContents + '</tr></table>');
				serviceRow = table.find('tr');
				serviceRowColumns = table.find('td');
				injectServiceRow(serviceRow);
				for (i = 0; i < serviceRowColumns.length; i++) {
					serviceRowColumns[i].firstChild.style.width = (serviceRowColumns[i].clientWidth - 1) + 'px';
				}
			};

			var updateServiceRow = function () {
				for (var i = 0; i < columnsNumber; i++) {
					var elt = angular.element(serviceRowColumns[i]);
					elt.find('div').css('width', (serviceRowColumns[i].clientWidth - 1) + 'px');
				}
			};

			scope.$watch(attrs.serviceRow, function () {
				if (!scope[attrs.serviceRow]) {
					return;
				}

				if (!(columnsNumber = getColumnsNumber())) {
					return;
				}

				// the number of columns has been changed
				if (tHeadRow && serviceRow && serviceRowColumns.length !== columnsNumber) {
					serviceRow.remove();
					serviceRow = null;
				}

				if (!serviceRow) {
					createServiceRow();
				}
				else {
					updateServiceRow();
				}

			});

		};
	}
]);
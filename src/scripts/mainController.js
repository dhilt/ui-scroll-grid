angular.module('app').controller('mainController', [
	'$scope', '$log', '$timeout', 'resourceFactory',
	function ($scope, console, $timeout, resource) {


		// columns settings

		$scope.columns = [
			{ code: 'id', name: 'id', sortable: true, visible: true},
			{ code: 'content', name: 'content', sortable: true, visible: true},
			{ code: 'active', name: 'active', sortable: true, visible: true},
			{ code: 'delete', name: 'delete', sortable: false, visible: true}
		];

		$scope.columnsObject = {};
		for(var i = 0; i < $scope.columns.length; i++) {
			$scope.columnsObject[$scope.columns[i].code] = $scope.columns[i];
		};

		$scope.onColumnsChanged = function() {
			$timeout(function() {
				$scope.columnWidthChangeEventObject = {};
			});
		};


		// datasource implementation

		$scope.datasource = {};
		$scope.datasourceAdapter = {};

		$scope.datasource.get = function (index, count, success) {
			resource.list({
				index: index,
				count: count,
				state: $scope.tableState
			}, function (result) {
				success(result);
				processFirstLoad();
			});
		};

		$scope.reload = function () {
			$scope.datasourceAdapter.reload();
		};


		// data manipulation

		var blank = true;
		$scope.callServer = function (tableState) {
			$scope.tableState = tableState;
			if (!blank && $scope.datasourceAdapter.reload)
				$scope.datasourceAdapter.reload();
			blank = false;
		};

		$scope.removeRow = function (row) {
			resource.remove({ id: row.id }, function (result) {
				if (result.id === null) {
					alert('Row#' + row.id + ' was not removed. ' + result.reason)
				}
				else {
					$scope.datasourceAdapter.applyUpdates(function (item, scope) {
							if (item.id == result.id)
								return [];
						}
					);
					$timeout(function () {
						alert('Row#' + result.id + ' was removed.');
					});
				}
			});
		};


		// DOM manipulations

		$scope.showId = true;
		$scope.gridFirstLoad = false;

		var processFirstLoad = function () {
			if (!$scope.gridFirstLoad) {
				$scope.gridFirstLoad = true;
				$timeout(function () {
					$scope.columnWidthChangeEventObject = {};
				});
			}
		};

		$scope.$watch('showId', function (v1, v2) {
			if(v1 === v2) {
				return;
			}
			$timeout(function () {
				$scope.columnWidthChangeEventObject = {};
			});
		});

	}
]);


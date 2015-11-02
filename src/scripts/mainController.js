angular.module('app').controller('mainController', [
	'$scope', '$log', '$timeout', 'resourceFactory', function ($scope, console, $timeout, resource) {
		var datasource = {};
		var blank = true;

		$scope.gridFirstLoad = false;

		datasource.get = function (index, count, success) {

			var processResult = function (result) {
				success(result);

				if (!$scope.gridFirstLoad || $scope.gridReload) {
					$scope.gridFirstLoad = true;
					$scope.gridReload = false;
					$timeout(function () {
						$scope.columnWidthChangeEventObject = {};
					});
				}

			};

			var options = {
				index: index,
				count: count,
				state: $scope.tableState
			};
			resource.list(options, processResult);
		};

		$scope.datasource = datasource;
		$scope.datasourceAdapter = {};
		$scope.adapter = {};

		$scope.reload = function () {
			$scope.gridReload = true;
			$scope.datasourceAdapter.reload();
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

		$scope.callServer = function (tableState) {
			$scope.tableState = tableState;
			if (!blank && $scope.datasourceAdapter.reload)
				$scope.datasourceAdapter.reload();
			blank = false;
		};

	}
]);


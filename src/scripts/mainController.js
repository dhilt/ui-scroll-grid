angular.module('app').controller('mainController', [
	'$scope', '$log', '$timeout', 'resourceFactory',
	function ($scope, console, $timeout, resource) {


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

		$scope.$watch('showId', function () {
			$timeout(function () {
				$scope.columnWidthChangeEventObject = {};
			});
		});

	}
]);


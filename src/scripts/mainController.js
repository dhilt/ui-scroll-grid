angular.module('app').controller('mainController', [
	'$scope', '$log', '$timeout', 'resourceFactory', function ($scope, console, $timeout, resource) {
		var datasource = {};
		var blank = true;
		var dataset = [];
		var i, item;

		$scope.gridFirstLoad = false;

		for (i = 0; i < 1000; i++) {
			item = {};
			item.id = i;
			item.content = "item #" + i;
			item.selected = Math.random() < .5;
			dataset.push(item);
		}

		datasource.get = function (index, count, success) {

			var processResult = function(result) {
				success(result);
			};

			var options = {
				index: index,
				count: count,
				state: $scope.tableState
			};
			resource.list(options, processResult);

			/*$timeout(function () {
				var result = dataset, tempResult, i, len;

				// filtering by id
				if ($scope.tableState.search.predicateObject && $scope.tableState.search.predicateObject.id) {
					result = [];
					for (i = 0, len = dataset.length; i < len; i = ++i) {
						if ((dataset[i].id + '').indexOf($scope.tableState.search.predicateObject.id + '') !== -1) {
							result.push(dataset[i]);
						}
					}
				}

				// sorting
				if ($scope.tableState.sort && $scope.tableState.sort.predicate) {
					result = result.sort(function (a, b) {
						if ($scope.tableState.sort.predicate === 'id') {
							return $scope.tableState.sort.reverse ? a.id - b.id : b.id - a.id;
						}
						if ($scope.tableState.sort.predicate === 'selected') {
							return $scope.tableState.sort.reverse ? a.selected - b.selected : b.selected - a.selected;
						}
					});
				}

				// paging
				tempResult = [];
				for (i = 0, len = result.length; i < len; i = ++i) {
					if (i >= index - 1 && i < index - 1 + count) {
						tempResult.push(result[i]);
					}
				}
				result = tempResult;

				console.log("data source get : index=" + (index - 1) + ", count=" + count);
				success(result);


				if (!$scope.gridFirstLoad || $scope.gridReload) {
					$scope.gridFirstLoad = true;
					$scope.gridReload = false;
					$timeout(function () {
						$scope.columnWidthChangeEventObject = {};
					});
				}

			}, 100);*/
		};

		$scope.datasource = datasource;
		$scope.datasourceAdapter = {};
		$scope.adapter = {};

		$scope.reload = function () {
			$scope.gridReload = true;
			$scope.datasourceAdapter.reload();
		};

		$scope.removeRow = function (row) {
			alert('Remove row#' + row.id + '.\nIt doesn\'t work.');
		};

		$scope.callServer = function (tableState) {
			$scope.tableState = tableState;
			if (!blank && $scope.datasourceAdapter.reload)
				$scope.datasourceAdapter.reload();
			blank = false;
		};

	}
]);


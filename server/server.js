var express = require("express"),
app = express();
app.use('/', express.static('./.temp'));
app.listen(1234);

var dataset = [];

for (var i = 0; i < 60; i++) {
	var item = {};
	item.id = i;
	item.content = "item #" + i;
	item.selected = Math.random() < .5;
	dataset.push(item);
}

app.get('/api', function(req, res){

	var result = dataset, tempResult, i, len;
	var state = req.query.state || {};
	var index = parseInt(req.query.index, 10);
	var count = parseInt(req.query.count, 10);

	// filtering by id
	if (state.search && state.search.predicateObject && state.search.predicateObject.id) {
		result = [];
		for (i = 0, len = dataset.length; i < len; i = ++i) {
			if ((dataset[i].id + '').indexOf(state.search.predicateObject.id + '') !== -1) {
				result.push(dataset[i]);
			}
		}
	}

	// sorting
	if (state.sort && state.sort.predicate) {
		result = result.sort(function (a, b) {
			if (state.sort.predicate === 'id') {
				return state.sort.reverse ? a.id - b.id : b.id - a.id;
			}
			if (state.sort.predicate === 'selected') {
				return state.sort.reverse ? a.selected - b.selected : b.selected - a.selected;
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

	res.json( result );
});

app.delete('/api', function(req, res){
	res.json({ id: req.query.id });
});
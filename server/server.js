var express = require("express"),
app = express();
app.use('/', express.static('./.temp'));
app.listen(1234);
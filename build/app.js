'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./v1/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));

app.use('/', _routes2.default);

app.get('/', function (req, res) {
  res.status(200).send('Welcome to Store Manager!');
});

var port = process.env.PORT || 3000;
/* for testing
if (!module.parent) {
	app.listen(port, () => console.log(`Server running on port ${port}`));
}
*/
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 5000, function () {
    return console.log('Server running on localhost:5000');
  });
}

exports.default = app;
//# sourceMappingURL=app.js.map
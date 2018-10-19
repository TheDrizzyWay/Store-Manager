'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _usercontroller = require('../controllers/usercontroller');

var _usercontroller2 = _interopRequireDefault(_usercontroller);

var _adminvalidator = require('../middleware/adminvalidator');

var _adminvalidator2 = _interopRequireDefault(_adminvalidator);

var _loggedinvalidator = require('../middleware/loggedinvalidator');

var _loggedinvalidator2 = _interopRequireDefault(_loggedinvalidator);

var _userloginvalidator = require('../middleware/userloginvalidator');

var _userloginvalidator2 = _interopRequireDefault(_userloginvalidator);

var _createuservalidator = require('../middleware/createuservalidator');

var _createuservalidator2 = _interopRequireDefault(_createuservalidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/logout', _loggedinvalidator2.default, _usercontroller2.default.logoutUser);
router.get('/', _loggedinvalidator2.default, _adminvalidator2.default, _usercontroller2.default.findAllUsers);
router.get('/:userId', _loggedinvalidator2.default, _adminvalidator2.default, _usercontroller2.default.findUserById);
router.post('/', _loggedinvalidator2.default, _adminvalidator2.default, _createuservalidator2.default, _usercontroller2.default.createUser);
router.post('/login', _userloginvalidator2.default, _usercontroller2.default.loginUser);
router.put('/:userId', _loggedinvalidator2.default, _adminvalidator2.default, _usercontroller2.default.updateUser);
router.delete('/:userId', _loggedinvalidator2.default, _adminvalidator2.default, _usercontroller2.default.deleteUser);

exports.default = router;
//# sourceMappingURL=userroute.js.map
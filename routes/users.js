var express = require('express');
var router = express.Router();
const crudController = require('../controller/crudController')
router.get('/', function (req, res, next) {
  res.send('respond with a users');
});

// For adding user route

router.post('/add_user',crudController.add_user)

// For delete user route
router.post('/delete_user',crudController.delete_user)

// For update_user route
router.post('/update_user',crudController.update_user)

// For get_user route
router.post('/get_user',crudController.get_user)

// For get_user_by_id route
router.post('/get_user_by_id',crudController.get_user_by_id)

// For Login
router.post('/login',crudController.login)

module.exports = router;
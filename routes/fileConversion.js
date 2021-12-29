const express = require('express');
const router = express.Router();
const fileConvertController  = require('../controller/fileConvertController')

/* GET home page. */
router.get('/', fileConvertController.fileConvertController);

module.exports = router;
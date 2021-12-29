const express = require('express');
const router = express.Router();
const fileUploadController = require('../controller/fileUploadController')

/* GET home page. */
router.all('/',fileUploadController.fileupload);

module.exports = router;
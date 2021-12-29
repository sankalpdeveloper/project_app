
exports.fileupload = function (res,req,next) {
    console.log("logger");
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    req.render('fileupload')
}
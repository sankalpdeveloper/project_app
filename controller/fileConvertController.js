const convertExcel = require('../Utils/convertExcel')
var pdf2json = require("form-pdf2json");
const pdfGen = require('../Utils/pdfGenerator').pdfExport

exports.fileConvertController = function (req, res, next) {
    console.log("Query",req.query);
    let demo = 'fq'
    if (req.query.download === "pdf") {
        demo=0
        try {
            const pdfFile = pdfGen()
            console.log("PDF",pdfFile);
            res.send(`<a href=http://localhost:4000/${pdfFile}>Click Here</a>`)                 
        } catch (error) {
            console.log(error);
        }
    }
    if (req.query.download === "xlsx") {
        demo = 0
        let path = `${convertExcel()}`
        res.send(`<a href=${path}>Link</a>`)
    } 
    if(demo){
        res.render('fileConversion');
    }
    
}
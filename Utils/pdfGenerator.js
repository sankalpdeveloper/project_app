const randomstring = require("randomstring");
const data = require('../data/data');
const fs = require('fs')
const path = require('path')
const pdf = require('html-pdf');

exports.pdfExport = ()=>{
    const randomString = randomstring.generate()
    console.log(randomString);
    let htmldata = []
    data.data.forEach(element => {
    try {
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const element1 = element[key];
                htmldata.push(`<p>${element1}</p>`)
            }
        }
        htmldata.push('</br>')

    } catch (error) {
        console.log(error);
    }
});
    let reqPath = path.join(__dirname, '../')
    const fileName = fs.writeFile(reqPath+`public/download/${randomString}.html`,htmldata.toString().replace(/[,]/g,''),(err)=>{
        console.log(err);
        var html = fs.readFileSync(`${reqPath}public/download/${randomString}.html`, 'utf8')
        // ,(err)=>{
            var options = { format: 'Letter' };
            // console.log(err);
            pdf.create(html, options).toFile(`${reqPath}/public/download/${randomString}.pdf`, function(err,resp) {
            if (err) return console.log(err);
            console.log("Resp",resp);
        });
    })
    return `download/${randomString}.pdf`

}
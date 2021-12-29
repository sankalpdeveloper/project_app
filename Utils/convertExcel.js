const data = require('../data/data');
const fs = require('fs')
const json2xls = require('json2xls');
const randomstring = require("randomstring");

module.exports = () => {
    let dataXls = data.data;
    let jsonArray = []
    dataXls.forEach(function (instance, index, record) {
        var tempArray = {
            "_id": record[index]._id,
            "salary": record[index].salary,
            "leaves": record[index].leaves,
            "name": record[index].name,
            "gender": record[index].gender,
            "email": record[index].email

        }
        jsonArray.push(tempArray)
    })
    var xls = json2xls(jsonArray);
    let randomStr = `${randomstring.generate()}.xlsx`
    fs.writeFileSync(`./public/download/${randomStr}`, xls, 'binary');
    return `/download/${randomStr}`

}
const bcrypt = require('bcrypt')
const Users = require('../models/users')
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const saltString = process.env.SALT_KEY


exports.add_user = async (res, req, next) => {
    const username =  res.body.data.fname+ res.body.data.lname+"random123"
    res.body.data.username = username
    res.body.data.password = await bcrypt.hash(res.body.data.password, saltString);
    Users.find({ username: res.body.data.username }, function (err, result) {
        if (result.length <= 0) {
            // console.log("run1")
            const new_user = new Users(res.body.data)
            new_user.save(function (err1, result) {
                if (err1) {
                    // console.log(err1);
                }
                else {
                    // console.log(result);
                    return req.json({ status: 200, message: "User created successfully." })
                }
            }
            )
        }
        if (result.length > 0) {
            // console.log("run2")
            // console.log("Result", result)
            return req.json({ status: 401, message: "User already exist" })
        }

    }
    )
}

exports.delete_user = async (res, req, next) => {
    console.log(res.body.data);
    Users.deleteOne(res.body.data, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result)
            req.json({ status: 200, message: "User deleted successfully." })
        }
    })
}

exports.update_user = async (res, req, next) => {
    console.log(res.body.data);
    Users.find(res.body.data,function(err,result){
        console.log(result);
    })
    Users.updateOne({ username: res.body.data.username }, { username: res.body.data.updated }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result)

            req.json({ status: 200, message: "User updated successfully." })
        }
    })
}

exports.get_user = async (res, req, next) => {
    const limit = res.body.data.limit
    const skip = ((res.body.data.page * res.body.data.limit) - res.body.data.limit)
    console.log(skip, limit)
    console.log(res.body.data.username);
    if (res.body.data.username === '') {
        Users.find(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(result)
                console.log(result.length)
                req.json({ status: 200, message: result })
            }
        }).skip(skip).limit(limit)
    } else {
        Users.find(res.body.data, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result)
                req.json({ status: 200, message: result })
            }
        }).skip(skip).limit(limit)
    }
}

exports.get_user_by_id = async (res, req, next) => {
    console.log(res.body.data);
    let data12 = res.body.data._id
    Users.findById(data12, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result)
            req.json({ status: 200, message: result })
        }
    })
}

exports.login = async (res, req, next) => {
    // let jwtSecretKey = process.env.JWT_SECRET_KEY
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    // console.log(jwtSec);

    console.log(res.body.data);
    let data = {username: res.body.data.username}
    Users.find(data, async (err, result) => {
        if (err) {
            console.log(err); 
        }
        else {
            console.log("Result>>>>>>>>>>",result[0]) 
            if(result[0] === undefined){
                req.json({ status: 200, message: "User not Found" })
            }
            else{
                const isSame = await bcrypt.compare(res.body.data.password,result[0].password)
                if(isSame){
                    let signObj = {
                        username : result[0].username,
                        fname : result[0].fname,
                        lname : result[0].lname,
                        usertype:result[0].hosttype
                    }
                    console.log(signObj);
                    const token = jwt.sign(signObj, jwtSecretKey)
                    req.json({ status: 200, message: token })
                }
                else{
                    req.json({ status: 200, message: "password not match" })
                }
                
            }
        }
    })
}
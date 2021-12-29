//Require Mongoose
const mongoose = require('mongoose');


//Define a schema
const Schema = mongoose.Schema;

const usersSchema = mongoose.Schema({
    username: {
        type: String,
        // required :true
    },
    email: {
        type: String,
        // required :true
    },
    password: {
        type: String,
        // required :true
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    address: {
        type: String
    },
    phone_number: {
        type: String
    },
    token: {
        type: String
    },
    hosttype: {
        type: String
    }
});

// Compile model from schema
module.exports = mongoose.model('Users', usersSchema)

//Require Mongoose
const mongoose = require('mongoose');


//Define a schema
const Schema = mongoose.Schema;

const ConvertAPI = mongoose.Schema({
    identifyString: {
        type: String,
        required :true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
   
    
});

// Compile model from schema
module.exports = mongoose.model('ConvertAPI', ConvertAPI)

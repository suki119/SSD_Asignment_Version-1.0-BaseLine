const mongoose = require('mongoose');

const reciptSchema = new mongoose.Schema({

    reciptNumber :{
        type: String,
        required : true,
        trim:true
    },
    invoiceID :{
        type: String,
        required : true,
        trim:true
    },
    accountName :{
        type: String,
        required : true,
        trim:true
    },
    productName :{
        type: String,
        required : true,
        trim:true
    },
    
  
   

},{timestamps:true});


const recipt = mongoose.model('recipt',reciptSchema);

module.exports = recipt;
const mongoose = require('mongoose');

const jobCardSchema = new mongoose.Schema({

    accountID :{
        type: String,
        required : true,
        trim:true
    },
    productId :{
        type: String,
        required : true,
        trim:true
    },
    dueDate: {
        type: String,
        required : true,
        trim:true
    },
    jobStatus: {
        type: String,
        required : true,
        trim:true
    },
    productPrice: {
        type: String,
        required : true,
        trim:true
    },
    discount: {
        type: String,
        required : true,
        trim:true
    },
   

},{timestamps:true});


const jobCard = mongoose.model('jobCard',jobCardSchema);

module.exports = jobCard;
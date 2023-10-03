const mongoose = require('mongoose');

const payReminderSchema = new mongoose.Schema({

    toEmail :{
        type: String,
        required : true,
        trim:true
    },
    invoiceNo :{
        type: String,
        required : true,
        trim:true
    },
    companyName: {
        type: String,
        required : true,
        trim:true
    },
    productName: {
        type: String,
        required : true,
        trim:true
    },
    invoiceDate: {
        type: String,
        required : true,
        trim:true
    },
    inTotalAmount: {
        type: String,
        required : true,
        trim:true
    },
    dueAmount: {
        type: String,
        required : true,
        trim:true
    },
    dueDays: {
        type: String,
        required : true,
        trim:true
    },
    revision: {
        type: String,
        required : true,
        trim:true
    },
    accountId: {
        type: String,
        required : true,
        trim:true
    },
    invoiceId: {
        type: String,
        required : true,
        trim:true
    },
   

},{timestamps:true});


const payReminder = mongoose.model('payReminder',payReminderSchema);

module.exports = payReminder;
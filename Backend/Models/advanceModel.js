const mongoose = require('mongoose');

const advanceSchema = new mongoose.Schema({

 
    accountID: {
        type: String,
        required: true,
        trim: true
    },
    accountName: {
        type: String,
        required: true,
        trim: true
    },
    productID: {
        type: String,
        required: true,
        trim: true
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    adavanceAmount: {
        type: String,
        required: true,
        trim: true
    },
    remark: {
        type: String,
        required: false,
        trim: true
    },
    settleStatus: {
        type: String,
        required: true,
        trim: true
    },
    paymentCategory: {
        type: String,
        required: true,
        trim: true
    },
    

    


}, { timestamps: true });


const advance = mongoose.model('advance', advanceSchema);

module.exports = advance;
const mongoose = require('mongoose');

const quotationaSchem = new mongoose.Schema({

    quotationaNumber: {
        type: String,
        required: true,
        trim: true
    },
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
    invoiceStatus: {
        type: String,
        required: true,
        trim: true
    },
    draftstatus: {
        type: String,
        required: false,
        trim: true
    },
    totalAmount : {
        type: Number,
        required: true,
        trim: true
    },
    discount : {
        type: Number,
        required: false,
        trim: true
    },
    advance : {
        type: Number,
        required: false,
        trim: true
    },
    
    subTotal : {
        type: Number,
        required: false,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    accountAddress: {
        type: String,
        required: true,
        trim: true
    },
    productDetails: [{
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
        productqty: {
            type: String,
            required: true,
            trim: true
        },
        productamount: {
            type: String,
            required: true,
            trim: true
        },
        producttotalamount: {
            type: String,
            required: true,
            trim: true
        },
        productDiscount: {
            type: String,
            required: true,
            trim: false
        },
         productOtherDes: {
            type: String,
            required: false,
            trim: false
        },
        advance: {
            type: String,
            required: false,
            trim: false
        },







    }]



}, { timestamps: true });


const invoice = mongoose.model('quotation', quotationaSchem);

module.exports = invoice;
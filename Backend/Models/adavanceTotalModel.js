const mongoose = require('mongoose');

const advanceTotSchema = new mongoose.Schema({

    accountID: {
        type: String,
        required: true,
        trim: true
    },
 
    productID: {
        type: String,
        required: true,
        trim: true
    },
    adavanceTotAmount: {
        type: String,
        required: true,
        trim: true
    },
    settleStatus: {
        type: String,
        required: true,
        trim: true
    },
   

},{timestamps:true});


const AdavanceTot = mongoose.model('AdavanceTot',advanceTotSchema);

module.exports = AdavanceTot;
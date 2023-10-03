const mongoose = require('mongoose');

const bagageSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
        trim: true
    },
    accountName: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    bagageID: {
        type: String,
        required: true,
        trim: true
    },

    serialNumber: {
        type: String,
        required: false,
        trim: true
    },
    companyId: {
        type: String,
        required: false,
        trim: true
    },

    CloudinaryImg: [
        {
            cloudinary_id: {
                type: String,
                required: false,
                trim: true
            },
            url: {
                type: String,
                required: false,
                trim: true
            }
        }]


}, { timestamps: true });


const bagage = mongoose.model('bagage', bagageSchema);

module.exports = bagage;
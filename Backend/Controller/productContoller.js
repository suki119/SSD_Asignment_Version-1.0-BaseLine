const Product = require('../Models/productModel');



//adding account details
const addproductDetails = async (req, res) => {

    let newData = new Product(req.body);


    //    const { ProductName ,Address , EmailAddress , PhoneNumber ,UserName } = req.body;

    const data = req.body

    try {

        newData.save((err) => {
            if (err) {
                return res.status(400).json({
                    message: err
                });
            }
            return res.status(200).json({
                message: "data added succsesfull"
            });
        });

    } catch (err) {

        return res.status(400).json({
            messages: err
        });

    }
}


//get all acount details
const getallProductDetails = async (req, res) => {
    try {
        const ProductData = await Product.find().sort({"createdAt":-1});
        return res.status(200).send({
            data: ProductData
        });

    } catch (err) {

        return res.status(500).send({
            message: err
        })

    }
}


//get by id
const getProductById = async (req, res) => {
    try {

        const { id } = req.body
        const data = await Product.findById(id);
        if (data) {
            return res.status(200).send({
                data: data
            });
        } else {
            return res.status(200).send({
                data: ''
            });
        }

    } catch (err) {
        return res.status(400).send({
            message: 'Technical Error',
            error: err
        });
    }
}

//update details
const updateProductDetails = async (req, res) => {
    try {


        const id = req.params.id;
        Product.findByIdAndUpdate(id, {
            $set: req.body
        }, (err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                message: "updated successfully!",
                status:2100
            });

        })

    } catch (err) {

        return res.status(500).send({
            message: err
        })

    }
}

//delete Account
const deleteProductDetails = async (req, res) => {
    try {

        Product.findByIdAndRemove(req.params.id).exec((err, deletedProduct) => {


            if (err) {
                return res.status(400).json({
                    message: "delete unsuccessful", deletedProduct
                });
            }
            return res.status(200).json({
                success: "Submission removed successful", deletedProduct
            });
        });

    } catch (err) {
        return res.status(500).send({
            message: err
        })

    }

};

//Product find by name
const getProductByName = async (req, res) => {
    try {

        const { productName } = req.body;
        const data = await Product.findOne({ productName: productName });
        if (data) {

            return res.status(200).json({
                message: "data found", data,
                status : 2100
            });
        }else{
            
            return res.status(200).json({
                message: "No Data found", data
            });
        }

    } catch(err) {

        return res.status(400).json({
            message:err
        });
    }
}

//Product find by account ID
const getAllProductsByAccountID = async (req, res) => {
    try {

        const { accountID } = req.body;
        const data = await Product.find({ accountID: accountID });
        if (data) {

            return res.status(200).json({
                message: "data found", data,
                status:2100
            });
        }else{
            
            return res.status(200).json({
                message: "No Data found", data
            });
        }

    } catch(err) {

        return res.status(400).json({
            message:err
        });
    }
}



module.exports = {
    addproductDetails,
    getallProductDetails,
    updateProductDetails,
    deleteProductDetails,
    getProductById,
    getProductByName,
    getAllProductsByAccountID
}
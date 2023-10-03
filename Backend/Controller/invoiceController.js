const Invoice = require('../Models/invoiceModel');




//adding account details
const addInvoice = async (req,res) => {
    
    let newData = new Invoice(req.body);

   
//    const { ProductName ,Address , EmailAddress , PhoneNumber ,UserName } = req.body;
  
   

    try{

        newData.save((err)=>{
            if(err){
                return res.status(400).json({
                    message:err
                });
            }
            return res.status(200).json({
                message:"data added succsesfull",
                status:2100,
                newData
            });
        });

    }catch(err){

        return res.status(400).json({
            messages:err
        });

    }
}





//get all invoice details
const getallInvoiceDetails =  async (req,res) => {
    try{
        const InvoiceData = await Invoice.find().sort({"createdAt":-1});
        return res.status(200).send({
            data:InvoiceData,
            status:2100
        });

    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}


// //get all invoice details
// const getallInvoiceDetails =  async (req,res) => {
//     try{
//         const InvoiceData = await Invoice.find();
//         return res.status(200).send({
//             data:InvoiceData,
//             status:2100
//         });

//     }catch(err){

//         return res.status(500).send({
//             message:err
//         })

//     }
// }

//update details
const updateInvoiceDetails =  async (req,res) => {
    try{

        
        const id = req.params.id;
        Invoice.findByIdAndUpdate(id,{
            $set : req.body
        },(err) => {
            if(err){
                return res.status(400).json({
                    error: err,
                    status:2200
                });
            }
            return res.status(200).json({
                message: "updated successfully!",
                status:2100
            });

        })
       
    }catch(err){

        return res.status(500).send({
            message:err,
            status:2300
        })

    }
}

//delete Account
const deleteInvoiceByID = async (req, res) => {
    try{

        Invoice.findByIdAndRemove(req.params.id).exec((err, deletedAccount) => {

      
            if (err) {
                return res.status(400).json({
                    message: "delete unsuccessful", deletedAccount
                  
                });
            }
            return res.status(200).json({
                success: "Submission removed successful", deletedAccount,
                status:2100
            });
        });

    }catch(err){
        return res.status(500).send({
            message:err
        })

    }
    
};


const getInvoiceByAccName = async (req, res) => {
    try {

        const { accountName } = req.body;
        const data = await Invoice.find({ accountName: accountName });
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



const getInvoiceListByAccId = async (req, res) => {
    try {

        const { accountId } = req.body;
        const data = await Invoice.find({ "accountID": accountId }).sort({"createdAt":-1});
        if (data) {

            return res.status(200).json({
                message: "data found", data,
                status : 2100
            });
        }else{
            
            return res.status(200).json({
                message: "No Data found", data,
                status : 2200
            });
        }

    } catch(err) {

        return res.status(400).json({
            message:err,
            status : 2300
        });
    }
}


const getInvoiceByID =  async (req,res) => {
    try{
        const id = req.params.id;
        const invoiceData = await Invoice.findById(id);
        return res.status(200).send({
            data:invoiceData,
            status:2100
        });

    }catch(err){

        return res.status(500).send({
            message:err,
            status:2300
        })

    }
}



module.exports = {
    addInvoice,
    getallInvoiceDetails,
    updateInvoiceDetails,
    getInvoiceByAccName,
    deleteInvoiceByID,
    getInvoiceListByAccId,
    getInvoiceByID

   
   
}
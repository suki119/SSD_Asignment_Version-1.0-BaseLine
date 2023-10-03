const PayReminder = require('../Models/payReminderModel');




//adding account details
const addPayReminder = async (req,res) => {
    
    let newData = new PayReminder(req.body);

   
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





//get all PayReminder details
const getallPayReminderDetails =  async (req,res) => {
    try{
        const PayReminderData = await PayReminder.find().sort({"createdAt":-1});
        return res.status(200).send({
            data:PayReminderData,
            status:2100
        });

    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}


// //get all PayReminder details
// const getallPayReminderDetails =  async (req,res) => {
//     try{
//         const PayReminderData = await PayReminder.find();
//         return res.status(200).send({
//             data:PayReminderData,
//             status:2100
//         });

//     }catch(err){

//         return res.status(500).send({
//             message:err
//         })

//     }
// }

//update details
const updatePayReminderDetails =  async (req,res) => {
    try{

        
        const id = req.params.id;
        PayReminder.findByIdAndUpdate(id,{
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
const deletePayReminderByID = async (req, res) => {
    try{

        PayReminder.findByIdAndRemove(req.params.id).exec((err, deletedAccount) => {

      
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


const getPayReminderByInvoiceNo = async (req, res) => {
    try {

        const { invoiceNo } = req.body;
        const data = await PayReminder.find({ invoiceNo: invoiceNo });
        if (data.length > 0) {

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



const getPayReminderListByAccId = async (req, res) => {
    try {

        const { accountId } = req.body;
        const data = await PayReminder.find({ "accountID": accountId }).sort({"createdAt":-1});
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


const getPayReminderByID =  async (req,res) => {
    try{
        const id = req.params.id;
        const PayReminderData = await PayReminder.findById(id);
        return res.status(200).send({
            data:PayReminderData,
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
    addPayReminder,
    getallPayReminderDetails,
    updatePayReminderDetails,
    getPayReminderByInvoiceNo,
    deletePayReminderByID,
    getPayReminderListByAccId,
    getPayReminderByID

   
   
}
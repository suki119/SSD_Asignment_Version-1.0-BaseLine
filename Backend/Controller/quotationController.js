const Quotation = require('../Models/quotationModel');




//adding account details
const addQuotation = async (req,res) => {
    
    let newData = new Quotation(req.body);

   
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





//get all Quotation details
const getallQuotationDetails =  async (req,res) => {
    try{
        const QuotationData = await Quotation.find().sort({"createdAt":-1});
        return res.status(200).send({
            data:QuotationData,
            status:2100
        });

    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}


// //get all Quotation details
// const getallQuotationDetails =  async (req,res) => {
//     try{
//         const QuotationData = await Quotation.find();
//         return res.status(200).send({
//             data:QuotationData,
//             status:2100
//         });

//     }catch(err){

//         return res.status(500).send({
//             message:err
//         })

//     }
// }

//update details
const updateQuotationDetails =  async (req,res) => {
    try{

        
        const id = req.params.id;
        Quotation.findByIdAndUpdate(id,{
            $set : req.body
        },(err) => {
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                message: "updated successfully!"
            });

        })
       
    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}

//delete Account
const deleteQuotationByID = async (req, res) => {
    try{

        Quotation.findByIdAndRemove(req.params.id).exec((err, deletedAccount) => {

      
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


const getQuotationByAccName = async (req, res) => {
    try {

        const { accountName } = req.body;
        const data = await Quotation.find({ accountName: accountName });
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



module.exports = {
    addQuotation,
    getallQuotationDetails,
    updateQuotationDetails,
    getQuotationByAccName,
    deleteQuotationByID

   
   
}
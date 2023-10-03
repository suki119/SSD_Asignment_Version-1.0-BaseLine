const Advance = require('../Models/advanceModel');




//adding account details
const addAdvance = async (req,res) => {
    
    let newData = new Advance(req.body);

   
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
                status:2100
            });
        });

    }catch(err){

        return res.status(400).json({
            messages:err
        });

    }
}





//get all Advance details
const getallAdvanceDetails =  async (req,res) => {
    try{
        const AdvanceData = await Advance.find().sort({"createdAt":-1});
        return res.status(200).send({
            data:AdvanceData,
            status:2100
        });

    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}

//update details
const updateAdvanceDetails =  async (req,res) => {
    try{

        
        const id = req.params.id;
        Advance.findByIdAndUpdate(id,{
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


//advance find by Account Name , Product
const getaAdvanceAmountByAccAndProd = async (req, res) => {
    try {

        const { accountID , productID ,settleStatus} = req.body;
        const data = await Advance.find({ accountID: accountID , productID : productID  });
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



// //delete Account
// const deleteAccountDetails = async (req, res) => {
//     try{

//         account.findByIdAndRemove(req.params.id).exec((err, deletedAccount) => {

      
//             if (err) {
//                 return res.status(400).json({
//                     message: "delete unsuccessful", deletedAccount
//                 });
//             }
//             return res.status(200).json({
//                 success: "Submission removed successful", deletedAccount
//             });
//         });

//     }catch(err){
//         return res.status(500).send({
//             message:err
//         })

//     }
    
// };



module.exports = {
    addAdvance,
    getallAdvanceDetails,
    updateAdvanceDetails,
    getaAdvanceAmountByAccAndProd

   
   
}
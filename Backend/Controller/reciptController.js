const Recipt = require('../Models/reciptModel');



//adding recipt details
const addreciptDetails = async (req,res) => {
    
    let newData = new Recipt(req.body);

   
//    const { ProductName ,Address , EmailAddress , PhoneNumber ,UserName } = req.body;
  
    const data = req.body

    try{

        newData.save((err)=>{
            if(err){
                return res.status(400).json({
                    message:err
                });
            }
            return res.status(200).json({
                message:"data added succsesfull"
            });
        });

    }catch(err){

        return res.status(400).json({
            messages:err
        });

    }
}


//get all acount details
const getallReciptDetails =  async (req,res) => {
    try{
        const ReciptData = await Recipt.find();
        return res.status(200).send({
            data:ReciptData
        });

    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}

// //update details
// const updateProductDetails =  async (req,res) => {
//     try{

        
//         const id = req.params.id;
//         Product.findByIdAndUpdate(id,{
//             $set : req.body
//         },(err) => {
//             if(err){
//                 return res.status(400).json({
//                     error: err
//                 });
//             }
//             return res.status(200).json({
//                 message: "updated successfully!"
//             });

//         })
       
//     }catch(err){

//         return res.status(500).send({
//             message:err
//         })

//     }
// }

// //delete Account
// const deleteProductDetails = async (req, res) => {
//     try{

//         Product.findByIdAndRemove(req.params.id).exec((err, deletedProduct) => {

      
//             if (err) {
//                 return res.status(400).json({
//                     message: "delete unsuccessful", deletedProduct
//                 });
//             }
//             return res.status(200).json({
//                 success: "Submission removed successful", deletedProduct
//             });
//         });

//     }catch(err){
//         return res.status(500).send({
//             message:err
//         })

//     }
    
// };



module.exports = {
    addreciptDetails,
    getallReciptDetails,
//    updateProductDetails,
//     deleteProductDetails
}
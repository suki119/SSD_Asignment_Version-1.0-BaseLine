const draftInvoice = require('../Models/draftInvoiceModel');
const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://sliitproject237:12345@cluster0.xonccjj.mongodb.net/colorationdatabase?retryWrites=true&w=majority&appName=AtlasApp';


//adding account details
const addDraftInvoiceData = async (req,res) => {
    
    let newData = new draftInvoice(req.body);

   
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




//get all invoice details
const getallDraftInvoiceDetails =  async (req,res) => {
    try{
        const InvoiceData = await draftInvoice.find();
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

//update details
const updateDraftInvoiceDetails =  async (req,res) => {
    try{

        
        const id = req.params.id;
        draftInvoice.findByIdAndUpdate(id,{
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

//draft find by Account Name , Product
const getDraftInvoiceByAccAndPro = async (req, res) => {
    const url = 'mongodb+srv://sliitproject237:12345@cluster0.xonccjj.mongodb.net/colorationdatabase?retryWrites=true&w=majority&appName=AtlasApp';
    try {
        const { accountID } = req.body;
        const query = {
            accountID: accountID.toString(),
            
        };
    
        MongoClient.connect(url, (err, client) => {
            if (err) {
                console.error('Error connecting to MongoDB:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            const db = client.db(); // Get the database object
    
            db.collection('draftInvoices')
                .find(query)
                .toArray((err, docs) => {
                    client.close(); // Close the MongoDB connection
    
                    if (err) {
                        console.error('Error executing MongoDB query:', err);
                        return res.status(500).json({ error: 'Internal Server Erro   r' });
                    }
    
                    if (docs.length === 0) {
                        return res.status(404).json({ message: 'No data found' });
                    }
    
                    // Send the found users back as a JSON response
                    return res.status(200).json({ users: docs });
                });
        });


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
    addDraftInvoiceData,
    getallDraftInvoiceDetails,
    updateDraftInvoiceDetails,
    getDraftInvoiceByAccAndPro
}
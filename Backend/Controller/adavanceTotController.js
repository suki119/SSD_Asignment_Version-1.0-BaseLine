const AdvanceTotModel = require('../Models/adavanceTotalModel');
const Advance = require('../Models/advanceModel');




//adding account details
const addAdvanceTot = async (req, res) => {

    let newData = new AdvanceTotModel(req.body);

    try {


        const { accountID, productID, settleStatus, adavanceTotAmount } = req.body;

        const data = await AdvanceTotModel.findOne({ accountID: accountID, productID: productID, settleStatus: settleStatus });

        if (data) {

            const id = data._id;

            let reqNumber = (adavanceTotAmount).split(",");
            let reqJoinedNumber = reqNumber.join('');

            let number = (data.adavanceTotAmount).split(",");
            let joinedNumber = number.join('');

            let totoal = Number(joinedNumber) + Number(reqJoinedNumber);
            let num = (Number(totoal)).toLocaleString('en-US')


            AdvanceTotModel.findByIdAndUpdate(id, {
                adavanceTotAmount: num
            }, (err) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                }
                return res.status(200).json({
                    message: "updated successfully!",
                    status: 2100
                });

            })


        } else {

            newData.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    });
                }
                return res.status(200).json({
                    message: "data added succsesfull",
                    status: 2100
                });
            });
        }



    } catch (err) {

        return res.status(400).json({
            messages: err
        });

    }
}





//get all AdvanceTotModel details
const getallAdvanceTotDetails = async (req, res) => {
    try {
        const AdvanceData = await AdvanceTotModel.find().sort({"createdAt":-1});
        return res.status(200).send({
            data: AdvanceData,
            status: 2100
        });

    } catch (err) {

        return res.status(500).send({
            message: err
        })

    }
}

//update details
const updateAdvanceTotDetails = async (req, res) => {
    try {

        

        const id = req.params.id;
        AdvanceTotModel.findByIdAndUpdate(id, {
            $set: req.body
        }, (err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            



            return res.status(200).json({
                message: "updated successfully!",
                status: 2100
            });

        })

    } catch (err) {

        return res.status(500).send({
            message: err
        })

    }
}


//advance find by Account Name , Product
const getaAdvanceTotAmountByAccAndProd = async (req, res) => {
    try {

        const { accountID, productID, settleStatus } = req.body;
        const data = await AdvanceTotModel.findOne({ accountID: accountID, productID: productID, settleStatus: settleStatus });
        if (data) {

            return res.status(200).json({
                message: "data found", data,
                status: 2100
            });
        } else {

            return res.status(200).json({
                message: "No Data found", data,
                status: 2100
            });
        }

    } catch (err) {

        return res.status(400).json({
            message: err
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
    addAdvanceTot,
    getaAdvanceTotAmountByAccAndProd,
    updateAdvanceTotDetails,
    getallAdvanceTotDetails



}
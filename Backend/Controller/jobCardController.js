const JobCard = require('../Models/jobcardModel');



//adding job details
const addJobetails = async (req, res) => {

    let newData = new JobCard(req.body);


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


//get all Job details
const getallJobCardDetails = async (req, res) => {
    try {
        const BagagetData = await JobCard.find();
        return res.status(200).send({
            data: BagagetData
        });

    } catch (err) {

        return res.status(500).send({
            message: err
        })

    }
}

//update details
const updateJobDetails = async (req, res) => {
    try {


        const id = req.params.id;
        JobCard.findByIdAndUpdate(id, {
            $set: req.body
        }, (err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                message: "updated successfully!"
            });

        })

    } catch (err) {

        return res.status(500).send({
            message: err
        })

    }
}

//delete JobCaard
const deleteJobCardDetails = async (req, res) => {
    try {

        JobCard.findByIdAndRemove(req.params.id).exec((err, deletedJobCard) => {


            if (err) {
                return res.status(400).json({
                    message: "delete unsuccessful", deletedJobCard
                });
            }
            return res.status(200).json({
                success: "Submission removed successful", deletedJobCard
            });
        });

    } catch (err) {
        return res.status(500).send({
            message: err
        })

    }

};



module.exports = {
    addJobetails,
    getallJobCardDetails,
    updateJobDetails,
    deleteJobCardDetails
}
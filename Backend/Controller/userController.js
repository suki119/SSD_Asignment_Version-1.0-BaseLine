const User = require('../Models/usersModel');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');


//adding user details
const addUserData = async (req, res) => {

    let newData = new User(req.body);




    const data = req.body

    try {

        newData.save((err) => {
            if (err) {
                return res.status(400).json({
                    message: err
                });
            }
            return res.status(200).json({
                status: '2100',
                message: "data added succsesfull",

            });
        });

    } catch (err) {

        return res.status(400).json({
            messages: err
        });

    }
}





//draft find by Account Name , Product
const loginUserByPassword = async (req, res) => {
    const url = 'mongodb+srv://sliitproject237:12345@cluster0.xonccjj.mongodb.net/colorationdatabase?retryWrites=true&w=majority&appName=AtlasApp';
    try {
        const { emailAddress, userPassword } = req.body;

        const query = {
            emailAddress: emailAddress.toString(),

        };

        MongoClient.connect(url, (err, client) => {
            if (err) {

                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const db = client.db(); // Get the database object

            db.collection('users')
                .find(query)
                .toArray(async (err, users) => {
                    client.close(); // Close the MongoDB connection

                    if (err) {

                        return res.status(500).json({ error: 'Internal Server Erro   r' });
                    }

                    if (users.length === 0) {
                        return res.status(404).json({ message: 'No data found' });
                    } else {

                        // Compare the entered password with the stored hashed password
                        const passwordMatch = await bcrypt.compare(userPassword, users[0].userPassword);


                        if (passwordMatch) {
                            // Passwords match, user is authenticated
                            return res.status(200).json({ message: 'Login successful', status: true });
                        } else {
                            // Passwords do not match
                            return res.status(401).json({ message: 'Login failed', status: false });
                        }
                    }



                });
        });


    } catch (err) {

        return res.status(400).json({
            message: err
        });
    }
}



module.exports = {
    loginUserByPassword,
    addUserData
}
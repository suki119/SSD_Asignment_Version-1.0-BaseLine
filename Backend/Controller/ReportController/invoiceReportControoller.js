const INVOICE_TEMPLATE = require("../../Reports/InvoiceReport");
const PDF = require('html-pdf');
const path = require('path');


const postInvoiceDetails = async (req, res) => {
    // Generate the PDF file
    const pdf = PDF.create(INVOICE_TEMPLATE(req.body), {});

    // Stream the PDF file as the response
    pdf.toStream((err, stream) => {
        if (err) {
            res.status(500).send('Error generating PDF');
        } else {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');
            stream.pipe(res);
        }
    });
};




const getInvoiceDetails = async (req, res) => {
    // Provide the Google Drive link to the PDF file
    const googleDriveLink = 'https://drive.google.com/file/d/1OqQDIhdGX-amWxqYjLYConobtKT8yntd/view?usp=sharing'; // Replace with the actual link to your PDF file on Google Drive
    res.send({ link: googleDriveLink });
};

module.exports = {
    postInvoiceDetails,
    getInvoiceDetails
};



// const postInvoiceDetails = async (req, res) => {

//     PDF.create(INVOICE_TEMPLATE(req.body), {}).toFile('invoice.pdf', (err) => {
//         if (err) {
//             res.send(Promise.reject());
//         }
//         res.send(Promise.resolve());
//     })


// }

// const getInvoiceDetails = async (req, res) => {

//     //res.sendFile(`/Colouration_Yashoda/Coloration/Backend/invoice.pdf`)
//     // res.sendFile(`/Coloration_Software/Coloration-main/Coloration/Backend/invoice.pdf`)
//     const path = process.cwd() + '/invoice.pdf';
//     res.sendFile(path);
// }

// module.exports = {
//     postInvoiceDetails,
//     getInvoiceDetails
// }
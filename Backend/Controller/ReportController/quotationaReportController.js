// const QUOTATION_TEMPLATE = require("../../Reports/QuotationaReports");
// const PDF = require('html-pdf');
// const path = require('path');
// const savePath = path.join(__dirname, 'invoice.pdf');
// const fs = require('fs');


// const postQuotationReportData = async (req, res) => {

//     PDF.create(QUOTATION_TEMPLATE(req.body), {}).toFile(savePath, (err) => {
//         if (err) {
//             res.send(Promise.reject());
//         }
//         res.send(Promise.resolve());
//     })


// }

// const postQuotationReportData = async (req, res) => {
//     // const { text } = req.body;
//     // const pdfBuffer = await PDF.create(QUOTATION_TEMPLATE(req.body), {}).toBuffer();
//     // return res.send(pdfBuffer);

//     PDF.create(QUOTATION_TEMPLATE(req.body), {}).toFile(savePath, (err) => {
//                 if (err) {

//                 }
//             })

//     const workingDirectory = __dirname;

//     console.log("The working directory is: " + workingDirectory);
//     return res.status(200).json({
//         status:'2100',
//         message:savePath,
//         name:workingDirectory
//     });
// };

// const postQuotationReportData = async (req, res) => {
//     // Assuming PDF is a module or library used to create PDF files

//     try {
//         // Assuming QUOTATION_TEMPLATE is a function that generates the PDF content based on req.body
//         const pdf = PDF.create(QUOTATION_TEMPLATE(req.body), {});

//         // Assuming savePath is the path where the generated PDF file will be saved
//         pdf.toFile(savePath, (err) => {
//             if (err) {
//                 console.error("Error generating PDF:", err);
//                 return res.status(500).json({ error: "Failed to generate the PDF." });
//             }

//             // If everything goes well, send a success response
//             return res.status(200).json({ success: "PDF generated successfully." });
//         });
//     } catch (error) {
//         // If there's an uncaught error during PDF generation, handle it here
//         console.error("Error generating PDF:", error);
//         return res.status(500).json({ error: "Failed to generate the PDF." });
//     }
// };

// const postQuotationReportData = async (req, res) => {
//     try {
//         const pdfBuffer = await new Promise((resolve, reject) => {
//             PDF.create(QUOTATION_TEMPLATE(req.body), {}).toBuffer((err, buffer) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(buffer);
//                 }
//             });
//         });

//         // Now you have the PDF byte array in the 'pdfBuffer' variable.
//         // You can do whatever you want with it (e.g., save it to a file, send it as a response, etc.).
//         // For example, if you want to send it as a response, you can do:
//         res.setHeader('Content-Type', 'application/pdf');
//         res.send(pdfBuffer);
//     } catch (err) {
//         res.status(500).send("Error creating PDF: " + err.message);
//     }
// };


const getQuotationReportDetails = async (req, res) => {

    const pathpdf = path.join(__dirname, 'invoice.pdf');


    const data = fs.readFileSync(pathpdf);

    try {
        if(data){
            return res.status(200).json({
                status:'2100',
                message:"data added succsesfull",
                data: data
            });
          
        }
       
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// module.exports = {
//     postQuotationReportData,
//     getQuotationReportDetails
// }

const QUOTATION_TEMPLATE = require("../../Reports/QuotationaReports");
const PDF = require('html-pdf');
const path = require('path');
const fs = require('fs');

const postQuotationReportData = async (req, res) => {
    try {
        const pdfBuffer = await new Promise((resolve, reject) => {
            PDF.create(QUOTATION_TEMPLATE(req.body), {}).toBuffer((err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });

        // Now you have the PDF byte array in the 'pdfBuffer' variable.
        // You can set the appropriate headers and send the PDF as a response.
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="QUOTATION.pdf"`);
        res.send(pdfBuffer);
    } catch (err) {
        res.status(500).send("Error creating PDF: " + err.message);
    }
};

module.exports = {
    postQuotationReportData,
    getQuotationReportDetails
}
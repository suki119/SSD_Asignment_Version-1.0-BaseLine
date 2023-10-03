import React, { createRef, Component } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import AccountCSS from './account.module.css';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import axios, { Axios } from 'axios';
import { FaEdit } from "react-icons/fa";

import validator from 'validator'
import TableScrollbar from 'react-table-scrollbar';
import { MDBDataTable } from 'mdbreact';
import { Image } from 'cloudinary-react';
import Select from 'react-select';
import { appURLs, webAPI } from '../../enum/URL';
import { EmailCredentials } from '../../enum/Constant';
import Swal from 'sweetalert2';
import Loader from '../loader/Loader';
import { BsTrashFill, BsJustify } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { saveAs } from 'file-saver';
import emailjs from "emailjs-com";




class quotation extends Component {

    constructor(props) {

        super(props)

        this.state = {

            time: new Date(),
            selectedOptions: [],
            allAcounts: [],
            options: [],
            companyName: '',
            companyID: '',
            companyEmailAddress: '',
            holderName: '',
            phoneNumber: '',
            companyPhoneNumber: '',
            comAddressCity: '',
            comAddressStreet: '',
            comAddressNum: '',
            allProducts: [],
            optionsForProducts: [],
            selectedProductOptions: [],
            btnDisable: true,
            productQTY: 1,
            productRate: "0",
            productDiscount: 0,
            productAmount: "0",
            productObjectArrey: [],
            invoiceSubTotal: 0,
            allInvoice: [],
            quotationNumber: '001',
            invoiceDiscount: 0,
            invoiceAdvanceAmount: "0",
            invoiceTotal: 0,
            adavanceSubtarctValue: 0,
            productID: '',
            productName: '',
            otherProductDes: "",
            preAdavceData: '',
            adavanceObjectData: '',
            adavanceObjectList: [],
            selectedAccountData: '',
            test: [
                {
                    "productName": "selectedProductOptions.label,",
                    "productqty": "20",
                    "productamount": "2000",
                    "productDiscount": "0",
                    "producttotalamount": "2000",
                    "otherProductDes": "this is moon can you see it this is moon can you see it this is moon can you see it"
                }, {
                    "productName": "selectedProductOptions.label,",
                    "productqty": "20",
                    "productamount": "2000",
                    "productDiscount": "0",
                    "producttotalamount": "2000",
                    "otherProductDes": "this is moon can you see it"
                },
                {
                    "productName": "selectedProductOptions.label,",
                    "productqty": "20",
                    "productamount": "2000",
                    "productDiscount": "0",
                    "producttotalamount": "2000",
                    "totAmount": "2000"
                }, {
                    "productName": "selectedProductOptions.label,",
                    "productqty": "20",
                    "productamount": "2000",
                    "productDiscount": "0",
                    "producttotalamount": "2000",
                    "otherProductDes": "this is moon can you see it"
                },
                {
                    "productName": "selectedProductOptions.label,",
                    "productqty": "20",
                    "productamount": "2000",
                    "productDiscount": "0",
                    "producttotalamount": "2000",
                    "otherProductDes": "this is moon can you see it"
                }, {
                    "productName": "selectedProductOptions.label,",
                    "productqty": "20",
                    "productamount": "2000",
                    "productDiscount": "0",
                    "producttotalamount": "2000",
                    "otherProductDes": "this is moon can you see it"
                }
            ]










        }

        this.changCompanyName = this.changCompanyName.bind(this);
        this.changProductName = this.changProductName.bind(this);
        this.changeProductAmount = this.changeProductAmount.bind(this);
        this.changeProductDiscount = this.changeProductDiscount.bind(this);
        this.changProductRate = this.changProductRate.bind(this);
        this.changProductQty = this.changProductQty.bind(this);
        this.onAddProductBtn = this.onAddProductBtn.bind(this);
        this.itemDelete = this.itemDelete.bind(this);
        this.onchangeAdvance = this.onchangeAdvance.bind(this);
        this.onchangeDiscount = this.onchangeDiscount.bind(this);
        this.onInvoiceSubmit = this.onInvoiceSubmit.bind(this);
        this.changeOtherProductDes = this.changeOtherProductDes.bind(this);
        this.onInvoiceDraftBtn = this.onInvoiceDraftBtn.bind(this);

    }

    onInvoiceDraftBtn(e) {
        e.preventDefault();
        const { companyName, quotationNumber, companyID, invoiceTotal, invoiceDiscount, productID, productName,
            invoiceAdvanceAmount, datetoday, comAddressCity, comAddressNum, comAddressStreet, productObjectArrey } = this.state

        let invNumber = (quotationNumber).split(" ");

        let AdvanceAmount = (invoiceAdvanceAmount).split(",");
        let newAdvanceAmount = AdvanceAmount.join('');

        const invoiceObject = {
            "invoiceNumber": invNumber[2],
            "accountID": companyID,
            "accountName": companyName,
            "invoiceStatus": "N",
            "draftstatus": "Y",
            "totalAmount": Number(invoiceTotal),
            "advance": Number(newAdvanceAmount),
            "discount": Number(invoiceDiscount),
            "date": datetoday,
            "accountAddress": comAddressNum + "/" + comAddressStreet + "/" + comAddressCity,
            "productDetails": productObjectArrey


        }

        this.setState({ loader: true });
        axios.post(appURLs.web + webAPI.addDraftInvoiceData, invoiceObject).then((res) => {
            if (res.data.status === 2100) {

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Invoice Draft',
                    showConfirmButton: false,
                    timer: 1500
                })

                this.setState({
                    loader: false,
                    selectedOptions: [],
                    companyName: '',
                    companyID: '',
                    companyEmailAddress: '',
                    holderName: '',
                    phoneNumber: '',
                    companyPhoneNumber: '',
                    comAddressCity: '',
                    comAddressStreet: '',
                    comAddressNum: '',
                    allProducts: [],
                    optionsForProducts: [],
                    selectedProductOptions: [],
                    btnDisable: true,
                    productQTY: 1,
                    productRate: "0",
                    productDiscount: 0,
                    productAmount: "0",
                    productObjectArrey: [],
                    invoiceSubTotal: 0,
                    allInvoice: [],

                    invoiceDiscount: 0,
                    invoiceAdvanceAmount: "0",
                    invoiceTotal: 0,
                    adavanceSubtarctValue: 0,
                    productID: '',
                    productName: '',

                });

            }
        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        })


    }


    // onPdfSave(data) {

    //     this.setState({
    //         loader: true
    //     })
    //     const postData = {
    //         InvoiceData: data,
    //         AccountData: this.state.selectedAccountData,
    //       };

    //     axios.post(appURLs.web + webAPI.postQuotationReportData, postData)
    //         .then(() => {
    //             // Step 2: Once the PDF is generated, make a GET request to fetch the generated PDF as a blob
    //             return axios.get(appURLs.web + webAPI.getQuotationReportDetails, { responseType: 'blob' });
    //         })
    //         .then((res) => {
    //             // Step 3: Convert the blob to a PDF file and save it using FileSaver.js
    //             const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

    //             if (pdfBlob) {
    //                 this.setState({ loader: false });
    //             }

    //             // Save the PDF with a specific file name
    //             saveAs(pdfBlob, "QUOTATION - " + data.quotationaNumber + " " + data.productDetails[0].productName);
    //         })
    //         .catch((error) => {
    //             console.error('Error', error);
    //             this.setState({ loader: false });
    //             Swal.fire({
    //                 position: 'top-end',
    //                 icon: 'error',
    //                 title: 'Network Error in PDF Creating',
    //                 showConfirmButton: false,
    //                 timer: 1500,
    //             });
    //         });


    // }

    onPdfSave(data) {

        this.setState({
            loader: true
        })
        const postData = {
            InvoiceData: data,
            AccountData: this.state.selectedAccountData,
        };

        axios.post(appURLs.web + webAPI.postQuotationReportData, postData,{ responseType: 'blob' })
            .then((res) => {

                if (res.status === 200) {
                    this.downloadPdf(res.data, data);
                    console.log("resss", res.data)
                    // const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                    // if (pdfBlob) {
                    //     this.setState({
                    //         loader: false
                    //     })
                    // }
                    // saveAs(pdfBlob, "QUOTATION - " + data.quotationaNumber + " " + data.productDetails[0].productName);



                    // axios.get(appURLs.web + webAPI.getQuotationReportDetails).then((res) =>{
                    //     console.log("pdf",res.data.data.data)
                    //     const pdfData = new Uint8Array(res.data.data.data);
                    //     const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });

                    //     if (pdfBlob) {
                    //         this.setState({
                    //             loader: false
                    //         })
                    //     }
                    //     saveAs(pdfBlob, "QUOTATION - " + data.quotationaNumber + " " + data.productDetails[0].productName);


                    // }).catch((error) => {
                    //     console.error('Error', error);
                    //     this.setState({ loader: false });
                    //     Swal.fire({
                    //         position: 'top-end',
                    //         icon: 'error',
                    //         title: 'Network Error in PDF Creating',
                    //         showConfirmButton: false,
                    //         timer: 1500
                    //     })
                    // })

                }


                // // Step 1: The backend will generate and return the PDF in the response
                // // Step 2: Convert the response data to a Blob representing the PDF
                // const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                // // Step 3: Save the PDF with a specific file name using FileSaver.js
                // saveAs(pdfBlob, "QUOTATION - " + data.quotationNumber + " " + data.productDetails[0].productName);

                // // Additional steps (if needed)
                // // You can perform any additional actions here, such as showing a success message, updating the state, etc.
                // this.setState({ loader: false });
            })
            .catch((error) => {
                console.error('Error', error);
                this.setState({ loader: false });
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Network Error in PDF Creating',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });

    }

    downloadPdf = (pdfBuffer, data) => {
        const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
        saveAs(pdfBlob, `QUOTATION - ${data.quotationaNumber} ${data.productDetails[0].productName}.pdf`);
      };

    onMailSend(invoiceObject) {

        if (this.state.companyEmailAddress !== '') {



            const emailobject = {

                "toEmail": this.state.companyEmailAddress,
                "invoiceNo": invoiceObject.quotationNumber,
                "compName": this.state.companyName,
                "projName": invoiceObject.productDetails[0].productName,
                "date": invoiceObject.date,
                "inSubTot": (Number(invoiceObject.subTotal)).toLocaleString('en-US'),
                "inAdavance": invoiceObject.advance !== 0 ? (Number(invoiceObject.advance)).toLocaleString('en-US') : "0",
                "inDiscount": String(invoiceObject.discount) + "%",
                "inTotalAmount": "LKR: " + (Number(invoiceObject.totalAmount)).toLocaleString('en-US'),
            }

            let wording = '';
            let productStringDataArrey = []

            invoiceObject.productDetails.map((obj, index) => (



                wording = (index + 1 + ". " + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + obj.productName + '\xa0\xa0' + '\xa0\xa0\xa0\xa0' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +
                    (Number(obj.productamount)).toLocaleString('en-US') + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '\xa0\xa0\xa0' +
                    (Number(obj.productqty)).toLocaleString('en-US') + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +
                    String(obj.productDiscount) + "%" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +
                    "LKR. " + (Number(obj.producttotalamount)).toLocaleString('en-US') + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '\xa0\xa0\xa0\xa0' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '\xa0\xa0\xa0\xa0' +
                    (obj.productOtherDes !== '' ? "Discription - " + obj.productOtherDes : "-")),
                productStringDataArrey.push(wording)

            )
            )



            emailobject.productStringline1 = productStringDataArrey[0] !== null ? productStringDataArrey[0] : " - ";
            emailobject.productStringline2 = productStringDataArrey[1] !== null ? productStringDataArrey[1] : " - ";
            emailobject.productStringline3 = productStringDataArrey[2] !== null ? productStringDataArrey[2] : " - ";
            emailobject.productStringline4 = productStringDataArrey[3] !== null ? productStringDataArrey[3] : " - ";
            emailobject.productStringline5 = productStringDataArrey[4] !== null ? productStringDataArrey[4] : " - ";



            this.setState({ loader: true });
            emailjs.send(EmailCredentials.SERVICE, EmailCredentials.TEMPLATE, emailobject, EmailCredentials.PUBLIC_KEY).then(res => {
                if (res.status === 200) {
                    this.setState({ loader: false });
                }

            }).catch((error) => {
                console.error('Error', error);
                this.setState({ loader: false });
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Network Error in Email Sending',
                    showConfirmButton: false,
                    timer: 1500
                })


            });
        }


    }


    onInvoiceSubmit(e) {
        e.preventDefault();
        const { companyName, quotationNumber, companyID, invoiceTotal, invoiceDiscount, productID, productName,
            invoiceAdvanceAmount, datetoday, comAddressCity, comAddressNum, comAddressStreet, productObjectArrey, adavanceObjectList, invoiceSubTotal } = this.state

        let invNumber = (quotationNumber).split(" ");

        let AdvanceAmount = (invoiceAdvanceAmount).split(",");
        let newAdvanceAmount = AdvanceAmount.join('');


        const invoiceObject = {
            "quotationaNumber": invNumber[2],
            "accountID": companyID,
            "accountName": companyName,
            "invoiceStatus": "N",
            "draftstatus": "N",
            "totalAmount": Number(invoiceTotal),
            "advance": Number(newAdvanceAmount),
            "discount": Number(invoiceDiscount),
            "subTotal": Number(invoiceSubTotal),
            "date": datetoday,
            "accountAddress": comAddressNum + ", " + comAddressStreet + ", " + comAddressCity,
            "productDetails": productObjectArrey


        }

        this.setState({ loader: true });
        axios.post(appURLs.web + webAPI.addQuotationData, invoiceObject).then((res) => {
            if (res.data.status === 2100) {

                this.setState({ loader: true });
                //adavanceObjectList.map(object => {




                // axios.put(appURLs.web + webAPI.updateAdvanceTotDetails + object._id, { "settleStatus": 'Y' }).then((res) => {

                //     if (res.data.status === 2100) {

                //         this.setState({
                //             loader: false
                //         })

                //     }

                // }).catch((error) => {
                //     console.error('Error', error);
                //     this.setState({ loader: false });
                //     Swal.fire({
                //         position: 'top-end',
                //         icon: 'error',
                //         title: 'Network Error',
                //         showConfirmButton: false,
                //         timer: 1500
                //     })


                // })




                //}


                //)



                this.onPdfSave(res.data.newData);
                //this.onMailSend(invoiceObject);




                this.setState({
                    loader: false,
                    selectedOptions: [],
                    companyName: '',
                    companyID: '',
                    companyEmailAddress: '',
                    holderName: '',
                    phoneNumber: '',
                    companyPhoneNumber: '',
                    comAddressCity: '',
                    comAddressStreet: '',
                    comAddressNum: '',
                    allProducts: [],
                    optionsForProducts: [],
                    selectedProductOptions: [],
                    btnDisable: true,
                    productQTY: 1,
                    productRate: "0",
                    productDiscount: 0,
                    productAmount: "0",
                    productObjectArrey: [],
                    invoiceSubTotal: 0,
                    allInvoice: [],
                    quotationNumber: '',
                    invoiceDiscount: 0,
                    invoiceAdvanceAmount: "0",
                    invoiceTotal: 0,
                    adavanceSubtarctValue: 0,
                    productID: '',
                    productName: '',

                });
                this.getAllInvoice();
            }
        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        })



    }


    invoiceCalculation() {

        const { invoiceSubTotal, invoiceTotal, invoiceAdvanceAmount, invoiceDiscount } = this.state;
        let num
        let number = (invoiceAdvanceAmount).split(",");
        let joinedNumber = number.join('');

        if (Number(invoiceSubTotal) > 0) {

            if (Number(invoiceDiscount) > 0) {

                let adavanceSubtarctValue = invoiceSubTotal - joinedNumber
                this.setState({
                    adavanceSubtarctValue: adavanceSubtarctValue
                })
                let discountNum = ((invoiceSubTotal - joinedNumber) * invoiceDiscount) / 100
                num = (invoiceSubTotal - joinedNumber) - discountNum

            } else {
                num = invoiceSubTotal - joinedNumber
                this.setState({
                    adavanceSubtarctValue: num
                })
            }



            this.setState({
                invoiceTotal: num
            })

        } else {

            this.setState({
                invoiceTotal: 0,
                adavanceSubtarctValue: 0
            })

        }


    }

    changeOtherProductDes = (event) => {

        this.setState({
            otherProductDes: event.target.value
        })
    }

    onchangeAdvance = (event) => {

        let number = (event.target.value).split(",");
        let joinedNumber = number.join('');

        if (isNaN(joinedNumber)) {
            joinedNumber = "0"
        }

        let num = (Number(joinedNumber)).toLocaleString('en-US')


        this.setState({
            invoiceAdvanceAmount: num
        }, () => {

            this.invoiceCalculation();
        })

    }


    onchangeDiscount = (event) => {


        const { invoiceSubTotal, invoiceTotal, invoiceAdvanceAmount } = this.state;




        this.setState({
            invoiceDiscount: Number(event.target.value) > -1 && Number(event.target.value) < 101 && event.target.value !== '' ? event.target.value : "0"
        }, () => {
            this.invoiceCalculation();
        })

    }


    itemDelete(index) {

        const { productObjectArrey } = this.state;

        const indexOfArray = Number(index);

        const selectedObject = this.state.productObjectArrey[indexOfArray];

        //Invoice Total Advance
        const advance = this.state.productObjectArrey[indexOfArray].advance;
        let advanceAmount = (this.state.invoiceAdvanceAmount).split(",");



        let question = productObjectArrey.find(i => i.productName === this.state.productObjectArrey[indexOfArray].productName);






        //Object Total amount
        const number = this.state.productObjectArrey[indexOfArray].producttotalamount;



        this.setState((prevState) => (
            {
                invoiceSubTotal: prevState.invoiceSubTotal - number,


            }
        ));



        var arrays = [...this.state.productObjectArrey];




        if (indexOfArray != -1) {
            arrays.splice(Number(index), 1);
            this.setState({
                productObjectArrey: arrays


            }, () => {

                let advanceAmountAvb = this.state.adavanceObjectList.find(i => i.productID === selectedObject.productID);


                let question = this.state.productObjectArrey.find(i => i.productName === selectedObject.productName);

                if (question == undefined && advanceAmountAvb != undefined) {

                    let objectIndex = this.state.adavanceObjectList.findIndex(i => i.productID === selectedObject.productID);

                    var objectList = [...this.state.adavanceObjectList];

                    objectList.splice(Number(objectIndex), 1);


                    this.setState({
                        adavanceObjectList: objectList
                    }, () => {


                        this.calculateTotalWithAdvance();

                    })

                }


                this.invoiceCalculation();

            });
        }

    }

    productAmountCalculation() {

        const { productQTY, productDiscount, productAmount, productRate } = this.state;

        let amount, finalAmount

        if (productRate != 0) {

            let number = (productRate).split(",");
            let joinedNumber = number.join('');




            if (Number(productDiscount) === 0) {

                finalAmount = (productQTY * Number(joinedNumber));


            } else {

                amount = (productQTY * Number(joinedNumber));
                let discountAmount = (amount * Number(productDiscount)) / 100;
                finalAmount = amount - discountAmount;
            }

            let tot = (Number(finalAmount)).toLocaleString('en-US')

            this.setState({
                productAmount: tot,

            })



        }


    }

    subTotalCalculation(totAmount) {

        const { invoiceSubTotal } = this.state;

        let newSubTotal = invoiceSubTotal + Number(totAmount)

        this.setState({
            invoiceSubTotal: Number(newSubTotal),
            invoiceTotal: Number(newSubTotal)
        }, () => {
            this.invoiceCalculation();
        })

    }



    calculateTotalWithAdvance() {


        let totNumbber = 0



        if (this.state.adavanceObjectList[0] !== null) {

            this.state.adavanceObjectList.map(object => {


                let advanceAmount = (object.adavanceTotAmount).split(",");
                let advanceAmountjoinedNumber = advanceAmount.join('');

                totNumbber = totNumbber + Number(advanceAmountjoinedNumber)



            })

            let num = (Number(totNumbber)).toLocaleString('en-US')

            this.setState({
                invoiceAdvanceAmount: num
            }, () => {
                this.invoiceCalculation();
            })

        } else {

            this.setState({
                invoiceAdvanceAmount: "0"
            }, () => {
                this.invoiceCalculation();
            })

        }







    }





    onAddProductBtn(e) {

        e.preventDefault();
        const { productQTY, productDiscount, preAdavceData, productAmount, productRate, selectedProductOptions, productObjectArrey, invoiceSubTotal, otherProductDes, advanceTotal, invoiceAdvanceAmount, adavanceObjectList } = this.state;

        let number1 = (productRate).split(",");
        let joinedNumber = number1.join('');

        let number2 = (productAmount).split(",");
        let totAmount = number2.join('');


        if (Number(totAmount) > 0 && Number(joinedNumber) > 0) {



            let advanceTotAmountjoinedNum = "0"


            if (this.state.adavanceObjectData !== null) {

                let advanceTotalAmount = (this.state.adavanceObjectData.adavanceTotAmount).split(",");
                advanceTotAmountjoinedNum = advanceTotalAmount.join('');

                let question = adavanceObjectList.find(i => i.productID === this.state.adavanceObjectData.productID);

                if (question == undefined) {

                    adavanceObjectList.push(this.state.adavanceObjectData)
                }



                let num = "0";
                this.setState({
                    adavanceObjectList: adavanceObjectList

                }, () => {


                    this.calculateTotalWithAdvance();

                })

            }







            // .........................................................................................................


            let productObject = {
                "productID": selectedProductOptions.value,
                "productName": selectedProductOptions.label,
                "productqty": productQTY,
                "productamount": joinedNumber,
                "productDiscount": productDiscount,
                "producttotalamount": totAmount,
                "productOtherDes": otherProductDes,
                "advance": advanceTotAmountjoinedNum

            }

            productObjectArrey.push(productObject);

            this.setState({
                productObjectArrey,

            }, () => {



                this.subTotalCalculation(totAmount);

                this.setState({
                    productQTY: 1,
                    productRate: "0",
                    productDiscount: 0,
                    productAmount: "0",
                    selectedProductOptions: [],
                    otherProductDes: ''

                })
            })


        } else {

            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Rate Cant be 0.00',
                showConfirmButton: false,
                timer: 1500
            })

        }



    }


    changeProductAmount = (event) => {
        this.setState({
            productAmount: event.target.value
        });
    }


    changeProductDiscount = (event) => {




        this.setState({
            productDiscount: event.target.value
        }, () => {
            this.productAmountCalculation()
        });
    }


    changProductQty = (event) => {


        this.setState({
            productQTY: event.target.value
        }, () => {

            this.productAmountCalculation();

        });
    }


    getDraftInvoiceBySelectedProduct(selectedProductOptions) {

        const data = {

        }

    }

    calculateAdvanceAmount() {

        const { preAdavceData, productObjectArrey } = this.state

        let total = 0;
        let sameData = true;





        let number = (preAdavceData.adavanceTotAmount).split(",");
        let joinedNumber = number.join('');
        total = total + Number(joinedNumber)




        let num = (Number(total)).toLocaleString('en-US')



        if (productObjectArrey.length !== 0) {



            productObjectArrey.map(obj => {

                sameData = obj.productName == preAdavceData[0].productName ? false : true

            })




        }


        if (sameData) {
            this.setState({
                advanceTotal: num,

            })
        }



    }


    getaAdvanceAmountByAccAndProd() {

        const { selectedOptions, selectedProductOptions, adavanceObjectList } = this.state;
        this.setState({ loader: true });

        const reqData = {
            "productID": selectedProductOptions.value,
            "accountID": selectedOptions.value,
            "settleStatus": "N"
        }

        axios.post(appURLs.web + webAPI.getaAdvanceTotAmountByAccAndProd, reqData).then((res) => {
            if (res.data.status === 2100) {

                this.setState({
                    loader: false,
                    preAdavceData: res.data.data,
                    adavanceObjectData: res.data.data

                }, () => {
                    // this.calculateAdvanceAmount()

                })

            }

        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        })
    }


    changProductName = (selectedProductOptions) => {


        this.getDraftInvoiceBySelectedProduct(selectedProductOptions);


        this.setState({
            productID: selectedProductOptions.value,
            productName: selectedProductOptions.label,
            selectedProductOptions,
            btnDisable: false

        }, () => {
            this.getaAdvanceAmountByAccAndProd();
        });
    }


    changProductRate = (event) => {


        let number = (event.target.value).split(",");
        let joinedNumber = number.join('');


        if (isNaN(joinedNumber)) {
            joinedNumber = "0"
        }


        let rate = Number(joinedNumber) > 0 ? Number(joinedNumber) : 0;

        let num = (Number(joinedNumber)).toLocaleString('en-US')



        this.setState({
            productRate: num
        }, () => {

            this.productAmountCalculation();

        });
    }

    getAccountDetails() {

        this.setState({ loader: true });

        axios.get(appURLs.web + webAPI.getAccountData).then((res) => {

            this.setState({
                allAcounts: res.data.data
            }, () => {


                const dataArrey = [];
                this.state.allAcounts.forEach(obj => {
                    dataArrey.push({
                        value: obj._id, label: obj.CompanyName
                    })
                });


                this.setState({

                    loader: false,
                    options: dataArrey,

                })

            })
        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        });
    }

    getAllProductsByAccountID() {
        this.setState({ loader: true });
        axios.post(appURLs.web + webAPI.getAllProductsByAccountID, { 'accountID': this.state.selectedOptions.value }).then((res) => {
            if (res.data.status === 2100 && res.data.data.length != 0) {


                this.setState({
                    allProducts: res.data.data,

                }, () => {

                    const dataArrey = [];
                    this.state.allProducts.forEach(obj => {
                        dataArrey.push({
                            value: obj._id, label: obj.productName
                        })
                    });


                    this.setState({

                        loader: false,
                        optionsForProducts: dataArrey,

                    })
                })

            } else {

                this.setState({ loader: false });
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: 'No Product Found',
                    showConfirmButton: false,
                    timer: 1500
                })

            }
        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        });
    }


    changCompanyName = (selectedOptions) => {

        this.setState({

            productQTY: 1,
            productRate: "0",
            productDiscount: 0,
            productAmount: "0",
            productObjectArrey: [],
            invoiceSubTotal: 0,


            invoiceDiscount: 0,
            invoiceAdvanceAmount: "0",
            invoiceTotal: 0,
            adavanceSubtarctValue: 0,
            productID: '',
            productName: '',
            otherProductDes: "",
            preAdavceData: '',
            adavanceObjectData: '',
            adavanceObjectList: [],

            // ............................

            companyName: selectedOptions.label,
            companyID: selectedOptions.value,
            selectedOptions,
            selectedProductOptions: [],
            optionsForProducts: [],
            btnDisable: true

        }, () => {
            this.getAccountByID();
            this.getAllProductsByAccountID();

        });
    }


    getDateAndTime() {


        let MyDate = new Date();
        let MyDateString;

        MyDate.setDate(MyDate.getDate());

        MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
            + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/'
            + MyDate.getFullYear();

        this.setState({
            datetoday: MyDateString
        })

    }


    dateHandle = (e) => {
        let date = e.target.value;
        if (date == "") {

        }

    }





    getTime() {
        setInterval(() => {
            this.setState({ time: new Date() });
        }, 1000);
    }


    getAccountByID() {


        this.setState({ loader: true })
        axios.get(appURLs.web + webAPI.getAccountById + this.state.selectedOptions.value).then((res) => {


            if (res.data.data) {
                const addresArrey = res.data.data.CompanyAddress;
                const newArrey = addresArrey.split(", ");


                this.setState({

                    loader: false,
                    selectedAccountData: res.data.data,
                    companyName: res.data.data.CompanyName,
                    companyEmailAddress: res.data.data.CompanyEmailAddress,
                    holderName: res.data.data.HolderName,
                    phoneNumber: res.data.data.HolPhonenumber,
                    companyPhoneNumber: res.data.data.CompanyPhonenumber,
                    AccountDtails: res.data.data,
                    comAddressCity: newArrey[2],
                    comAddressStreet: newArrey[1],
                    comAddressNum: newArrey[0]
                });
            }




        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        })

    }

    quotationNumberCreation() {

        const { allInvoice } = this.state;

        const lastObject = allInvoice[0]
        if (lastObject) {
            let quotationNumber = Number(lastObject.quotationaNumber) + 1;

            let formattedNumber = quotationNumber.toLocaleString('en-US', {
                minimumIntegerDigits: 4,
                useGrouping: false
            })

            this.setState({
                quotationNumber: "QUOT - " + formattedNumber
            })
        } else {

            this.setState({
                quotationNumber: "QUOT - 001 "
            })
        }


    }

    getAllInvoice() {

        this.setState({ loader: true });

        axios.get(appURLs.web + webAPI.getAllQuotation).then((res) => {

            if (res.data.status === 2100) {

                this.setState({
                    allInvoice: res.data.data,
                    loader: false
                }, () => {
                    this.quotationNumberCreation();
                })
            }

        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        })

    }

    // test(){


    //     axios.post(appURLs.web + webAPI.getInvoiceByAccName,{"accountName":"Test Company Name"}).then((res) => {


    //         console.log(res.data.data);

    //         let data = res.data.data;

    //         data.map(obj => 

    //             setTimeout(function () {
    //                 axios.delete(appURLs.web + webAPI.deleteInvoiceByID + obj._id).then((res) => {


    //                 })
    //               }, 2000)



    //             )

    //     })

    // }


    componentDidMount() {

        this.getDateAndTime();
        this.getAccountDetails();
        this.getAllInvoice();

        // this.test();
    }






    render() {
        const { selectedOptions } = this.state.selectedOptions;
        const { selectedProductOptions } = this.state.selectedProductOptions;
        return (
            <div>
                <div className='main-wrapper'>

                    <div className='app-header'>
                        <Header />

                    </div>

                    <div className='app-body'>

                        <div className="body-wrapper">

                            <div className='app-sidebar'>
                                <Sidebar />
                            </div>

                            <div className='app-content'>

                                <Form onSubmit={this.state.addBagageData} ref={this.state.formData}>

                                    <Row>

                                        <div className={AccountCSS.container}>



                                            <div style={{ "overflow": "auto", "height": "580px", "overflowX": "auto", "marginTop": "15px" }}>

                                                <div className={AccountCSS.form}>

                                                    <Row>
                                                        <Col xs={4}>

                                                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                                                <Form.Label>Company Name</Form.Label>
                                                                <Select


                                                                    value={selectedOptions}
                                                                    options={this.state.options}
                                                                    onChange={this.changCompanyName}


                                                                />



                                                            </Form.Group>

                                                        </Col>

                                                        <Col>
                                                        </Col>
                                                        <Col>
                                                        </Col>
                                                        <Col>



                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label></Form.Label>
                                                                <Form.Control type="text" disabled={true} style={{ "textAlign": "center", "fontSize": "17px", "fontWeight": "700" }} value={this.state.quotationNumber} name="date" />



                                                            </Form.Group>

                                                        </Col>

                                                        <Col >


                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label></Form.Label>
                                                                <Form.Control type="text" disabled="true" style={{ "textAlign": "center", "fontSize": "17px", "fontWeight": "700" }} value={this.state.time.toLocaleTimeString()} onClick={this.dateHandle} {...this.getTime()} name="date" />



                                                            </Form.Group>

                                                            {/* <input placeholder="Date" name="date"
                                                                value={this.state.time.toLocaleTimeString()} onClick={this.dateHandle} {...this.getTime()} /> */}
                                                        </Col>


                                                        <Col >


                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label></Form.Label>
                                                                <Form.Control type="text" style={{ "textAlign": "center", "fontSize": "17px", "fontWeight": "700" }} disabled="true" value={this.state.datetoday} onClick={this.dateHandle} name="date" />



                                                            </Form.Group>
                                                            {/* <input placeholder="Date" name="date"
                                                                value={this.state.datetoday} onClick={this.dateHandle} /> */}
                                                        </Col>

                                                    </Row>

                                                    {/* .......................................................................... */}
                                                    <Row>

                                                        <Col >

                                                            <Row style={{ "marginTop": "22px" }}>


                                                                <Col >

                                                                    <Row>

                                                                        <Col xs={5}>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left" }}>Account Name  </span>
                                                                        </Col>

                                                                        <Col xs={1} >
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-40px" }}>:</span>
                                                                        </Col>



                                                                        <Col>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "marginLeft": "-50px" }}>{this.state.companyName}  </span>

                                                                        </Col>


                                                                    </Row>
                                                                    {/* <div>
                                                             
                                                                <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left"}}>: {this.state.companyName}  </span>
                                                            </div> */}


                                                                </Col>





                                                            </Row>



                                                            <Row style={{ "marginTop": "10px" }}>


                                                                <Col >

                                                                    <Row>

                                                                        <Col xs={5}>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500" }}>Account HolderName </span>
                                                                        </Col>

                                                                        <Col xs={1}>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-40px" }}>:</span>
                                                                        </Col>



                                                                        <Col>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-50px" }}> {this.state.holderName}</span>

                                                                        </Col>


                                                                    </Row>


                                                                </Col>




                                                            </Row>

                                                            <Row style={{ "marginTop": "10px" }}>

                                                                <Col >

                                                                    <Row>

                                                                        <Col xs={5} >
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500" }}>Account PhoneNumber  </span>
                                                                        </Col>

                                                                        <Col xs={0}>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-40px" }}>:</span>
                                                                        </Col>



                                                                        <Col xs={6}>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-50px" }}> {this.state.phoneNumber} </span>

                                                                        </Col>


                                                                    </Row>



                                                                </Col>




                                                            </Row>

                                                        </Col>

                                                        {/* .......................................................... */}

                                                        <Col>

                                                            <Row style={{ "marginTop": "22px", "textAlign": "left", "marginLeft": "-50px" }}>

                                                                <Col xs={5} >
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500" }}>Company Email </span>
                                                                </Col>

                                                                <Col xs={1} >
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-40px" }}>:</span>
                                                                </Col>



                                                                <Col>
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-50px" }}> {this.state.companyEmailAddress}</span>

                                                                </Col>


                                                            </Row>


                                                            <Row style={{ "marginTop": "10px", "textAlign": "left", "marginLeft": "-50px" }}>

                                                                <Col xs={5} >
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500" }}>Account PhoneNumber  </span>
                                                                </Col>

                                                                <Col xs={1} >
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-40px" }}>:</span>
                                                                </Col>



                                                                <Col>
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-50px" }}> {this.state.phoneNumber} </span>

                                                                </Col>


                                                            </Row>



                                                            <Row style={{ "marginTop": "10px", "textAlign": "left", "marginLeft": "-50px" }}>


                                                                <Col >

                                                                    <Row>

                                                                        <Col xs={5} >
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500" }}>Company Address  </span>
                                                                        </Col>

                                                                        <Col xs={1} >
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-40px" }}>:</span>
                                                                        </Col>



                                                                        <Col >
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-50px" }}> {this.state.comAddressCity && this.state.comAddressNum + ", " + this.state.comAddressStreet + ", " + this.state.comAddressCity}  </span>

                                                                        </Col>


                                                                    </Row>



                                                                </Col>



                                                            </Row>



                                                        </Col>

                                                        <Col>

                                                            <span style={{ "marginTop": "1px", "textAlign": "right", "float": 'right', "fontSize": "55px", "padding": "12px", "border": "groove", "color": "aliceblue", "backgroundColor": "#888c91", "fontWeight": "400", "width": "470px" }}>
                                                                LKR : {(this.state.invoiceTotal).toLocaleString('en-US')}
                                                            </span>




                                                        </Col>


                                                    </Row>

                                                    {/* ................................................... */}

                                                    <Row>

                                                        <Col>
                                                        </Col>

                                                        <Col xs={10}>
                                                            {/* <Button variant="primary" disabled={this.props.submitButton} onClick={this.onInvoiceDraftBtn} type="submit" style={{ "marginTop": "15px", "width": "90px", "float": "right" }}>
                                                                Draft
                                                            </Button> */}
                                                        </Col>
                                                        <Col>
                                                            <Button variant="primary" disabled={this.props.submitButton} onClick={this.onInvoiceSubmit} type="submit" style={{ "marginTop": "15px", "width": "90px", "float": "right" }}>
                                                                Submit
                                                            </Button>
                                                        </Col>






                                                    </Row>

                                                </div>

                                            </div>



                                        </div>

                                    </Row>

                                    <Row>

                                        <div className={AccountCSS.container3} >

                                            <Row>


                                                <div style={{ "height": "190px", "marginTop": "15px" }}>

                                                    <div className={AccountCSS.form}>

                                                        <Row>
                                                            <Col xs={4}>

                                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                                    <Form.Label>Name</Form.Label>
                                                                    <Select

                                                                        isDisabled={this.state.selectedOptions.value ? false : true}

                                                                        value={this.state.selectedProductOptions}
                                                                        options={this.state.optionsForProducts}
                                                                        onChange={this.changProductName}


                                                                    />



                                                                </Form.Group>

                                                            </Col>

                                                            <Col>

                                                            </Col>

                                                            <Col>


                                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                    <Form.Label>QTY</Form.Label>
                                                                    <Form.Control type="number" disabled={this.state.btnDisable} value={this.state.productQTY} onChange={this.changProductQty} name="productName" />



                                                                </Form.Group>

                                                            </Col>

                                                            <Col xs={2}>
                                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                    <Form.Label>Rate</Form.Label>
                                                                    <Form.Control type="text" style={{ "textAlign": "right" }} disabled={this.state.btnDisable} value={this.state.productRate} onChange={this.changProductRate} name="productName" />



                                                                </Form.Group>

                                                            </Col>


                                                            <Col>
                                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                    <Form.Label>Discount</Form.Label>
                                                                    <Form.Control type="number" disabled={this.state.btnDisable} value={this.state.productDiscount} onChange={this.changeProductDiscount} name="productName" />



                                                                </Form.Group>

                                                            </Col>



                                                            <Col xs={2}>
                                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                    <Form.Label>Amount</Form.Label>
                                                                    <Form.Control type="text" style={{ "textAlign": "right", "fontSize": "17px", "fontWeight": "700" }} disabled={true} value={this.state.productAmount} onChange={this.changeProductAmount} name="productName" />



                                                                </Form.Group>

                                                            </Col>


                                                            <Col >
                                                                <Form.Group className="mb-3" controlId="formBasicEmail">

                                                                    <Button variant="primary" disabled={this.props.submitButton} onClick={this.onAddProductBtn} type="submit" style={{ "marginTop": "35px", "width": "90px", "textAlign": "center" }}>
                                                                        Add
                                                                    </Button>



                                                                </Form.Group>

                                                            </Col>



                                                        </Row>

                                                        <Row>

                                                            <Col>


                                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                    <Form.Label>Other</Form.Label>
                                                                    <Form.Control type="text" disabled={this.state.btnDisable} value={this.state.otherProductDes} onChange={this.changeOtherProductDes} name="productName" />



                                                                </Form.Group>

                                                            </Col>


                                                        </Row>







                                                    </div>

                                                </div>

                                            </Row>



                                        </div>

                                    </Row>

                                </Form>

                                <Row>

                                    <div className={AccountCSS.container4} >

                                        <Row>
                                            <Col>

                                                <Table hover variant="light" class="table table-hover " striped >

                                                    <thead style={{ 'display': 'block', "lineHeight": "0.5" }} >
                                                        <tr>
                                                            <th style={{ "width": "39px", "font-size": "20px", "fontWeight": "500" }}></th>

                                                            <th style={{ "width": "350px", "font-size": "20px", "fontWeight": "400" }}><span style={{ "fontSize": "16px", "fontWeight": "600" }}>Product Name</span></th>
                                                            <th style={{ "width": "410px", "font-size": "20px", "fontWeight": "400" }}><span style={{ "fontSize": "16px", "fontWeight": "600" }}>Description</span></th>
                                                            <th style={{ "width": "200px", "font-size": "20px", "fontWeight": "400", "textAlign": "right" }}><span style={{ "fontSize": "16px", "fontWeight": "600" }}>Cost Price</span></th>
                                                            <th style={{ "width": "155px", "font-size": "20px", "fontWeight": "400", "textAlign": "right" }}><span style={{ "fontSize": "16px", "fontWeight": "600" }}>QTY</span></th>
                                                            <th style={{ "width": "160px", "font-size": "20px", "fontWeight": "400", "textAlign": "right" }}><span style={{ "fontSize": "16px", "fontWeight": "600" }}>Discount</span></th>
                                                            <th style={{ "width": "310px", "font-size": "20px", "fontWeight": "400", "textAlign": "right" }}><span style={{ "fontSize": "16px", "fontWeight": "600" }}>Amount</span></th>
                                                            <th style={{ "width": "100px", "font-size": "20px", "fontWeight": "400" }}></th>


                                                        </tr>
                                                    </thead>

                                                    <tbody style={{ 'height': '285px', 'overflow': 'auto', 'display': 'block' }}>
                                                        {
                                                            this.state.productObjectArrey &&
                                                            this.state.productObjectArrey.map((item, index) =>



                                                                <tr key={index} style={{ "lineHeight": "0.5" }}>
                                                                    <td style={{ 'width': '20px', "font-size": "17px", "fontWeight": "400" }}>{index + 1}.</td>
                                                                    <td style={{ 'width': '350px', "font-size": "17px", "fontWeight": "400" }}>{item.productName}</td>
                                                                    <td style={{ 'width': '400px', "font-size": "17px", "fontWeight": "400" }}><span style={{ "lineBreak": "auto", "lineHeight": "normal" }}>{item.productOtherDes === '' ? "-" : item.productOtherDes}</span></td>
                                                                    <td style={{ 'width': '180px', "font-size": "17px", "fontWeight": "400", "textAlign": "right" }}>{Number(item.productamount).toLocaleString('en-US')}</td>
                                                                    <td style={{ 'width': '150px', "font-size": "17px", "fontWeight": "400", "textAlign": "right" }}>{item.productqty}</td>
                                                                    <td style={{ 'width': '150px', "font-size": "17px", "fontWeight": "400", "textAlign": "right" }}>{item.productDiscount}%</td>
                                                                    <td style={{ 'width': '310px', "font-size": "17px", "fontWeight": "400", "textAlign": "right", "marginRight": "30px", "borderRightWidth": "medium" }}>{Number(item.producttotalamount).toLocaleString('en-US')}</td>
                                                                    <td style={{ 'width': '100px' }}>
                                                                        <div style={{ "fontSize": "20px", "marginLeft": "15px", "textAlign": "center" }}>
                                                                            <BsTrashFill onClick={() => this.itemDelete(index)} />

                                                                        </div>

                                                                    </td>

                                                                </tr>

                                                            )
                                                        }

                                                    </tbody>

                                                    <tfoot style={{ 'display': 'block' }}>
                                                        {
                                                            <><tr style={{ "lineHeight": "0.8" }}>
                                                                <th style={{ "width": "25px", "font-size": "small" }}></th>

                                                                <th style={{ "width": "400px", "font-size": "small" }}></th>
                                                                <th style={{ "width": "310px", "font-size": "small" }}></th>
                                                                <th style={{ "width": "200px", "font-size": "small" }}></th>
                                                                <th style={{ "width": "252px", "fontSize": "16px", "fontWeight": "600", "textAlign": "right" }}>Sub Total :</th>
                                                                <th style={{ "width": "370px", "fontSize": "16px", "fontWeight": "600", "textAlign": "right", "borderBottom": "groove" }}>{Number(this.state.invoiceSubTotal).toLocaleString('en-US')}</th>
                                                                <th style={{ "width": "100px", "font-size": "small" }}></th>


                                                            </tr><tr style={{ "lineHeight": "0.8" }}>
                                                                    <th style={{ "width": "25px", "font-size": "small" }}></th>

                                                                    <th style={{ "width": "400px", "font-size": "small" }}></th>
                                                                    <th style={{ "width": "310px", "font-size": "small" }}></th>
                                                                    <th style={{ "width": "200px", "font-size": "small" }}></th>
                                                                    {/* <th style={{ "width": "252px", "fontSize": "16px", "fontWeight": "600", "textAlign": "right" }}>Advance :</th> */}
                                                                    {/* <th style={{ "width": "370px", "fontSize": "16px", "fontWeight": "600", "textAlign": "right", "borderBottom": "groove" }}><span style={{}}>
                                                                        <Row>
                                                                            <Col>

                                                                            </Col>
                                                                            <Col >
                                                                                {this.state.invoiceAdvanceAmount != 0 && <span style={{ "marginTop": "16px", "textAlign": "left" }}>
                                                                                    <HiMinus />
                                                                                </span>}
                                                                                <input type="text" value={this.state.invoiceAdvanceAmount} onChange={this.onchangeAdvance} style={{ "text-align": "right", "width": "80px", "float": "right", "border": "none", "fontSize": "16px", "fontWeight": "600", "backgroundColor": "#f8f9fa" }} />
                                                                            </Col>
                                                                        </Row>




                                                                    </span></th> */}

                                                                    <th style={{ "width": "100px", "font-size": "small" }}></th>


                                                                </tr><tr style={{ "lineHeight": "0.8" }}>
                                                                    <th style={{ "width": "25px", "font-size": "small" }}></th>

                                                                    <th style={{ "width": "400px", "font-size": "small" }}></th>
                                                                    <th style={{ "width": "310px", "font-size": "small" }}></th>
                                                                    <th style={{ "width": "200px", "font-size": "small" }}></th>
                                                                    <th style={{ "width": "252px", "fontSize": "16px", "fontWeight": "600", "textAlign": "right" }}>Discount :</th>

                                                                    <th style={{ "width": "370px", "fontSize": "16px", "fontWeight": "600", "textAlign": "right", "borderBottom": "groove" }}>
                                                                        <Row>

                                                                            <Col  >

                                                                                <input type="text" value={this.state.invoiceDiscount} onChange={this.onchangeDiscount}
                                                                                    style={{ "marginTop": "1px", "text-align": "right", "width": "80px", "border": "none", "fontSize": "16px", "fontWeight": "600", "backgroundColor": "#f8f9fa", "float": "left" }} />
                                                                                <span style={{ "marginTop": "10px", "textAlign": "left", "marginRight": "50px", "display": "flex", "marginTop": "7px" }}>
                                                                                    %
                                                                                </span>
                                                                            </Col>
                                                                            {/* <Col >
                                                                                <span style={{ "marginTop": "5px", "textAlign":"left" ,"float":'left' }}>
                                                                                   %
                                                                                </span>
                                                                            </Col> */}
                                                                            <Col xs={6}>
                                                                                <span style={{ "marginTop": "1px", "textAlign": "right", "float": 'right' }}>
                                                                                    {(this.state.adavanceSubtarctValue.toLocaleString('en-US'))}
                                                                                </span>
                                                                            </Col>

                                                                        </Row>




                                                                    </th>
                                                                    <th style={{ "width": "100px", "font-size": "small" }}></th>


                                                                </tr><tr style={{ "lineHeight": "1.1" }}>
                                                                    <th style={{ "width": "25px", "font-size": "small" }}></th>

                                                                    <th style={{ "width": "400px", "font-size": "small" }}></th>
                                                                    <th style={{ "width": "310px", "font-size": "small" }}></th>
                                                                    <th style={{ "width": "200px", "font-size": "small" }}></th>
                                                                    <th style={{ "width": "252px", "fontSize": "16px", "fontWeight": "600", "textAlign": "right" }}>Total Due :</th>
                                                                    {
                                                                        Number(this.state.invoiceTotal) > -1 ?
                                                                            <th style={{ "width": "370px", "fontSize": "16px", "fontWeight": "600", "textAlign": "right", "borderBottom": "groove", "border": "dotted" }}>Rs : {(this.state.invoiceTotal).toLocaleString('en-US')}</th>
                                                                            :
                                                                            <th style={{ "width": "370px", "fontSize": "16px", "fontWeight": "600", "textAlign": "right", "borderBottom": "groove", "border": "dotted", "color": "red" }}>Rs : {(this.state.invoiceTotal).toLocaleString('en-US')}</th>
                                                                    }


                                                                    <th style={{ "width": "100px", "font-size": "small" }}></th>


                                                                </tr></>

                                                        }
                                                    </tfoot>

                                                </Table>

                                            </Col>

                                        </Row>
                                    </div>
                                </Row>



                            </div>


                        </div>



                    </div>




                </div>


                {
                    this.state.loader &&

                    <Loader />
                }


            </div >
        );
    }
}

export default quotation;

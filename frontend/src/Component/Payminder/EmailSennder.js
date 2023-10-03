import React, { createRef, Component } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import AccountCSS from './mail.module.css';
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
import { FcCheckmark, FcCancel, FcOk, FcInspection, FcOvertime, FcProcess, FcPicture } from "react-icons/fc";
import { MdAttachEmail } from "react-icons/md";




class EmailSennder extends Component {

    constructor(props) {

        super(props)

        this.state = {

            invoiceData: '',
            invoiceNumber: '',
            accountName: '',
            productName: '',
            dueAmount: '',
            dueDays: '',
            accountEmail: '',
            emailSubject: '',
            emailMessage: '',
            invoiceProducts: [],
            recurringStatus: false,
            invoiceTotal: '',
            accountData: '',

            AccountID: this.props.match.params.id,
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

        this.onEmailSend = this.onEmailSend.bind(this);

    }

    addDataToPayminderTable(emailobject) {

        let data = {
            "invoiceNo": emailobject.invoiceNo
        }
        this.setState({ loader: true });
        axios.post(appURLs.web + webAPI.getPayReminderByInvoiceNo, data).then((res) => {

            if (res.data.status === 2100) {

                let dataObject = res.data.data[0];
                let id = dataObject._id;
                delete dataObject._id;
                delete dataObject.__v;
                delete dataObject.updatedAt;
                delete dataObject.createdAt;

                dataObject.revision = parseInt(dataObject.revision) + 1;

                axios.put(appURLs.web + webAPI.updatePayReminderDetails + id, dataObject).then((res) => {

                    if (res.data.status === 2100) {

                        Swal.fire(
                            "Reviosn History Updated !  ",
                            'updated.',
                            'success'
                        )
                        this.setState({ loader: false });

                        this.getReviosnHostory();

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


            } else if (res.data.status === 2200) {

                let dataObject = emailobject;
                dataObject.revision = "1";
                dataObject.accountId = this.state.accountData._id;
                dataObject.invoiceId = this.state.invoiceData._id;
                dataObject.dueAmount = emailobject.inTotalAmount;
                axios.post(appURLs.web + webAPI.addPayReminder, dataObject).then((res) => {

                    if (res.data.status === 2100) {


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


    onEmailSend(e) {
        e.preventDefault();
        console.log("inside", this.state.invoiceNumber)
        if (this.state.invoiceNumber != '') {

            let { invoiceData, accountData, dueDays, productName } = this.state;

            const emailobject = {

                "toEmail": this.state.accountEmail,
                "invoiceNo": invoiceData.invoiceNumber,
                "companyName": accountData.CompanyName,
                "productName": productName,
                "invoiceDate": invoiceData.date,

                "inTotalAmount": "LKR: " + (Number(invoiceData.totalAmount)).toLocaleString('en-US'),
                "dueAmount": this.state.dueAmount,
                "dueDays": this.state.dueDays,

            }


            this.setState({ loader: true });
            emailjs.send(EmailCredentials.SERVICE, "template_ukfe86m", emailobject, EmailCredentials.PUBLIC_KEY).then(res => {
                if (res.status === 200) {
                    this.setState({ loader: false });
                    Swal.fire(

                        'Email Sended Successfully',
                        'success'
                    )

                    //..........................................PayMinder Table Data axios call........................................
                    this.addDataToPayminderTable(emailobject);

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





    dueDateCalculation(rowObject) {

        if (rowObject.invoiceStatus === "Y") {

            return 0;

        } else {
            const [day, month, year] = rowObject.date.split("/");
            const givenDate = new Date(`${year}-${month}-${day}`);
            const today = new Date();

            // Calculate the time difference in milliseconds
            const timeDifference = Math.abs(today - givenDate);

            // Calculate the number of days
            const daysDiff = Math.ceil(timeDifference / (1000 * 3600 * 24));

            return daysDiff;
        }

    }


    emailCreator() {

        let { invoiceData, accountData, dueDays, productName } = this.state;

        let subjectString = "Overdue Payment Reminder  For " + productName + " - " + "Invoice " + invoiceData.invoiceNumber;

        let emailMesg = "Hello " + accountData.CompanyName + ",\n\nThis is a reminder that invoice - " + invoiceData.invoiceNumber + ", Product - " + productName + " , which you should have received on " + invoiceData.date + ", is due " + dueDays + " Days. You can make payment to the bank account specified on the invoice.\n\nPlease let us know if you have any questions or need assistance with the payment process.It would greatly help us if you could settle the payment at your earliest convenience.\n\nThank you,\n\nColoration Colombo (PVT) LTD"


        this.setState({
            emailSubject: subjectString,
            emailMessage: emailMesg
        })


    }

    getReviosnHostory(){

        let data = {
            "invoiceNo": this.state.invoiceData.invoiceNumber
        }
        this.setState({ loader: true });
        axios.post(appURLs.web + webAPI.getPayReminderByInvoiceNo, data).then((res) => {

            if (res.data.status === 2100) {

                let dataObject = res.data.data[0];
              
                this.setState({
                    revision :  dataObject.revision,
                    loader: false
                })

               

            }else{
                this.setState({
                    revision :  "1",
                    loader: false
                })
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


    getInvoiceDataById() {

        this.setState({ loader: true });

        axios.get(appURLs.web + webAPI.getInvoiceByID + this.state.AccountID).then((res) => {

            if (res.data.status === 2100) {

                this.setState({
                    invoiceData: res.data.data,
                    invoiceProducts: res.data.data.productDetails,
                    invoiceTotal: res.data.data.totalAmount,
                    invoiceNumber: res.data.data.invoiceNumber
                }, () => {

                    let noDueDays = this.dueDateCalculation(this.state.invoiceData);
                    console.log("sss", this.state.invoiceProducts[0].productName)

                    this.setState({
                        loader: true,
                        dueDays: noDueDays,
                        productName: this.state.invoiceProducts[0].productName

                    })
                    this.getReviosnHostory();
                    axios.get(appURLs.web + webAPI.getAccountById + this.state.invoiceData.accountID).then((res) => {


                        if (res.data.data) {


                            this.setState({

                                loader: false,

                                accountName: res.data.data.CompanyName,
                                accountEmail: res.data.data.CompanyEmailAddress,
                                accountData: res.data.data



                            }, () => {
                                this.emailCreator();
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


                })
            }
            this.setState({ loader: false });

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



    componentDidMount() {

        this.getInvoiceDataById();



    }






    render() {

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



                                                    {/* .......................................................................... */}
                                                    <Row>

                                                        <Col >

                                                            <Row style={{ "marginTop": "22px" }}>


                                                                <Col >

                                                                    <Row>

                                                                        <Col xs={5}>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left" }}>Invoice Number  </span>
                                                                        </Col>

                                                                        <Col xs={1} >
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-40px" }}>:</span>
                                                                        </Col>



                                                                        <Col>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "marginLeft": "-50px" }}>INV {this.state.invoiceData.invoiceNumber}  </span>

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
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500" }}>Company Name </span>
                                                                        </Col>

                                                                        <Col xs={1}>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-40px" }}>:</span>
                                                                        </Col>



                                                                        <Col>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-50px" }}> {this.state.accountName}</span>

                                                                        </Col>


                                                                    </Row>


                                                                </Col>




                                                            </Row>

                                                            <Row style={{ "marginTop": "10px" }}>

                                                                <Col >

                                                                    <Row>

                                                                        <Col xs={5} >
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500" }}>Product Name  </span>
                                                                        </Col>

                                                                        <Col xs={0}>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-40px" }}>:</span>
                                                                        </Col>



                                                                        <Col xs={6}>
                                                                            <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-50px" }}> {this.state.productName} </span>

                                                                        </Col>


                                                                    </Row>



                                                                </Col>




                                                            </Row>

                                                        </Col>

                                                        {/* .......................................................... */}

                                                        <Col>

                                                            <Row style={{ "marginTop": "22px", "textAlign": "left", "marginLeft": "-50px" }}>

                                                                <Col xs={5} >
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500" }}>No Of DueDays </span>
                                                                </Col>

                                                                <Col xs={1} >
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-40px" }}>:</span>
                                                                </Col>



                                                                <Col>
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-50px" }}> {this.state.dueDays} Days</span>

                                                                </Col>


                                                            </Row>


                                                            <Row style={{ "marginTop": "10px", "textAlign": "left", "marginLeft": "-50px" }}>

                                                                <Col xs={5} >
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500" }}>Reviosn Number  </span>
                                                                </Col>

                                                                <Col xs={1} >
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-40px" }}>:</span>
                                                                </Col>



                                                                <Col>
                                                                    <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-50px" }}> {this.state.revision} </span>

                                                                </Col>


                                                            </Row>



                                                            <Row style={{ "marginTop": "10px", "textAlign": "left", "marginLeft": "-50px" }}>


                                                                <Col >

                                                                    {/* <Row>

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
 */}


                                                                </Col>



                                                            </Row>



                                                        </Col>

                                                        <Col>

                                                            <span style={{ "marginTop": "1px", "textAlign": "right", "float": 'right', "fontSize": "55px", "padding": "12px", "color": "black", "backgroundColor": "#e6ecf9", "fontWeight": "400", "width": "450px" }}>
                                                                LKR : {(this.state.invoiceTotal).toLocaleString('en-US')}
                                                            </span>




                                                        </Col>


                                                    </Row>

                                                    {/* ................................................... */}

                                                    <Row>

                                                        <Col>
                                                        </Col>








                                                    </Row>

                                                </div>

                                            </div>



                                        </div>

                                    </Row>

                                    <Row>

                                        <div className={AccountCSS.container3} >

                                            <Row>


                                                <div style={{ "marginTop": "15px" }}>

                                                    <div className={AccountCSS.subCardOne}>


                                                        <Row>

                                                            <Col xs={6}>


                                                                <Button variant="primary" type="submit" style={{ "marginTop": "20px", "marginLeft": "25px", "marginBottom": "20px" }} onClick={this.onEmailSend}>
                                                                    Send Email
                                                                </Button>

                                                            </Col>

                                                            <Col>




                                                            </Col>

                                                            <Col></Col>
                                                            <Col></Col>
                                                            <Col>
                                                                {/* <Button variant="primary" onClick={this.props.toProduct} type="submit" style={{ "marginTop": "20px", "float": "left" }}>
                                                                    Draft
                                                                </Button> */}
                                                                
                                                                </Col>
                                                            <Col>
                                                                {/* <Button variant="primary" onClick={this.props.toProduct} type="submit" style={{ "marginTop": "20px", "float": "left" }}>
                                                                    Cancel
                                                                </Button> */}
                                                                </Col>
                                                        </Row>



                                                    </div>


                                                    <div className={AccountCSS.subCardTwo}>
                                                        <Form>
                                                            <div style={{ "margin": "20px" }}>
                                                                <Row >

                                                                    <Col>

                                                                        <Row style={{ "marginTop": "20px" }}>

                                                                            <Col xs={2}>
                                                                                <span style={{ "fontSize": "20px", "fontWeight": "700", "padding": "10px", "backgroundColor": "white", "borderRadius": "5px" }}>To</span>
                                                                            </Col>

                                                                            <Col xs={1}>
                                                                                <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-130px" }}>:</span>
                                                                            </Col>



                                                                            <Col xs={8}>
                                                                                {/* <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-50px" }}> {this.state.accountName}</span> */}
                                                                                <Form.Control style={{ "fontSize": "15px", "fontWeight": "800", "float": "left", "textAlign": "left", "marginLeft": "-180px", "width": "-webkit-fill-available;" }}
                                                                                    type="text" value={this.state.accountEmail} onChange={this.state.changeAccountEmail} name="comAddressCity" />


                                                                            </Col>


                                                                        </Row>



                                                                    </Col>


                                                                </Row>


                                                                {/* .................................................. */}

                                                                <Row style={{ "marginTop": "30px" }}>
                                                                    <Col>

                                                                        <Row style={{ "marginBottom": "15px" }}>

                                                                            <Col xs={2}>
                                                                                <span style={{ "fontSize": "20px", "fontWeight": "700", "padding": "10px", "backgroundColor": "white", "borderRadius": "5px" }}>Subject</span>
                                                                            </Col>

                                                                            <Col xs={1}>
                                                                                <span style={{ "fontSize": "15px", "fontWeight": "500", "textAlign": "left", "marginLeft": "-130px" }}>:</span>
                                                                            </Col>



                                                                            <Col xs={8}>
                                                                                {/* <span style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-50px" }}> {this.state.accountName}</span> */}
                                                                                <Form.Control style={{ "fontSize": "15px", "fontWeight": "500", "float": "left", "textAlign": "left", "marginLeft": "-180px" }}
                                                                                    type="text" value={this.state.emailSubject} onChange={this.props.changcomAddressCity} name="comAddressCity" />

                                                                            </Col>


                                                                        </Row>



                                                                    </Col>


                                                                </Row>


                                                            </div>



                                                        </Form>

                                                    </div>

                                                    <div className={AccountCSS.subCardTwo}>

                                                        <div style={{ "margin": "20px" }}>

                                                            <Row>
                                                                <Form.Group style={{ "marginTop": "20px", "marginBottom": "15px" }} controlId="exampleForm.ControlTextarea1">
                                                                    <Form.Label> <span style={{ "fontSize": "20px", "fontWeight": "700", "padding": "10px", "backgroundColor": "white", "borderRadius": "5px" }}>Message</span></Form.Label>
                                                                    <Form.Control style={{ "marginTop": "10px", "fontWeight": "600" }} value={this.state.emailMessage} as="textarea" rows={14} />
                                                                </Form.Group>

                                                            </Row>
                                                        </div>

                                                    </div>

                                                </div>

                                            </Row>



                                        </div>

                                    </Row>

                                </Form>




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

export default EmailSennder;

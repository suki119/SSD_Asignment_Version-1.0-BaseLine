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
import { FcCheckmark, FcCancel, FcOk, FcInspection, FcOvertime, FcProcess, FcPicture } from "react-icons/fc";
import { MdAttachEmail } from "react-icons/md";




class InvoiceList extends Component {

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

    navigateMailSennder(invoiceId) {

        this.props.history.push(`/emailSennder/${invoiceId}`);

    }




    setDataToTable() {

        const userAttributes = []
        this.state.allInvoice.forEach(el => {
            const isPaid = el.invoiceStatus === "Y";
            // let dateObject = new Date(el.createdAt)
            // let formatedData = dateObject.getFullYear() + " / " + (dateObject.getMonth() + 1) + " / " + dateObject.getDate() 

            userAttributes.push({
                date: el.date,
                invoiceNo: el.invoiceStatus === "Y" ? <span style={{ "backgroundColor": "green", "fontWeight": "700", "padding": "10px", "color": "white" }}> {"INV- " + el.invoiceNumber} </span> :
                    <span style={{ "backgroundColor": "red", "fontWeight": "700", "padding": "10px", "color": "white" }}> {"INV- " + el.invoiceNumber} </span>,
                accName: el.accountName,
                proName: <span style={{ "whiteSpace": "break-spaces" }}>{el.productDetails.map((obj, index) => {
                    return <><Row>
                        <Col>
                            <p style={{ "height": "20px" }}>{index + 1 + ". " + obj.productName}</p></Col>
                    </Row></>
                })}</span>,

                tot: <><span style={{ "float": "left", "marginLeft": "30px" }}>LKR : </span><span style={{ "float": "right", "marginRight": "30px" }}>{(Number(el.totalAmount).toLocaleString('en-US'))}</span></>,
                dueDays: this.dueDateCalculation(el) + " Days",
                status: <span style={{ "marginLeft": "40px" }}>{el.invoiceStatus == 'Y' ? <FcOk /> : <FcCancel />}</span>,
                remark: <span style={{ "fontSize": "25px" , "padding":"10px 20px" ,"backgroundColor":"#e9e9f1" ,"borderRadius":"10px" }}>{el.invoiceStatus == 'Y' ? <MdAttachEmail  /> : <MdAttachEmail onClick={() => this.navigateMailSennder(el._id)} />}</span>



            })
        });


        this.setState({
            data: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'date',
                        sort: 'asc',
                        width: 120
                    },
                    {
                        label: 'Invoice No',
                        field: 'invoiceNo',
                        sort: 'asc',
                        width: 120
                    },
                    {
                        label: 'ACOUNT NAME',
                        field: 'accName',
                        sort: 'asc',
                        width: 300
                    },
                    {
                        label: 'PRODUCTS',
                        field: 'proName',
                        sort: 'asc',
                        width: 300,

                    }
                    , {
                        label: 'TOTAL',
                        field: 'tot',
                        sort: 'asc',
                        width: 150,

                    }, {
                        label: 'DUE',
                        field: 'dueDays',
                        sort: 'asc',
                        width: 100,

                    },
                    , {
                        label: 'STATUS',
                        field: 'status',
                        sort: 'asc',
                        width: 120,

                    }, {
                        label: 'REMARK',
                        field: 'remark',
                        sort: 'asc',
                        width: 80,

                    },

                ],
                rows: userAttributes
            }
        })
    }

    sumValueCalculation() {
        const { allInvoice } = this.state;

        let tot = 0;
        allInvoice.map((data) => {
            if (data.invoiceStatus === "N") {
                tot = tot + data.totalAmount;
            }
        });

        this.setState({
            invoiceTotal: tot,
        });
    }


    getAllInvoiceByAccount(accountId) {
        this.setState({ loader: true });
        axios.post(appURLs.web + webAPI.getInvoiceListByAccId, { "accountId": accountId }).then((res) => {

            if (res.data.status === 2100) {
                this.setState({
                    allInvoice: res.data.data
                }, () => {
                    this.setDataToTable();
                    this.sumValueCalculation();
                })

                this.setState({ loader: false });
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
            this.getAllInvoiceByAccount(selectedOptions.value);


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



    getAllInvoice() {

        this.setState({ loader: true });

        axios.get(appURLs.web + webAPI.getAllQuotation).then((res) => {

            if (res.data.status === 2100) {

                this.setState({
                    allInvoice: res.data.data,
                    loader: false
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



                                                            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label></Form.Label>
                                                                <Form.Control type="text" disabled={true} style={{ "textAlign": "center", "fontSize": "17px", "fontWeight": "700" }} value={this.state.quotationNumber} name="date" />



                                                            </Form.Group> */}

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








                                                    </Row>

                                                </div>

                                            </div>



                                        </div>

                                    </Row>

                                    <Row>

                                        <div className={AccountCSS.container3} >

                                            <Row>


                                                <div style={{ "marginTop": "15px" }}>

                                                    <div className={AccountCSS.form}>

                                                        <div style={{ "marginLeft": "20px", "marginRight": "20px" }}>
                                                            <MDBDataTable


                                                                scrollY
                                                                maxHeight="500px"
                                                                loading={false}
                                                                hover
                                                                bordered

                                                                data={this.state.data}


                                                                className={AccountCSS.yourcustomstyles}
                                                            />

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

export default InvoiceList;

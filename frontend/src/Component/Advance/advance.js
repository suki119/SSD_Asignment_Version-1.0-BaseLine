import React, { createRef, Component } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import AccountCSS from './account.module.css';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import axios from 'axios';
import { FaEdit } from "react-icons/fa";

import validator from 'validator'
import TableScrollbar from 'react-table-scrollbar';
import { MDBDataTable } from 'mdbreact';
import Loader from '../loader/Loader';
import Swal from 'sweetalert2'
import { appURLs, webAPI } from '../../enum/URL';
import Notifications from "../../Notification/notification";
import { NotificationManager, NotificationContainer } from "react-notifications";
import Select from 'react-select';


class advance extends Component {

    constructor(props) {

        super(props)

        this.state = {

            selectedOptions: [],
            loader: false,
            allAcounts: [],
            options: '',
            optionsForProducts: [],
            selectedProductOptions: [],
            companyID: '',
            companyName: '',
            btnDisable: true,
            allProducts: [],
            productName: '',
            productID: '',
            advanceAmount: '0',
            remarkData: '',
            paymentCategory: '',
            preAdavceData: [],
            advanceTotal: '0',
            listOfAdvanceData: []


        }

        this.changCompanyName = this.changCompanyName.bind(this);
        this.changProductName = this.changProductName.bind(this);
        this.addSubmitBtn = this.addSubmitBtn.bind(this);
        this.changeAdvanceAmount = this.changeAdvanceAmount.bind(this);
        this.changeRemarkData = this.changeRemarkData.bind(this);
        this.changePaymentCat = this.changePaymentCat.bind(this);

    }


    changePaymentCat = (event) => {

        this.setState({
            paymentCategory: event.target.value
        })


    }

    changeAdvanceAmount = (event) => {


        let number = (event.target.value).split(",");
        let joinedNumber = number.join('');

        if (isNaN(joinedNumber)) {
            joinedNumber = "0"
        }

        let num = (Number(joinedNumber)).toLocaleString('en-US')


        this.setState({
            advanceAmount: num
        })
    }


    addSubmitBtn(e) {
        e.preventDefault();

        const { selectedProductOptions, selectedOptions, remarkData, advanceAmount, paymentCategory } = this.state

        if (advanceAmount !== '0' && paymentCategory !== '') {

            const advanceData = {
                "accountID": selectedOptions.value,
                "accountName": selectedOptions.label,
                "productID": selectedProductOptions.value,
                "productName": selectedProductOptions.label,
                "settleStatus": "N",
                "remark": remarkData,
                "adavanceAmount": advanceAmount,
                "paymentCategory": paymentCategory
            }

            const adavanceTotData = {
                "accountID": selectedOptions.value,
                "productID": selectedProductOptions.value,
                "adavanceTotAmount": advanceAmount,
                "settleStatus": "N",
            }

            this.setState({ loader: true });



            axios.all([
                axios.post(appURLs.web + webAPI.addAdvance, advanceData),
                axios.post(appURLs.web + webAPI.addAdvanceTot, adavanceTotData)
            ])
                .then(axios.spread((resOne, resTwo) => {

                    this.setState({ loader: false });
                  

                    if (resOne.data.status === 2100 && resTwo.data.status === 2100) {

                        this.setState({
                            selectedOptions: [],
                            loader: false,
                            allAcounts: [],

                            optionsForProducts: [],
                            selectedProductOptions: [],
                            companyID: '',
                            companyName: '',
                            btnDisable: true,
                            allProducts: [],
                            productName: '',
                            productID: '',
                            advanceAmount: '0',
                            remarkData: '',
                            paymentCategory: '',
                            advanceTotal: '0',
                            data:[]


                        });
                    }

                    if (resOne.data.status !== 2100) {
                        Swal.fire(
                            'error!',
                            'error in adding data to advanceTable.',
                            'error'
                        )
                    }

                    if (resTwo.data.status !== 2100) {
                        Swal.fire(
                            'error!',
                            'error in adding data to advance Total Table.',
                            'error'
                        )
                    }

                })).catch((error) => {
                    
                    this.setState({ loader: false });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Network Error',
                        showConfirmButton: false,
                        timer: 1500
                    })


                });
        } else {
            Swal.fire(
                'warning!',
                'Some Fields are empty.',
                'warning'
            )
        }

    }

    changeRemarkData = (event) => {
        this.setState({
            remarkData: event.target.value
        });
    }


    calculateAdvanceAmount() {

        const { preAdavceData } = this.state

        let total = 0;

      
        if (preAdavceData !== null) {

            // preAdavceData.map(obj => {

            //     let number = (obj.adavanceAmount).split(",");
            //     let joinedNumber = number.join('');
            //     total = total + Number(joinedNumber)

            // }
            // )

            // let num = (Number(total)).toLocaleString('en-US')
            // this.setState({
            //     advanceTotal: num
            // })

            this.setState({
                advanceTotal: preAdavceData.adavanceTotAmount
            })

        }


    }

    getaAdvanceAmountByAccAndProd() {

        const { selectedOptions, selectedProductOptions } = this.state;
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
                    preAdavceData: res.data.data

                }, () => {
                    this.calculateAdvanceAmount()
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


    setTableData() {

        const userAttributes = []
        this.state.listOfAdvanceData.forEach(el => {

            let dateObject = new Date(el.createdAt)
            let formatedData = dateObject.getFullYear() + " / " + (dateObject.getMonth() + 1) + " / " + dateObject.getDate() 

                userAttributes.push({
                    date: formatedData,
                    cName: el.accountName,
                    pName: el.productName,
                    payMethod: el.paymentCategory,
                    Amount: el.adavanceAmount,
                    remark: el.remark,



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
                        label: 'COMPANY NAME',
                        field: 'cName',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'PRODUCT NAME',
                        field: 'pName',
                        sort: 'asc',
                        width: 150
                    },
                    {
                        label: 'PAY METHOD',
                        field: 'payMethod',
                        sort: 'asc',
                        width: 100,

                    }, {
                        label: 'Amount',
                        field: 'Amount',
                        sort: 'asc',
                        width: 150,

                    }, {
                        label: 'REMARK',
                        field: 'remark',
                        sort: 'asc',
                        width: 150,

                    },

                ],
                rows: userAttributes
            }
        })

    }


    getAllAdvanceDataByProd() {

        const { selectedOptions, selectedProductOptions } = this.state;
        this.setState({ loader: true });

        const reqData = {
            "productID": selectedProductOptions.value,
            "accountID": selectedOptions.value,

        }

        axios.post(appURLs.web + webAPI.getaAdvanceAmountByAccAndProd, reqData).then((res) => {

            if (res.data.status === 2100) {

                this.setState({
                    loader: false,
                    listOfAdvanceData: res.data.data
                }, () => {
                    this.setTableData();
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

    changProductName = (selectedProductOptions) => {


        this.setState({
            productID: selectedProductOptions.value,
            productName: selectedProductOptions.label,
            selectedProductOptions,
            btnDisable: false

        }, () => {
            this.getaAdvanceAmountByAccAndProd();
            this.getAllAdvanceDataByProd();
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
            companyName: selectedOptions.label,
            companyID: selectedOptions.value,
            selectedOptions,

            btnDisable: true

        }, () => {

            this.getAllProductsByAccountID();

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

    componentDidMount() {

        this.getAccountDetails();



    }



    render() {

        return (
            <div className='main-wrapper'>
                <div className='app-header'>
                    <Header />

                </div>
                <div className='app-body'>
                    <div className='body-wrapper'>
                        <div className='app-sidebar'>
                            <Sidebar />
                        </div>
                        <div className='app-content'>

                            <Row>

                                {/*account register */}
                                <div className={AccountCSS.container}>
                                    <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                        Advance

                                    </div>

                                    <div className={AccountCSS.form}>

                                        <Form onSubmit={this.state.add} ref={this.state.formData}>
                                            <Row>
                                                <Col>

                                                    <Form.Group className="mb-2" controlId="formBasicEmail">
                                                        <Form.Label>Company Name</Form.Label>
                                                        <Select


                                                            value={this.state.selectedOptions}
                                                            options={this.state.options}
                                                            onChange={this.changCompanyName}


                                                        />



                                                    </Form.Group>

                                                </Col>

                                                <Col>


                                                    <Form.Group className="mb-2" controlId="formBasicEmail">
                                                        <Form.Label>Product Name</Form.Label>
                                                        <Select

                                                            isDisabled={this.state.selectedOptions.value ? false : true}

                                                            value={this.state.selectedProductOptions}
                                                            options={this.state.optionsForProducts}
                                                            onChange={this.changProductName}


                                                        />



                                                    </Form.Group>





                                                </Col>



                                            </Row>


                                            <Row>

                                                <div style={{ "marginLeft": "0px", "marginTop": "20px", "fontSize": "20px" }}>
                                                    Advance Total

                                                </div>

                                            </Row>

                                            <Row>

                                                <div style={{ "marginLeft": "15px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "18px" , "width":"580px" ,"backgroundColor":"#e7e9eb" ,"padding" : "16px" , "fontSize" : "50px" }}>
                                                    LKR : {this.state.advanceTotal}

                                                </div>

                                            </Row>


                                            <Row>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Advance Amount</Form.Label>
                                                        <Form.Control type="text" value={this.state.advanceAmount} onChange={this.changeAdvanceAmount} name="companyEmailAddress" />

                                                    </Form.Group>

                                                </Col>



                                            </Row>

                                            <Row>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Remarks</Form.Label>
                                                        <Form.Control type="text" value={this.state.remarkData} onChange={this.changeRemarkData} name="companyEmailAddress" />

                                                    </Form.Group>

                                                </Col>




                                            </Row>

                                            <Row>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Paymant Method</Form.Label>
                                                        <Form.Select value={this.state.paymentCategory} onChange={this.changePaymentCat} name="category" >
                                                            <option disabled></option>
                                                            <option value="Bank">Bank Payment</option>
                                                            <option value={"Cash"}>Cash Payment</option>
                                                            <option value={"Cheque"}>Cheque payment</option>


                                                        </Form.Select>
                                                    </Form.Group>

                                                </Col>



                                            </Row>







                                            <Row>



                                            </Row>

                                            <Row>

                                                <Col>


                                                    <Button variant="primary" type="submit" style={{ "marginTop": "20px" }} onClick={this.addSubmitBtn}>
                                                        Submit
                                                    </Button>

                                                </Col>

                                                <Col>


                                                    <Button variant="primary" onClick={this.state.toProduct} type="submit" style={{ "marginTop": "20px", "float": "left" }}>
                                                        Product
                                                    </Button>


                                                </Col>

                                                <Col></Col>
                                                <Col></Col>
                                                <Col></Col>
                                                <Col></Col>
                                            </Row>



                                        </Form>



                                    </div>


                                </div>

                                {/* all account display */}
                                <div className={AccountCSS.containertwo}>
                                    <Row>
                                        <Col>

                                            <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                                All Advance Amount

                                            </div>
                                        </Col>
                                        {/* <Col>
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search"
                                                name="searchQuery"
                                                onChange={this.stateeSearchArea}
                                                style={{
                                                    width: "180px",

                                                    marginRight: "2px",
                                                    marginTop: "20px",
                                                    height: "30px",

                                                    borderColor: "rgba(6, 21, 117,0.5)",
                                                    float: "right"
                                                }}
                                            ></input>

                                        </Col> */}

                                    </Row>


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
                            </Row>
                        </div>
                    </div>
                </div >

                {
                    this.state.loader &&
                    <Loader />
                }



            </div >
        );
    }
}

export default advance;
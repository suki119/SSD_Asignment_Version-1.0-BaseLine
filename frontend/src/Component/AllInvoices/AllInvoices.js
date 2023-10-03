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
import { FcCheckmark, FcCancel, FcOk, FcInspection, FcOvertime, FcProcess, FcPicture } from "react-icons/fc";
import Select from 'react-select';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

class AllInvoices extends Component {

    constructor(props) {
        super(props);

        this.state = {

            loader: false,
            data: [],
            listOfInvoices: []
        }
    }

    handleRemarkToggle(rowObject,status) {

        rowObject.invoiceStatus = status;
        this.setState({ loader: true });
    
        axios.put(appURLs.web + webAPI.updateInvoiceByID + rowObject._id , rowObject).then((res) => {
           
            if (res.data.status === 2100) {
                Swal.fire(
                    "Invoice - "+rowObject.invoiceNumber+' Updated!',
                    'Payament has updated.',
                    'success'
                  )
                this.getAllInvoices();

            }
        }).catch((error) => {
            
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

   

    setDataToTable() {

        const userAttributes = []
        this.state.listOfInvoices.forEach(el => {
            const isPaid = el.invoiceStatus === "Y";
            // let dateObject = new Date(el.createdAt)
            // let formatedData = dateObject.getFullYear() + " / " + (dateObject.getMonth() + 1) + " / " + dateObject.getDate() 

            userAttributes.push({
                date: el.date,
                invoiceNo: el.invoiceStatus === "Y" ? <span style={{ "backgroundColor": "green", "fontWeight": "700", "padding": "10px" ,"color":"white" }}> {"INV- " + el.invoiceNumber} </span> :
                <span style={{ "backgroundColor": "red", "fontWeight": "700" ,"padding":"10px" ,"color":"white"}}> {"INV- " + el.invoiceNumber} </span>,
                accName: el.accountName,
                proName: <span style={{ "whiteSpace": "break-spaces" }}>{el.productDetails.map((obj, index) => {
                    return <><Row>
                        <Col>
                            <p style={{ "height": "20px" }}>{index + 1 + ". " + obj.productName}</p></Col>
                    </Row></>
                })}</span>,

                tot: <><span style={{ "float": "left", "marginLeft": "30px" }}>LKR : </span><span style={{ "float": "right", "marginRight": "30px" }}>{(Number(el.totalAmount).toLocaleString('en-US'))}</span></>,
                status: <span style={{ "marginLeft": "40px" }}>{el.invoiceStatus == 'Y' ? <FcOk /> : <FcCancel />}</span>,
                remark: (
                    <select
                    value={el.invoiceStatus}
                      onChange={(e) => this.handleRemarkToggle(el, e.target.value)}
                    >
                      <option value="Y" >
                        Paid
                      </option>
                      <option value="N" >
                        Unpaid
                      </option>
                    </select>
                  )
                ,


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

                    }, {
                        label: 'TOTAL',
                        field: 'tot',
                        sort: 'asc',
                        width: 150,

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

    getAllInvoices() {

        this.setState({ loader: true });

        axios.get(appURLs.web + webAPI.getAllInvoice).then((res) => {
            if (res.data.status === 2100) {

                this.setState({
                    loader: false,
                    listOfInvoices: res.data.data
                }, () => {
                    this.setDataToTable();
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

        this.getAllInvoices();
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
                                        All Invoices

                                    </div>

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

export default AllInvoices;
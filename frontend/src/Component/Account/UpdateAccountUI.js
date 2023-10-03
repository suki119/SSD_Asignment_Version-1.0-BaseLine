import React, { createRef, Component } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import AccountCSS from './account.module.css';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import validator from 'validator'
import TableScrollbar from 'react-table-scrollbar';
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2';
import Loader from '../loader/Loader';

class UpdateAccountUI extends Component {

    constructor(props){
        super(props)

        this.state = {
            
        }
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
                                        Add Account Details

                                    </div>

                                    <div className={AccountCSS.form}>

                                        <Form onSubmit={this.props.add} ref={this.props.formData}>
                                            <Row>
                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Account Holder Name</Form.Label>
                                                        <Form.Control type="text" value={this.props.holderName} onChange={this.props.changHolderName} name="holderName" />

                                                    </Form.Group>

                                                </Col>

                                                <Col>


                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Phone Number</Form.Label>
                                                        <Form.Control type="text" value={this.props.phoneNumber} onChange={this.props.changPhonenumber} name="phoneNumber" />
                                                        {!this.props.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}


                                                    </Form.Group>




                                                </Col>



                                            </Row>

                                            <Row>

                                                <div style={{ "marginLeft": "0px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                                    Company Details

                                                </div>

                                            </Row>


                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Company Name</Form.Label>
                                                <Form.Control type="text" value={this.props.companyName} onChange={this.props.changCompanyName} name="companyName" />

                                            </Form.Group>

                                            <Row>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Company Email Address</Form.Label>
                                                        <Form.Control type="text" value={this.props.companyEmailAddress} onChange={this.props.changeCompanyEmailAddress} name="companyEmailAddress" />

                                                    </Form.Group>

                                                </Col>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Company Phone Number</Form.Label>
                                                        <Form.Control type="text" value={this.props.companyPhoneNumber} onChange={this.props.changcompanyPhoneNumber} name="companyPhoneNumber" />
                                                        {!this.props.type && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}

                                                    </Form.Group>

                                                </Col>


                                            </Row>







                                            <Row>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Address Number</Form.Label>
                                                        <Form.Control type="text" value={this.props.comAddressNum} onChange={this.props.changcomAddressNum} name="comAddressNum" />

                                                    </Form.Group>

                                                </Col>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Street</Form.Label>
                                                        <Form.Control type="text" value={this.props.comAddressStreet} onChange={this.props.changcomAddressStreet} name="comAddressStreet" />

                                                    </Form.Group>

                                                </Col>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control type="text" value={this.props.comAddressCity} onChange={this.props.changcomAddressCity} name="comAddressCity" />

                                                    </Form.Group>

                                                </Col>


                                            </Row>

                                            <Row>

                                                <Col>


                                                    <Button variant="primary" type="submit" style={{ "marginTop": "20px","width":"110px" }}>
                                                        Update
                                                    </Button>

                                                </Col>

                                                <Col>


                                                    <Button variant="primary" onClick={this.props.toProduct} type="submit" style={{ "marginTop": "20px","width":"110px" }}>
                                                        Product
                                                    </Button>


                                                </Col>
                                                
                                           
                                                <Col></Col>
                                                <Col></Col>
                                                <Col></Col>
                                                <Col></Col>
                                                <Col>
                                                    <Button variant="primary" onClick={this.props.AccountDeleteHandle}  style={{ "marginTop": "20px", "float": "left" ,"width":"110px" ,"backgroundColor":"black"}}>
                                                        <span style={{"display":"inline",}}>Delete <MdDelete/></span>
                                                    </Button></Col>
                                            </Row>



                                        </Form>



                                    </div>


                                </div>

                                {/* all account display */}
                                <div className={AccountCSS.containertwo}>
                                    <Row>
                                        <Col>

                                            <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                                All Accounts

                                            </div>
                                        </Col>
                                        {/* <Col>
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search"
                                                name="searchQuery"
                                                onChange={this.props.handleSearchArea}
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



                                        data={this.props.data}
                                        className={AccountCSS.yourcustomstyles}
                                    />



                                </div>
                            </Row>
                        </div>
                    </div>
                </div>

                {this.props.loader &&
                
                <Loader/>
                }



            </div>
        );
    }
}

export default UpdateAccountUI;
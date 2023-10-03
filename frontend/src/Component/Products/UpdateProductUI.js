import React, { createRef, Component } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import AccountCSS from './account.module.css';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import axios, { Axios } from 'axios';
import { FaEdit } from "react-icons/fa";
import { BsWallet2 } from "react-icons/bs";
import { FcCheckmark, FcCancel, FcOk, FcInspection, FcOvertime, FcProcess, FcPicture } from "react-icons/fc";

import validator from 'validator'
import TableScrollbar from 'react-table-scrollbar';
import { MDBDataTable } from 'mdbreact';
import { Image } from 'cloudinary-react';
import Select from 'react-select';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2'
import SimpleImageSlider from "react-simple-image-slider";
import { Slide } from 'react-slideshow-image';
import { BsXLg } from "react-icons/bs";
import img from '../Images/No-Image-Placeholder.svg.png'
import logo from '../Images/default.jpg'
import JoditEditor from "jodit-react";
import Loader from '../loader/Loader';

class UpdateProductUI extends Component {


    constructor(props) {
        super(props)

        this.state = {

            btnDisable: true
        }

        this.btnDisableCheck = this.btnDisableCheck.bind(this);
    }

    btnDisableCheck(index) {

        // let { baggageResData } = this.props
        // let statusOfBTN

        // ("inside", baggageResData.length)
        // ("index", index)

        // if (baggageResData.length > index) {
        //     statusOfBTN = false
        // } else {
        //     statusOfBTN = true
        // }

        // this.setState({

        //     btnDisable:statusOfBTN

        // })


        // return false
    }

    render() {

        let { baggage } = this.props
       
        const { selectedOptions } = this.props.selectedOptions;
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

                                {/*product register */}
                                <div className={AccountCSS.container}>
                                    <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                        Add Product

                                    </div>
                                    <Form onSubmit={this.props.addBagageData} ref={this.props.formData}>
                                        <div style={{ "overflow": "auto", "height": "680px", "overflowX": "auto" }}>


                                            <div className={AccountCSS.form}>


                                                <Row>
                                                    <Col>


                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Product Name</Form.Label>
                                                            <Form.Control disabled={true} type="text" value={this.props.productName} onChange={this.props.changProductName} name="productName" />



                                                        </Form.Group>

                                                    </Col>

                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Company Name</Form.Label>
                                                            <Select

                                                                isDisabled={true}
                                                                value={selectedOptions}

                                                                placeholder={this.props.productData.accountName}

                                                                options={this.props.options}
                                                                onChange={this.props.changCompanyName}


                                                            />



                                                        </Form.Group>

                                                    </Col>



                                                </Row>

                                                <Row>
                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Category</Form.Label>
                                                            <Form.Select value={this.props.category} onChange={this.props.changCategory} name="category" >
                                                                <option disabled></option>
                                                                <option value="Film">Film</option>
                                                                <option value={"musicvideo"}>Music Video</option>
                                                                <option value={"shortfilm"}>Short Film</option>
                                                                <option value={"tvc"}>TVC</option>
                                                                <option value={"tvSeries"}>TV Series</option>
                                                                <option value={"other"}>Other</option>

                                                            </Form.Select>

                                                        </Form.Group>

                                                    </Col>

                                                    <Col>


                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>length</Form.Label>
                                                            <Form.Control type="number" value={this.props.length} onChange={this.props.changlength} name="length" />


                                                        </Form.Group>




                                                    </Col>



                                                </Row>

                                                <Row>




                                                    <JoditEditor value={this.props.productDiscription} height={100} onChange={(content) => this.props.changproductDiscription(content)} />



                                                </Row>

                                                <Row>




                                                </Row>









                                                <div style={{ "marginLeft": "-20px", "marginTop": "15px", "marginBottom": "25px", "fontSize": "20px" }}>
                                                    Baggage Details

                                                </div>



                                                <Row>
                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Baggage ID</Form.Label>
                                                            <Form.Control type="text" value={this.props.BagageID} onChange={this.props.changBagageID} name="BagageID" />

                                                        </Form.Group>
                                                    </Col>
                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Product Name</Form.Label>
                                                            <Form.Control type="text" disabled={true} onChange={this.props.changProductName} value={this.props.productName} name="productNames" />

                                                        </Form.Group>
                                                    </Col>
                                                </Row>


                                                <Row>

                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Types</Form.Label>
                                                            <Form.Select type="text" value={this.props.BagageType} onChange={this.props.changeBagageType} name="BagageType" >

                                                                <option disabled></option>
                                                                <option value="Harddrive">Hard Drive</option>
                                                                <option value={"pen"}>Pen</option>

                                                                <option value={"other"}>Other</option>



                                                            </Form.Select>

                                                        </Form.Group>

                                                    </Col>

                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Serial Number</Form.Label>
                                                            <Form.Control type="text" value={this.props.SerailNumber} onChange={this.props.changSerailNumber} name="SerailNumber" />
                                                            {!this.props.type && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}

                                                        </Form.Group>

                                                    </Col>


                                                </Row>

                                                <Row>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Select The File</Form.Label>
                                                        <Form.Control type="file" onChange={(event) => { this.props.changeFilePath(event) }} name="fileType" />

                                                    </Form.Group>

                                                </Row>

                                                <Row>

                                                    {/* <Image cloudName="colouration" publicId={this.props.imgURL} /> */}


                                                    {this.props.img &&
                                                        this.props.img.map(obj =>

                                                            <Row><div><span style={{ "marginRight": "10px", "fontSize": "x-large" }}><FcPicture /></span>{obj[0].name}</div></Row>


                                                        )}

                                                </Row>

                                            </div>




                                        </div>

                                        <div style={{ "marginLeft": "15px", "marginRight": "10px", "marginTop": "20px","marginBottom":"15px" }}>
                                            <Row>

                                                <Col>


                                                    <Button variant="primary" disabled={this.props.addButton} onClick={() => this.props.addBaggage()} style={{ "marginTop": "20px", "float": "left", "width": "80px" ,"marginLeft":"20px"}}>
                                                        Add
                                                    </Button>
                                                </Col>

                                                <Col>



                                                </Col>

                                                <Col></Col>
                                                <Col></Col>
                                                <Col></Col>
                                                <Col>

                                                    <Button variant="primary" disabled={this.props.submitButton} type="submit" style={{ "marginTop": "20px" }}>
                                                        Update
                                                    </Button>
                                                </Col>
                                            </Row>

                                        </div>
                                    </Form>
                                </div>

                                {/* all account display */}
                                <div className={AccountCSS.containertwo}>
                                    <Row>
                                        <Col>

                                            <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                                Bagage Details

                                            </div>
                                        </Col>


                                    </Row>

                                    {

                                        this.props.baggageResData.length != 0 ? <div style={{ "overflow": "auto", "height": "720px", "overflowX": "auto" }}>

                                            {this.props.baggageResData &&

                                                this.props.baggageResData.map((obj, index) =>



                                                    <div class="card mb-3" style={{ "max-width": "790px", "paddingBottom": "10px" }}>
                                                        <div class="row g-1">
                                                            <div class="col-md-8">
                                                                <div style={{ "overflow": "auto", "height": "320px", "overflowX": "auto" }}>

                                                                  

                                                                    {obj.CloudinaryImg.length == 0 ? <img src={logo} class="img-fluid rounded-start" alt="..." style={{ "height": "320px" }} /> : obj.CloudinaryImg.map(Object =>
                                                                        <img src={Object.url} class="img-fluid rounded-start" alt="..." style={{ "paddingBottom": "10px" }} />
                                                                    )}
                                                                </div>

                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="card-body">
                                                                    <h5 class="card-title">Baggage Data</h5>
                                                                    <p class="card-text">Serial Number : {obj.serialNumber}</p>
                                                                    <p class="card-text">Baggage ID : {obj.bagageID}</p>
                                                                    <p class="card-text">Product Name : {obj.productName}</p>
                                                                    <p class="card-text">Account Name : {obj.accountName}</p>

                                                                    <Button variant="primary" disabled={false} type="submits" style={{ "marginTop": "20px", "width": "80px", "fontSize": "smaller" }} onClick={() => this.props.cancelBaggage(obj._id, index)}>
                                                                        Cancel
                                                                    </Button>
                                                                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )


                                            }
                                        </div> : <div style={{ "height": "720px" }}><span style={{ "marginLeft": "350px" }}>NO BAGGAGE SELECT<div style={{ "marginLeft": "420px" }}><BsWallet2 /></div></span></div>

                                    }

                                </div>

                            </Row>

                            <Row>
                                <div style={{ "paddingBottom": "20px" }}>

                                </div>
                            </Row>

                            <Row>

                                <div className={AccountCSS.container3} >

                                    <Row>
                                        <Col>

                                            <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                                All Products

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


                                        style={{ "whitespace": "nowrap", }}
                                        scrollY
                                        maxHeight="500px"
                                        loading={false}
                                        hover
                                        bordered
                                        word-wrap="breakword"

                                        whitespace="nowrap"
                                        textoverflow="ellipsis"

                                        data={this.props.data}
                                        className={AccountCSS.yourcustomstyles}
                                    />

                                </div>

                            </Row>
                        </div>
                    </div>
                </div>

                {this.props.loader &&

                    <Loader />
                }

            </div>
        );
    }
}

export default UpdateProductUI;
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
import Swal from 'sweetalert2'
import UpdateAccountUI from './UpdateAccountUI';
import { appURLs , webAPI } from '../../enum/URL'



class updateAccount extends Component {

    constructor(props) {

        super(props)

        this.state = {

            AccountID: this.props.match.params.id,
            allAcounts: [],
            holderName: '',
            phoneNumber: '',
            companyName: '',
            companyEmailAddress: '',
            companyPhoneNumber: '',
            comAddressCity: '',
            comAddressStreet: '',
            comAddressNum: '',
            type: true,
            holdertype: true,
            data: [],
            AccountDtails: '',
            loader:true


        }

        this.functions = {
            getAccountDetails : this.getAccountDetails.bind(this),
            handleSearchArea : this.handleSearchArea.bind(this),
            filterData : this.filterData.bind(this),
            changCompanyName : this.changCompanyName.bind(this),
            changHolderName : this.changHolderName.bind(this),
            changPhonenumber : this.changPhonenumber.bind(this),
            changcomAddressCity : this.changcomAddressCity.bind(this),
            changcomAddressNum : this.changcomAddressNum.bind(this),
            changcompanyPhoneNumber : this.changcompanyPhoneNumber.bind(this),
            changeCompanyEmailAddress : this.changeCompanyEmailAddress.bind(this),
            changcomAddressStreet : this.changcomAddressStreet.bind(this),
            add : this.add.bind(this),
            formData : createRef(),
            postAccountData : this.postAccountData.bind(this),
            editAccountBtn : this.editAccountBtn.bind(this),
            toProduct : this.toProduct.bind(this),
            getAccountByID : this.getAccountByID.bind(this),
            AccountDeleteHandle : this.AccountDeleteHandle.bind(this)
        }

      

    }

    toProduct() {

        this.props.history.push('/products');

    }

    AccountDeleteHandle() {

        this.setState({ loader: true })
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',

        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(appURLs.web + webAPI.deleteAccountData + this.state.AccountID ).then((res) => {

                    if (res.status == '200') {
                        this.getAccountDetails();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )

                        this.props.history.push('/Accounts');
                        this.setState({ loader: false })
                    }

                })


            }else{
                this.setState({ loader: false })
            }
        }).catch((error) => {
            console.error('Error',error);
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

    changCompanyName = (event) => {
        this.setState({
            companyName: event.target.value
        });
    }

    changHolderName = (event) => {
        this.setState({
            holderName: event.target.value
        });
    }

    changPhonenumber = (event) => {
        this.setState({
            holdertype: true
        })

        const pNumber = event.target.value;
        if (!pNumber.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
            this.setState({
                holdertype: false
            })
        }
        this.setState({
            phoneNumber: event.target.value
        });
    }

    changcomAddressCity = (event) => {
        this.setState({
            comAddressCity: event.target.value
        });
    }

    changcomAddressNum = (event) => {
        this.setState({
            comAddressNum: event.target.value
        });
    }

    changcomAddressStreet = (event) => {
        this.setState({
            comAddressStreet: event.target.value
        });
    }

    changcompanyPhoneNumber = (event) => {

        this.setState({
            type: true
        })

        const pNumber = event.target.value;
        if (!pNumber.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
            this.setState({
                type: false
            })
        }
        this.setState({
            companyPhoneNumber: event.target.value
        });
    }

    changeCompanyEmailAddress = (event) => {


        this.setState({
            companyEmailAddress: event.target.value
        });
    }

    postAccountData(data) {
        this.setState({ loader: true });

        axios.put(appURLs.web + webAPI.updateAccountData + this.state.AccountID , data).then((res) => {
           
            if (res.data) {
                Swal.fire(
                    data.CompanyName+' Updated!',
                    'Your Account has updated.',
                    'success'
                  )
                this.getAccountDetails();

            }
        }).catch((error) => {
            console.error('Error',error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
              })
         

        })

        window.location.reload(false);



    }

    editAccountBtn(data) {




        this.props.history.push(`/edit_Account/${data}`);
        window.location.reload(false);
        this.getAccountByID();

       
    }


    add = (event) => {

        event.preventDefault();
       

        

        const companyAddress = this.state.comAddressNum + ", " + this.state.comAddressStreet + ", " + this.state.comAddressCity;



        const newAccont = {

            HolderName: this.state.holderName,
            HolPhonenumber: this.state.phoneNumber,
            CompanyName: this.state.companyName,
            CompanyEmailAddress: this.state.companyEmailAddress,
            CompanyPhonenumber: this.state.companyPhoneNumber,
            CompanyAddress: companyAddress
        }
        

        if (this.state.holderName && this.state.phoneNumber && this.state.companyName && this.state.companyEmailAddress &&
            this.state.companyPhoneNumber && this.state.comAddressCity && this.state.comAddressStreet && this.state.comAddressNum ) {



            if (!validator.isEmail(this.state.companyEmailAddress)) {

                alert("email is not valid");

            }

            this.postAccountData(newAccont);


        } else {
            alert("fields are empty");
        }

    }





    filterData(accountData, searchKey) {
        const result = accountData.filter(
            (item) =>
                item.CompanyName.toLowerCase().includes(searchKey) ||
                item.CompanyPhonenumber.toLowerCase().includes(searchKey) ||
                item.CompanyEmailAddress.toLowerCase().includes(searchKey)


        );

        this.setState({
            allAcounts: result
        });

    }

    handleSearchArea = (event) => {

        const searchKey = event.currentTarget.value;

        axios.get(appURLs.web + webAPI.getAccountData).then((res) => {

            if (res.data) {
                this.filterData(res.data.data, searchKey);
            }

        }
        )


    }


    getAccountDetails() {

        this.setState({ loader: true })
        axios.get(appURLs.web + webAPI.getAccountData).then((res) => {

            this.setState({
                allAcounts: res.data.data
            }, () => {

             

                const userAttributes = []
                this.state.allAcounts.forEach(el => {
                    userAttributes.push({
                        name: el.CompanyName,
                        position: el.CompanyPhonenumber,
                        office: el.CompanyEmailAddress,
                        age: <FaEdit onClick={() => this.editAccountBtn(el._id)} />


                    })
                });


                this.setState({
                    loader: false,
                    data: {
                        columns: [
                            {
                                label: 'COMPANY NAME',
                                field: 'name',
                                sort: 'asc',
                                width: 200
                            },
                            {
                                label: 'PHONE NUMBER',
                                field: 'position',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'EMAIL',
                                field: 'office',
                                sort: 'asc',
                                width: 150,

                            },
                            {
                                label: 'ACTIONS',
                                field: 'age',
                                sort: 'asc',
                                width: 50
                            }
                        ],
                        rows: userAttributes
                    }
                })

            })
        }).catch((error) => {
            console.error('Error',error);
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

    getAccountByID() {

       
        this.setState({ loader: true })
        axios.get(appURLs.web + webAPI.getAccountById + this.state.AccountID).then((res) => {

         
            if (res.data.data) {
                const addresArrey = res.data.data.CompanyAddress;
                const newArrey = addresArrey.split(", ");


                this.setState({

                    loader: false,

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
            console.error('Error',error);
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

        this.getAccountDetails();

        this.getAccountByID();



    }



    render() {
        return (
           
            <UpdateAccountUI
                {...this.props}
                {...this.state}
                {...this.functions}

            />

        );
    }
}

export default updateAccount;
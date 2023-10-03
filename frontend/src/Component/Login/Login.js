import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import jwt_decode from "jwt-decode";
import axios, { Axios } from 'axios';
import { appURLs, webAPI } from '../../enum/URL'
import Swal from 'sweetalert2';

function Login(props) {
  const [user, setUser] = useState({});
  const google = window.google;

  const onFinish = (values) => {
   
    // Add your login logic here

    axios.post(appURLs.web + webAPI.loginUserByPassword, values).then((res) => {
      if (res.data.status) {

        props.history.push('/Accounts');
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Password incorrect',
          showConfirmButton: false,
          timer: 1500
      })
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


  };

  const handleCallbackResponse = (res) => {
    const userObject = jwt_decode(res.credential);
   
    setUser(userObject);

    if (userObject.email === 'sukithadhamsara@gmail.com') {
      props.history.push('/Accounts');
    }
  };

  useEffect(() => {
    // Make sure the Google Sign-In library is loaded before initializing
    if (google && google.accounts) {
      google.accounts.id.initialize({
        client_id: '241582925207-8c8dus7sc7jub9bg5cvs0biqg3q4nmn0.apps.googleusercontent.com', // Replace with your Google client ID
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("signDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px' }}>
        <img src={user.picture} alt="User Profile" />
        <h1>Login</h1>
        <Form name="login" onFinish={onFinish}>
          <Form.Item
            name="emailAddress"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="User Email"
            />
          </Form.Item>
          <Form.Item
            name="userPassword"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
            <div id='signDiv'></div>
          </Form.Item>
        </Form>
      </div>
      {/* Add your beautiful vector image here */}
    </div>
  );
}

export default Login;

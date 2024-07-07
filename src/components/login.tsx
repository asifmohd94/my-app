import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Form, Input, Button, notification } from 'antd';
import { Router, useNavigate , useLocation } from "react-router-dom";
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, addUserInfo } from '../store/userSlice'

// import { encrypt } from '../utils/utility';
const cryptoJs = require("crypto-js");



const LoginForm = () => {

    const [form] = Form.useForm();
    const [signin, setSignin] = useState(true);
    const item = useSelector((store: any) => store.user.items);
    const dispatch = useDispatch();
    const history = useNavigate ();
    const decrypt = (encryptedString: string, secretKey: string, salt: string) => {
        const key = encryptedKey(secretKey, salt);
        const bytes = cryptoJs.AES.decrypt(encryptedString, key.toString());
        const decryptedString = bytes.toString(cryptoJs.enc.Utf8);
        return decryptedString;
    }

    const encryptedKey = (secretKey: any, salt: any) => {
        return cryptoJs.PBKDF2(secretKey, cryptoJs.enc.Base64.parse(salt), {
            keySize: 128 / 32,
            iterations: 1000,
        });
    }

    const handleSignUp = (data: any) => {

        const userName = data.userName;
        const email = data.email;
        const password = data.password;

        const secretKey = process.env.REACT_APP_SECRET_KEY;
        const salt = process.env.REACT_APP_SALT;

        const userAlreadyExist = item.find((obj: any) => {
            //@ts-ignore
            const decryptedUserName = decrypt(obj.name, secretKey, salt);
        //@ts-ignore
            const decryptedEmail = decrypt(obj.userName, secretKey, salt);
            return decryptedUserName === userName || decryptedEmail === email;
        });
        if (!userAlreadyExist) {
            const cipherUserName = cryptoJs.AES.encrypt(userName, encryptedKey(process.env.REACT_APP_SECRET_KEY, process.env.REACT_APP_SALT).toString()).toString();
            const cipherEmail = cryptoJs.AES.encrypt(email, encryptedKey(process.env.REACT_APP_SECRET_KEY, process.env.REACT_APP_SALT).toString()).toString();
            const cipherPassword = cryptoJs.AES.encrypt(password, encryptedKey(process.env.REACT_APP_SECRET_KEY, process.env.REACT_APP_SALT).toString()).toString();
            dispatch(addItem({ name: cipherUserName, userName: cipherEmail, password: cipherPassword }));
            notification.success({ message: "User Signed up successfully" });
        } else {
            notification.error({message: "User Already exist"})
        }
    }

    const handleSignIn = (data: any) => {


        const secretKey = process.env.REACT_APP_SECRET_KEY;
        const salt = process.env.REACT_APP_SALT;
        console.log(data, "data1")
        if (!secretKey || !salt) {
            throw new Error("Secret key or salt is not defined in environment variables.");
        }

        const foundItem = item.find((obj: any) => {
            const decryptedUserName = decrypt(obj.name, secretKey, salt);
            const decryptedPassword = decrypt(obj.password, secretKey, salt);
            console.log(decryptedUserName)
            return decryptedUserName === data.userName && decryptedPassword === data.password;
        });

        if (foundItem) {
            localStorage.setItem("token", "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lk");
            history('/');
            notification.success({ message: "User signed in successfully" });
            dispatch(addUserInfo({displayName: data.userName, isUserLoggedIn: true}))
        } else {
            notification.error({ message: "Invalid credentials" });
        }
    }

    const handleAction = (values: any) => {
        console.log("values", values)
        if (signin) {
            handleSignIn(values);
        } else {
            handleSignUp(values);
        }
    }


    return (
        <>
            {
                signin ?
                    <div className="signin">
                        <div className="signin-left">
                            <h1> Sign in</h1>
                            <div className="form-div">
                                <Form layout="vertical" form={form} onFinish={handleSignIn}>
                                    <Form.Item name="userName" rules={[{
                                        required: true,
                                        message: "Enter Name"
                                    }]}>
                                        <Input
                                            className="input_field"
                                            placeholder="Name"
                                            type="text"
                                            size="large"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{
                                            required: true,
                                            message: "Enter password"
                                        }]}
                                    >
                                        <Input.Password
                                            id="userPassword"
                                            className="input_field"
                                            type="password"
                                            placeholder="Enter password"
                                            size="large"
                                            autoComplete="off"
                                        />
                                    </Form.Item>
                                    <div>
                                        <p className='forget-pwd'>
                                            <a> Forgot your Password?</a>
                                        </p>
                                    </div>

                                    <Button type='primary' htmlType='submit'>SIGN IN</Button>
                                </Form>

                            </div>
                        </div>
                        <div className="signin-right">
                            <div className='signin-right'>
                                <div className='right-heading'>
                                    <h1>Hello, Friend!</h1>
                                    <p>Enter your personal details and start journey with us</p>
                                    <Button type='primary' className='right-btn' onClick={() => setSignin(false)}>SIGN UP</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    :

                    <div className='signup'>

                        <div className="signup-left">
                            <div className='signup-left'>
                                <div className='left-heading'>
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <Button type='primary' className='right-btn' onClick={() => setSignin(true)}>SIGN IN</Button>
                                </div>
                            </div>
                        </div>

                        <div className="signup-right">
                            <h1> Sign up</h1>
                            <div className="form-div">
                                <Form layout="vertical" form={form} onFinish={handleSignUp}>
                                    <Form.Item name="userName" rules={[{
                                        required: true,
                                        message: "Enter Name"
                                    }]}>
                                        <Input
                                            className="input_field"
                                            placeholder="Name"
                                            type="text"
                                            size="large"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        rules={
                                            [{
                                                required: true,
                                                message: "Enter user name"
                                            }]
                                        }
                                    >
                                        <Input
                                            className="input_field"
                                            placeholder="Email"
                                            type="text"
                                            size="large"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{
                                            required: true,
                                            message: "Enter password"
                                        }]}
                                    >
                                        <Input.Password
                                            id="userPassword"
                                            className="input_field"
                                            type="password"
                                            placeholder="Enter password"
                                            size="large"
                                            // value={password}
                                            // onChange={(event) => setPassword(event.target.value)}
                                            autoComplete="off"
                                        />
                                    </Form.Item>
                                    <Button type='primary' size="large" htmlType={"submit"}>SIGN UP</Button>
                                </Form>

                            </div>
                        </div>

                    </div>
            }
        </>
    );
}

export default LoginForm;

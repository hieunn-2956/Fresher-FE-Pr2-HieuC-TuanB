import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../actions";
import { Navigate } from "react-router-dom";

import "./style.scss";
/**
* @author
* @function Login

**/

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(loginRequest(user));
  };
  if (auth.authenticate) {
    return <Navigate to={"/"} />;
  }

  return (
    <Layout>
      <div class='login-container'>
        <Form onSubmit={userLogin}>
          <label>
            Email
            <Input
              placeholder='Email'
              value={email}
              type='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label>
            Password
            <Input
              placeholder='Password'
              value={password}
              type='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>

          <div>{auth.error}</div>
          <Button type='submit' className='login-button'>
            Submit
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;

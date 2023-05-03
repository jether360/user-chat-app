import React from "react";
import { signInWithGoogle } from "../../app/stores/commonStore";
import {
  GoogleLoginButton,
} from "react-social-login-buttons";
import { Layout, Row, Col } from "antd";
import { Content } from "antd/lib/layout/layout";

const Login = () => {
  return (
    <>
      <Layout style={{ height: "80vh", backgroundColor: "#fff" }}>
        <Content>
      <Row
        justify="center"
        align="middle"
        style={{ height: "100%", backgroundColor: "#fff" }}
      >
        <Col>
        <GoogleLoginButton onClick={signInWithGoogle}/>
        </Col>
      </Row>
      </Content>
      </Layout>
    </>
  );
};

export default Login;

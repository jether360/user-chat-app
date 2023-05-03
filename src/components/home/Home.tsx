import React from "react";
import { Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import Logo from "../../app/assets/images/logo1.png";

const Home = () => {
  return (
    <>
      <Layout>
        <Content>
          <Row
            justify="center"
            align="middle"
            style={{  backgroundColor: "#fff", height:"100%"}}
          >
            <h1 style={{marginTop:"15%", fontSize:"30px"}}>Developed by: Jether Balabagno</h1>
          </Row>   
        </Content>
      </Layout>
    </>
  );
};

export default Home;

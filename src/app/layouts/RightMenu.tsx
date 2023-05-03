import React from "react";
import { Menu,Row, Col } from "antd";
//import { useHistory } from "react-router-dom";
//import {logout} from "../stores/commonStore";



const RightMenu = () => {
 // let history = useHistory();
  const items = [
    {
      label: 
      <Row>
      <Col>
      {/* <LogoutOutlined style={{fontSize:"30px", margin:"auto 0px 0px 0px", marginTop:"100%"}} onClick={logout}/> */}
      </Col>
      </Row>
      ,
      key: "item-4",
    } // which is required
  ];
  return <Menu mode="horizontal" items={items} className="menu-items"/>;
};
export default RightMenu;

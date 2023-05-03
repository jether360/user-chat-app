import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import { Drawer, Button } from "antd";
import RightMenu from "./RightMenu";
import { WechatOutlined } from '@ant-design/icons';


class MainLayout extends Component {
  state = {
    current: "mail",
    visible: false,
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <nav className="menuBar">
        <div className="logo">
          <WechatOutlined style={{fontSize:"80px"}}/>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rigthMenu">
            <RightMenu />
          </div>
          <Button className="barsMenu" onClick={this.showDrawer}>
            <span className="barsBtn"></span>
          </Button>
          <Drawer
            title="Choose"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>
        </div>
      </nav>
    );
  }
}
export default MainLayout;

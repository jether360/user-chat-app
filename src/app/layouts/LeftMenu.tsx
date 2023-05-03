import React from "react";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";

const LeftMenu = () => {
  let history = useHistory();
  const items = [
    {
      label: "Home",
      key: "item-1",
      onClick: () => {
        history.push("/");
      },
    }, 
    {
      label: "Chat User",
      key: "item-3",
      onClick: () => {
        history.push("/chat");
      },
    }, 
  ];
  return <Menu mode="horizontal" items={items} className="menu-items"/>;
};
export default LeftMenu;

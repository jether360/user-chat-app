import React from 'react';
import { Layout } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import MainLayout from "../../app/layouts/MainLayout";
const { Content } = Layout;


interface IProps extends RouteComponentProps {
    component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  }

const Menubar = ({ component, ...rest }: IProps) =>{
    const Component = component;
    return(
        <>
        <MainLayout/>
        <Layout className="site-layout" style={{backgroundColor:"white"}}>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Component {...rest}/>
          </Content>
        </Layout>
        {
          /*
        <Footer className="footer">Copyright ©2022 Created by Capslord</Footer>
        */
        }
        </>
    )
}

export default Menubar;


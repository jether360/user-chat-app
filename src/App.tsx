import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./app/navigation/PrivateRoute";
import privateRoutes from "./app/private/privateRoute";
import Menubar from "./components/menu/MenuBar";
import NotFound from "./app/layouts/NotFound";
import securedRoutes from "./app/navigation/secured/securedRoute";
import SecuredRoute from "./app/navigation/securedRoute/SecuredRoute";
import SecuredMainLayout from "./components/secured/SecuredMainLayout";
import publicRoutes from "./app/navigation/public/publicRoute";
import PublicRoute from "./app/navigation/publicRoute/PublicRoute";
import PublicMainLayout from "./components/public/PublicMainLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { authentication } from "./app/stores/commonStore";
import { Spin, Row, Layout } from "antd";
import { Content } from "antd/lib/layout/layout";

function App() {
  const [user, loading, error] = useAuthState(authentication);
  if (loading)
    return (
      <Layout style={{ height: "80vh", backgroundColor: "#fff" }}>
        <Content>
          <Row
            justify="center"
            align="middle"
            style={{ backgroundColor: "#fff", height: "100%" }}
          >
            <Spin size="large" tip="Loading..." />
          </Row>
        </Content>
      </Layout>
    );
  return (
    <>
      <Router>
        <Switch>
          {publicRoutes.map((route: any, key: any) => {
            const { component, path } = route;
            return (
              <PublicRoute
                exact
                path={path}
                key={key}
                component={(route: any) => (
                  <PublicMainLayout component={component!} {...route} />
                )}
              />
            );
          })}
          {privateRoutes.map((route: any, key: any) => {
            const { component, path } = route;
            return (
              <PrivateRoute
                exact
                path={path}
                key={key}
                component={(route: any) => (
                  <Menubar component={component!} {...route} />
                )}
              />
            );
          })}
          {securedRoutes.map((route: any, key: any) => {
            const { component, path } = route;
            return (
              <SecuredRoute
                exact
                path={path}
                key={key}
                component={(route: any) => (
                  <SecuredMainLayout component={component!} {...route} />
                )}
              />
            );
          })}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

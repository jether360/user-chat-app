import React from "react";
import {
  RouteProps,
  RouteComponentProps,
  Route,
  Redirect,
  // Redirect,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {authentication} from "../../stores/commonStore";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const RouterPublic: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const [user, loading, error] = useAuthState(authentication);
  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Component {...props} /> : <Redirect to={"/"} /> 
      }
    />
  );
};

export default RouterPublic;

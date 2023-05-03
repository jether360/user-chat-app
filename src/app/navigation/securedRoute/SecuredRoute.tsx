import React from "react";
import {
  RouteProps,
  RouteComponentProps,
  Route,
  // Redirect,
} from "react-router-dom";


interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const RouterSecured: React.FC<IProps> = ({ component: Component, ...rest }) => {
 
  return (
    <Route
      {...rest}
      render={(props) =>
         <Component {...props} />  
      }
    />
  );
};

export default RouterSecured;

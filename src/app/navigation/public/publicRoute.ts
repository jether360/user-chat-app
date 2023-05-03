import { RouteProps } from "react-router-dom";
import Login from "../../../components/auth/Login";

const publicRoutes: RouteProps[] = [
    {
        path :"/login",
        component: Login
    },
 
]
export default publicRoutes;
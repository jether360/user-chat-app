import { RouteProps } from "react-router-dom";
import CreateContest from "../../../components/secured/CreateContest";

const securedRoutes: RouteProps[] = [
    {
        path :"/contest/:id",
        component: CreateContest
    },
 
]
export default securedRoutes;
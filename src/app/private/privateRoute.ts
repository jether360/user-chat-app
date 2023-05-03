import { RouteProps } from "react-router-dom";
import Home from "../../components/home/Home";
import ChatCard from "../../components/card/ChatCard";

const privateRoutes: RouteProps[] = [
    {
        path :"/",
        component: Home
    },
    {
        path:"/chat",
        component:ChatCard
    },
]
export default privateRoutes;
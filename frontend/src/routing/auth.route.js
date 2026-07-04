import { createRoute} from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import Login from "../pages/Login";
export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/auth",
    component: Login
});    
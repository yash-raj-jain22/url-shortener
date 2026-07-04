import { createRoute} from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import Homepage from "../pages/Homepage";

export const homealiasRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/home" ,
    component: Homepage,
});    
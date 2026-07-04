import { createRootRoute } from "@tanstack/react-router";
import App from "../App";
import { homepageRoute } from "./homepage.route";
import { authRoute } from "./auth.route";
import { dashboardRoute } from "./dashboard.route";
import { homealiasRoute } from "./homealias.route";
import { UrlRoute } from "./url.route";

export const rootRoute = createRootRoute({
    component: App,
});

export const routeTree = rootRoute.addChildren([
    homepageRoute,
    authRoute,
    dashboardRoute,
    homealiasRoute,
    UrlRoute,
]);

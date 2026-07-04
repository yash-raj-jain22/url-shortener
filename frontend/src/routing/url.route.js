import { createRoute} from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import { checkAuth } from "../utils/helper";
import UrlDetail from "../pages/UrlDetail";

export const UrlRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/url/$shortUrl",
    component: UrlDetail,
    beforeLoad: checkAuth
});  
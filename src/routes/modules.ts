import { RouteModule } from "../interfaces/route.definition";
import { userRoutes } from "../modules/users/user.routes";

export const routeModules: RouteModule[] = [
    { basePath: "users", routes: userRoutes },
];
import { RouteModule } from "../interfaces/route.definition";
import { createUserRoutes } from "../modules/users/user.routes";
import UserController from "../modules/users/user.controller";

export const routeModules: RouteModule[] = [
    {
        basePath: "users",
        routes: createUserRoutes(new UserController())
    }
];
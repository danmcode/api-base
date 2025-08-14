import { RouteDefinition } from "../../interfaces/route.definition";
import UserController from "./user.controller";

export const createUserRoutes = (controller: UserController): RouteDefinition[] => [
    {
        path: "/",
        method: "get",
        handler: controller.getUsers.bind(controller)
    },
];
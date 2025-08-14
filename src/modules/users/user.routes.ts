import { RouteDefinition } from "../../interfaces/route.definition";
import UserController from "./user.controller";

export const userRoutes: RouteDefinition[] = [
    { path: "/", method: "get", handler: UserController.getUsers },
];
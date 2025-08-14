import { Request, Response, NextFunction } from "express";
import BaseController from "../../controllers/base.controller";
import { HttpStatus } from "../../enums/http.status.enum";


export default class UserController extends BaseController {

    public static async getUsers(req: Request, res: Response): Promise<void> {
        res.locals.data = { message: 'Hello from users' };
        res.status(200).json(res.locals.data);
    }


}
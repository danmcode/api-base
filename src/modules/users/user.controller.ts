import { Request, Response, NextFunction } from "express";
import BaseController from "../../controllers/base.controller";
import { HttpStatus } from "../../enums/http.status.enum";
import { ApiError } from "../../interfaces/api.error.response";
import { PaginationInfo } from "../../interfaces/api.response.interface";
import { UserService } from "./user.service";
import { logger } from "../../config/logger.config";


export default class UserController extends BaseController {

    userService: UserService;

    constructor() {
        super();
        this.userService = new UserService;
    }

    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const { page, limit } = this.extractPaginationParams(req);
            const { users, total } = this.userService.getUsers(page, limit);
            const pagination = this.calculatePagination(page, limit, total);

            this.sendPaginated(res, users, pagination);

        } catch (error) {
            this.handleServiceError(error, req, res, 'Failed to fetch users');
        }
    }

}
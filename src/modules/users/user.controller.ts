import { Request, Response, NextFunction } from "express";
import BaseController from "../../controllers/base.controller";
import { HttpStatus } from "../../enums/http.status.enum";
import { ApiError } from "../../interfaces/api.error.response";
import { PaginationInfo } from "../../interfaces/api.response.interface";


export default class UserController extends BaseController {

    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            // Extract pagination parameters
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            // Mock data - replace with your actual database logic
            const mockUsers = this.generateMockUsers(limit);
            const total = 100; // Mock total count

            // Calculate pagination info
            const pagination: PaginationInfo = {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1
            };

            // Send paginated response
            this.sendPaginated(res, mockUsers, pagination);

        } catch (error) {
            const apiError: ApiError = {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to fetch users',
                    timestamp: new Date().toISOString(),
                    path: req.path,
                    method: req.method
                }
            };
            this.sendError(res, apiError, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private generateMockUsers(limit: number): any[] {
        const users = [];
        for (let i = 1; i <= limit; i++) {
            users.push({
                id: i,
                name: `User ${i}`,
                email: `user${i}@example.com`,
                createdAt: new Date().toISOString()
            });
        }
        return users;
    }


}
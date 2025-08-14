import { logger } from "../../config/logger.config";
import { IUser } from "./user.interface";

export class UserService {

    getUsers(page: number, limit: number): { users: IUser[], total: number } {
        const users = this.generateMockUsers(limit);
        console.log('Service generated users:', users);
        const total = 100;
        return { users, total };
    }

    private generateMockUsers(limit: number): IUser[] {
        const users: IUser[] = [];
        for (let i = 1; i <= limit; i++) {
            users.push({
                id: new Date().toISOString(),
                name: `User ${i}`,
                email: `user${i}@example.com`,
                createdAt: new Date()
            });
        }
        return users;
    }
}
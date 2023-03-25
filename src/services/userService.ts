import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/user";

export class UserService {
    constructor(private UserRepository: UserRepository) {}

    async getUserById(id: number): Promise<User | null> {
        return this.UserRepository.findById(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.UserRepository.findByEmail(email);
    }

    async getAllUsers(filters: any): Promise<User[]> {
        const whereClause: any = {};
        Object.keys(filters).forEach((key) => {
            whereClause[key] = filters[key];
        });
        return this.UserRepository.findAll({});
    }

    async createUser(newuser: any): Promise<User> {
        return this.UserRepository.save(newuser);
    }

    async updateUser(id: number, updatedUser: Partial<User>): Promise<User | null> {
        return this.UserRepository.update(id, updatedUser);
    }

    async deleteUser(id: number): Promise<void> {
        return this.UserRepository.delete(id);
    }
}

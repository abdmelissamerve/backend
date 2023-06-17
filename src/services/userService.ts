import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/users";
import firebaseAdmin from "../../firebase-service";
import { RegisterInputDTO } from "../types/user";

export class UserService {
    constructor(private UserRepository: UserRepository) {}

    async getUserById(id: number): Promise<User | null> {
        return this.UserRepository.findById(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.UserRepository.findByEmail(email);
    }

    async getUserByPhone(phoneNumber: string): Promise<User | null> {
        return this.UserRepository.findByPhone(phoneNumber);
    }

    async getAllUsers(filters: any): Promise<User[]> {
        const whereClause: any = {};
        Object.keys(filters).forEach((key) => {
            whereClause[key] = filters[key];
        });
        return this.UserRepository.findAll({});
    }

    async createUser(newuser: any): Promise<User> {
        const user = await this.getUserByEmail(newuser.email);
        console.log("user", user);
        if (user) {
            throw new Error(`User with email ${newuser.email} already exists`);
        }

        const userByPhone = await this.getUserByPhone(newuser.phoneNumber);
        if (userByPhone) {
            throw new Error(`User with phone number ${newuser.phoneNumber} already exists`);
        }

        try {
            const dbUser = await this.UserRepository.save(newuser);
            await firebaseAdmin.auth().createUser({
                email: newuser.email,
                password: newuser.password,
            });
            return dbUser;
        } catch (error: any) {
            console.log("error from service", error);
            throw error;
        }
    }

    async updateUser(id: number, updatedUser: Partial<User>): Promise<User | null> {
        return this.UserRepository.update(id, updatedUser);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.getUserById(id);

        if (user?.role === "admin") {
            throw new Error("Cannot delete an admin user");
        }

        const firebaseUser = await firebaseAdmin.auth().getUserByEmail(user?.email || "");
        if (firebaseUser) {
            await firebaseAdmin.auth().deleteUser(firebaseUser.uid);
        }

        return this.UserRepository.delete(id);
    }
}

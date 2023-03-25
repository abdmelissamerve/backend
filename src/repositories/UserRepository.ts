import { Repository } from "typeorm";
import { User } from "../models/user";
import { AppDataSource } from "../dataSource";
import IUserRepository from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
    private readonly repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findById(id: number): Promise<User | null> {
        return this.repository.findOneBy({ id: id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email: email });
    }

    async findAll(filters: any): Promise<User[]> {
        return await this.repository.find({ where: filters });
    }

    async save(user: User): Promise<User> {
        return this.repository.save(user);
    }

    async update(id: number, updatedUser: Partial<User>): Promise<User | null> {
        await this.repository.update(id, updatedUser);
        return this.repository.findOneBy({ id: id });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

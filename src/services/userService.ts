import IUserInterface from "../interfaces/IUserInterface";
import { User } from "../models";
import { UserDTO, UpdateUserDTO, CreateUserDTO } from "../types/user";

export default class UserService implements IUserInterface {
    
    public async getAll(filters: any): Promise<User[]> {
        const whereClause: any = {};
        Object.keys(filters).forEach((key) => {
            whereClause[key] = filters[key];
        });
        return await User.findAll({ where: whereClause });
    }

    public async getById(id: number): Promise<User | null> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    public async getByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    public async create(user: CreateUserDTO): Promise<User> {
        const newUser = await User.create(user);
        return newUser;
    }

    public async update(
        id: number,
        updates: UpdateUserDTO
    ): Promise<User> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        await user.update(updates);
        return user.reload();
    }

    public async delete(id: number): Promise<boolean> {
        const userToDelete = await User.findByPk(id);
        if (!userToDelete) {
            throw new Error(`User with id ${id} not found`);
        }
        await userToDelete.destroy();
        return true;
    }
}

import IUserInterface from "../interfaces/IUserInterface";
import { User, UserInput, UserOutput } from "../models";

export default class UserService implements IUserInterface {
    public async getAll(filters: any): Promise<UserOutput[]> {
        const whereClause: any = {};
        Object.keys(filters).forEach((key) => {
            whereClause[key] = filters[key];
        });
        return await User.findAll({ where: whereClause });
    }

    public async getById(id: number): Promise<UserOutput | null> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    public async create(user: UserInput): Promise<UserOutput> {
        const newUser = await User.create(user);
        return newUser.dataValues;
    }

    public async update(
        id: number,
        updates: Partial<UserInput>
    ): Promise<UserOutput> {
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

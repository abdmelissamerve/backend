import { Repository } from "typeorm";
import { Task } from "../models/tasks";
import { AppDataSource } from "../dataSource";
import { IAdminTaskRepository, IUserTaskRepository } from "../interfaces/ITaskRepository";

export class AdminTaskRepository implements IAdminTaskRepository {
    private readonly repository: Repository<Task>;

    constructor() {
        this.repository = AppDataSource.getRepository(Task);
    }

    public async findAll(filters: any): Promise<Task[]> {
        const queryBuilder = this.repository.createQueryBuilder("task");

        queryBuilder.innerJoinAndSelect("task.user", "user");

        if (filters.projectId) {
            queryBuilder
                .innerJoin("task.project", "project")
                .andWhere("project.id = :projectId", { projectId: filters.projectId });
            delete filters.projectId;
        }

        Object.keys(filters).forEach((key) => {
            const paramName = `${key}Param`;
            queryBuilder.andWhere(`task.${key} = :${paramName}`, { [paramName]: filters[key] });
        });

        return await queryBuilder.getMany();
    }
    public async findById(id: number): Promise<Task | null> {
        return this.repository.findOne({
            where: {
                id: id,
            },
            relations: {
                user: true,
            },
        });
    }
    public async save(task: Partial<Task>): Promise<Task> {
        return this.repository.save(task);
    }

    public async update(id: number, updates: any): Promise<Task | null> {
        await this.repository.update(id, updates);
        return this.repository.findOneBy({ id: id });
    }

    public async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export class UserTaskRepository implements IUserTaskRepository {
    private readonly repository: Repository<Task>;

    constructor() {
        this.repository = AppDataSource.getRepository(Task);
    }

    public async findAll(filters: any): Promise<Task[]> {
        const queryBuilder = this.repository.createQueryBuilder("task");
        Object.keys(filters).forEach((key) => {
            const paramName = `${key}Param`;
            queryBuilder.andWhere(`task.${key} = :${paramName}`, { [paramName]: filters[key] });
        });
        return await queryBuilder.getMany();
    }

    public async findById(id: number, userId: number): Promise<Task | null> {
        return await this.repository
            .createQueryBuilder("task")
            .where("task.id = :id", { id })
            .andWhere("task.user = :userId", { userId })
            .getOne();
    }

    public async save(task: Partial<Task>): Promise<Task> {
        return await this.repository.save(task);
    }

    public async update(id: number, updates: any): Promise<Task | null> {
        await this.repository.update(id, updates);
        return await this.repository.findOneBy({ id: id });
    }

    public async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

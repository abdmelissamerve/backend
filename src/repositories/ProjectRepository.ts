import { Repository } from "typeorm";
import { Project } from "../models/projects";
import { AppDataSource } from "../dataSource";
import { IAdminProjectRepository, IUserProjectRepository } from "../interfaces/IProjectRepository";

export class AdminProjectRepository implements IAdminProjectRepository {
    private readonly repository: Repository<Project>;

    constructor() {
        this.repository = AppDataSource.getRepository(Project);
    }

    public async findAll(filters: any): Promise<Project[]> {
        const projects = await this.repository
            .createQueryBuilder("project")
            .innerJoinAndSelect("project.user", "user")
            .where(filters)
            .getMany();
        return projects;
    }

    public async findById(id: number): Promise<Project | null> {
        return this.repository.findOneBy({ id: id });
    }

    public async save(project: Partial<Project>): Promise<Project> {
        return this.repository.save(project);
    }

    public async update(id: number, updates: any): Promise<Project | null> {
        await this.repository.update(id, updates);
        return this.repository.findOneBy({ id: id });
    }

    public async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export class UserProjectRepository implements IUserProjectRepository {
    private readonly repository: Repository<Project>;

    constructor() {
        this.repository = AppDataSource.getRepository(Project);
    }

    public async findAll(filters: any): Promise<Project[]> {
        const queryBuilder = this.repository.createQueryBuilder("project");
        Object.keys(filters).forEach((key) => {
            const paramName = `${key}Param`;
            queryBuilder.andWhere(`project.${key} = :${paramName}`, { [paramName]: filters[key] });
        });
        return await queryBuilder.getMany();
    }

    public async findById(id: number, userId: number): Promise<Project | null> {
        return await this.repository
            .createQueryBuilder("project")
            .where("project.id = :id", { id })
            .andWhere("project.user = :userId", { userId })
            .getOne();
    }

    public async save(project: Partial<Project>): Promise<Project> {
        return await this.repository.save(project);
    }

    public async update(id: number, updates: any): Promise<Project | null> {
        await this.repository.update(id, updates);
        return this.repository.findOneBy({ id: id });
    }

    public async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

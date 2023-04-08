import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Project } from "./project";
import { User } from "./user";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    dueDate: Date;

    @Column()
    status: string; // "open", "in progress", or "completed"

    @Column()
    projectId: number;

    @Column()
    assignedTo: number;

    @ManyToOne(() => Project)
    project: Project;

    @ManyToOne(() => User)
    user: User;
}

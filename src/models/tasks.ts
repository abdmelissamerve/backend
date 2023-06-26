import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Project } from "./projects";
import { User } from "./users";

@Entity({ name: "tasks" })
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

    @ManyToOne(() => Project, { onDelete: "CASCADE" })
    project: Project;

}

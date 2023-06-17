import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./users";

@Entity({ name: "projects" })
export class Project {
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

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    user: User;
}

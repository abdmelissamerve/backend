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
    createdBy: number;

    @ManyToOne(() => User)
    user: User;
}

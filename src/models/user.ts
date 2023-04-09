import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    UpdateDateColumn,
    DeleteDateColumn,
    CreateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    firstName: string;

    @Column({ type: "varchar", length: 255 })
    lastName: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255, nullable: true, unique: true })
    phoneNumber: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    photoUrl: string;

    @Column({ type: "varchar", length: 50, default: "user" })
    role: string;

    @Column({ type: "boolean", default: false })
    isPhoneVerified: boolean;

    @Column({ type: "varchar", length: 255, nullable: true })
    verificationCode: string;

    @Column({ type: "timestamp", nullable: true })
    codeExpirationDate: Date;

    @CreateDateColumn({ nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}

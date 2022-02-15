import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @Column()
    isDone: boolean;

    @CreateDateColumn()
    createdAt: Date
}

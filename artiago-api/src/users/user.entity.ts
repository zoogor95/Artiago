import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    username:string;

    @Column({ length: 255 })
    password:string;

    @Column()
    type:number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Add this column to your entity!
    @DeleteDateColumn()
    deletedAt?: Date;
}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    name:string;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Add this column to your entity!
    @DeleteDateColumn()
    deletedAt?: Date;

}
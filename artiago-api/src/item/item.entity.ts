
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    name:string;

    @Column({ length: 100 })
    description:string;

    @Column({ length: 100 })
    companyName:string;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Add this column to your entity!
    @DeleteDateColumn()
    deletedAt?: Date;

}
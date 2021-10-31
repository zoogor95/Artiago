import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name:string;
    
    @Column({ length: 5000 })
    description:string;

    @Column()
    category_id: number;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Add this column to your entity!
    @DeleteDateColumn()
    deletedAt?: Date;
}
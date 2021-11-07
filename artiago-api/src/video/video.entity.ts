import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    name:string;
    
    @Column({ length: 5000 })
    description:string;

    @Column({ length: 5000 })
    videoLink:string;

    @Column()
    thumbnail:string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Add this column to your entity!
    @DeleteDateColumn()
    deletedAt?: Date;

}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    name:string;
    
    @Column({ length: 5000 })
    description:string;

    @Column({ length: 5000 })
    additionalInformation:string;

    @Column({ length: 5000 })
    eventBanner:string;

    @CreateDateColumn()
    createdOn!: Date;

    @UpdateDateColumn()
    updatedOn!: Date;

    // Add this column to your entity!
    @DeleteDateColumn()
    deletedOn?: Date;

}
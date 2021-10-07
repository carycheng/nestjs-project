import { Report } from 'src/reports/report.entity';
import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    admin: boolean;

    // Have to wrap in a function because there is a circular dependency.
    // Report depends on User and User depends on Report. The function
    // executes the code at a later instead of loading in the dependency
    // immediately.
    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Deleted User with id', this.id);
    }
}
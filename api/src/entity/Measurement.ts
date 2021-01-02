import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Measurement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    unit: string;

    @Column()
    upper: number;

    @Column()
    lower: number;
}

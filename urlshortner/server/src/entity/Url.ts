import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Url extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
    })
    originalURL: string

    @Column({
        nullable: false,
        unique: true
    })
    shortenURL: string

}

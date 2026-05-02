import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("user")
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({name: "fullName", nullable: false})
    name: string | undefined

    @Column()
    age: number | undefined

    @Column({default: "lagos"})
    city: string | undefined
}
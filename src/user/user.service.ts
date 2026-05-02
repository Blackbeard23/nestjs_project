import { BadRequestException, Injectable } from "@nestjs/common";
import { UserObject, CreateUser } from "./userobject";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";

let users: UserObject[] = [
    {id: 1, name: 'stanley', age: 25, city: "lagos"},
    {id: 2, name: 'john', age: 30, city: "abuja"},
    {id: 3, name: 'stanley', age: 25, city: "lagos"}
]

@Injectable()
export class UserService{

    // addition(num1: number, num2: number): number{
    //     return num1 + num2
    // }
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    )
    {}


    async getallusers(): Promise<UserObject[]>{
        return await this.userRepository.find()
    }

    async adduser(user: UserObject): Promise<UserObject[]>{
        users.push(user)
        return users
    }

    async updateuser(id: number, user: CreateUser): Promise<UserObject[]>{
        
        const founduser = users.find((u) => u.id === id)

        if(!founduser){
            throw new BadRequestException("user not found")
        }

        founduser.name = user.name
        founduser.age = user.age
        founduser.city = user.city ?? founduser.city

        return users
    }

    async deleteuser(id: number): Promise<string>{
        const founduser = users.find((u) => u.id === id)
        if(!founduser){
            throw new BadRequestException("User not found")
        }
        users = users.filter((u) => u.id !== id)
        return "User deleted successfully"
    }

    async getoneuser(id: number): Promise<UserObject>{
        const founduser = users.find((u) => u.id === id)
        
        if(!founduser){
            throw new BadRequestException("User not found")
        }
        return founduser
    }
    
}
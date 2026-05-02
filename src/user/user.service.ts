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


    async getallusers(): Promise<UserEntity[]>{
        return await this.userRepository.find()
    }

    async adduser(user: UserObject): Promise<UserEntity>{
        const newUser: UserObject = {
            name: user.name,
            age: user.age,
            city: user.city
        }

        return await this.userRepository.save(newUser)
    }

    async updateuser(id: number, user: CreateUser): Promise<UserEntity>{
        
        const founduser = await this.userRepository.findOneBy({id})

        if(!founduser){
            throw new BadRequestException("user not found")
        }

        founduser.name = user.name
        founduser.age = user.age
        founduser.city = user.city ?? founduser.city

        await this.userRepository.update(id, founduser)
        return founduser
    }

    async deleteuser(id: number): Promise<string>{
        const founduser = await this.userRepository.findOneBy({id})
        if(!founduser){
            throw new BadRequestException("User not found")
        }
        await this.userRepository.delete(id)
        return "User deleted successfully"
    }

    async getoneuser(id: number): Promise<UserEntity>{
        const founduser = await this.userRepository.findOneBy({id})
        
        if(!founduser){
            throw new BadRequestException("User not found")
        }
        return founduser
    }
    
}
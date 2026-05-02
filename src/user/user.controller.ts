import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserObject, CreateUser } from "./userobject";


@Controller("/user")
export class UserController{
    constructor( private userService: UserService ){}

    // @Get("add")
    // async add(): Promise<number>{
    //     return this.userService.addition(5, 10)
    // }

    @Get("getusers")
    async getuser(): Promise<UserObject[]>{
        return await this.userService.getallusers()
    }

    @Post("adduser")
    async adduser(@Body() user: UserObject): Promise<UserObject[]>{
        return await this.userService.adduser(user)
    }

    @Put("updateuser/:id")
    async updateuser(@Body() userbody: CreateUser, @Param("id", ParseIntPipe) id: number): Promise<UserObject[]>{
        return await this.userService.updateuser(id, userbody)
    }

    @Delete("deleteuser/:id")
    async deleteuser(@Param("id", ParseIntPipe) id: number): Promise<string>{
        return await this.userService.deleteuser(id)
    }

    @Get("getoneuser/:id")
    async getoneuser(@Param("id", ParseIntPipe) id: number): Promise<UserObject>{
        return await this.userService.getoneuser(id)
    }
}
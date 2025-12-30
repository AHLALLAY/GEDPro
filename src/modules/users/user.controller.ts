import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "../auth/decorator/roles.decorator";
import { RoleGuard } from "../auth/guards/roles.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/guards/JwtAuth.guard";



@Controller('users')
@UseGuards(JwtAuthGuard, RoleGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Roles('Admin', 'RH')
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    @Roles('Admin', 'RH')
    findById(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Post()
    @Roles('Admin')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    @Roles('Admin')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @Roles('Admin')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

}
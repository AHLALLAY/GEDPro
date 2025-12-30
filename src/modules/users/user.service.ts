import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entites/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { compare, hash } from "bcrypt";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
    async getUsers() {
        return await this.userRepository.find({
            select: ['id', 'name', 'email', 'phone', 'role', 'createdAt']
        });
    }

    async findById(id: string) {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'phone', 'role', 'createdAt']
        });

        if (!user) throw new NotFoundException(`user with ${id} not found`);
        return user;
    }

    async createUser(createUserDto: CreateUserDto) {
        const { email, password } = createUserDto;
        const isUserExiste = await this.userRepository.findOne({
            where: { email }
        });

        if (isUserExiste) throw new ConflictException('this email already existe');
        
        const hashedPwd = await hash(password, 10);
        const newUser = {
            ...createUserDto,
            password: hashedPwd
        }

        const savedUser = await this.userRepository.save(newUser);

        const { password: _, ...result } = savedUser;
        return result;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findById(id);
        if (updateUserDto.password) {
            updateUserDto.password = await hash(updateUserDto.password, 10);
        }
        const updatedUser = await this.userRepository.save({
            ...user,
            ...updateUserDto,
        });
        const { password: _, ...result } = updatedUser;
        return result;
    }

    async deleteUser(id: string) {
        const user = await this.findById(id);

        await this.userRepository.remove(user);
        return {message:"user deleted"};
    }
}
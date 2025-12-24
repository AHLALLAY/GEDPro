import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entites/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}
    getUsers(){
        return this.userRepository.find({
            select: ['id', 'name', 'email', 'phone', 'role']
        });
    }
}
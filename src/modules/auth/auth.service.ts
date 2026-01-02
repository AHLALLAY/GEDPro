import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { User } from "../users/entites/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { compare } from 'bcrypt';
import { UserService } from "../users/user.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
        private userService: UserService
    ) { }
    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email }
        });

        if (!user) throw new UnauthorizedException("Email or password not correct");

        const isCorrect = await compare(loginDto.password, user.password);
        if (!isCorrect) throw new UnauthorizedException("Email or password not correct");

        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            role: user.role
        });
        return {
            token: token,
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                role: user.role
            },
        }
    }
    async register(registerDto: RegisterDto) {
        const user = await this.userService.createUser({
            ...registerDto,
            role: "Candidat"
        });
        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        }

    }
}
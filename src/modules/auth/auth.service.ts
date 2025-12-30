import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { User } from "../users/entites/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
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

        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email }
        });

        if (existingUser) throw new ConflictException("Email already exists");

        const hashedPassword = await hash(registerDto.password, 10);
        const user = this.userRepository.create({
            ...registerDto,
            password: hashedPassword
        });
        const savedUser = await this.userRepository.save(user);
        const token = this.jwtService.sign({
            id: savedUser.id,
            email: savedUser.email,
            role: savedUser.role,
        });

        return {
            token: token,
            user: {
                id: savedUser.id,
                name: savedUser.name,
                email: savedUser.email,
                phone: savedUser.phone,
                role: savedUser.role
            }
        }

    }
}
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "./config/jwt.config";
import { UserModule } from "../users/user.module";

@Module({
    imports:[
        JwtModule.register(jwtConfig as any),
        UserModule
    ],
    controllers:[AuthController],
    providers:[AuthService]
})

export class AuthModule {}
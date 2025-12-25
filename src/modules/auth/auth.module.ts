import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { jwtConfigFactory } from "./config/jwt.config";
import { UserModule } from "../users/user.module";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: jwtConfigFactory,
            inject: [ConfigService]
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {}
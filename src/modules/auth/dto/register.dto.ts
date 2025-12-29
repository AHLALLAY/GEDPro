import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password:string;
    
    @IsString()
    @IsNotEmpty()
    phone:string;
    
    @IsString()
    @IsNotEmpty()
    @IsEnum(['Admin', 'RH', 'Manager', 'Conadidat'])
    role:string;
}
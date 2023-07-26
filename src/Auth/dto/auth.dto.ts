
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class AuthDto{
    // The declarator here are for validotion
    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsString()
    @IsNotEmpty()
    password: string;
}
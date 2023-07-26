
import { IsEmail, IsOptional, IsString } from "class-validator";
export class EditUserDto{
    // The declarator here are for validotion
    @IsEmail()
    @IsOptional()
    email?: string;


    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;


}
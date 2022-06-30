import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsEmail } from "class-validator";

export class AuthDTO {
    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsString()
    password: string;

}
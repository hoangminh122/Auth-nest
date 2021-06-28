import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsEmail } from "class-validator";

export class AuthDTO {
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    password: string;

}
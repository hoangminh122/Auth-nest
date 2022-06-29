import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsEmail } from "class-validator";
import { NotEmpty } from "sequelize-typescript";

export class RegisterDTO {
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    firstName: string;
    
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

}
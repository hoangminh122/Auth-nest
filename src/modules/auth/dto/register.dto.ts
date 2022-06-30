import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsEmail } from "class-validator";

export class RegisterDTO {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;
}
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, isEmail, IsOptional, IsString } from "class-validator";

export class UserDTO {
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

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    avatarId: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
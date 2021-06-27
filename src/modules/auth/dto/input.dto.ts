import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";


export class LoginDto {
    
    @ApiProperty()
    @IsString()
    username :string;

    @ApiProperty()
    @IsString()
    password:string;

}
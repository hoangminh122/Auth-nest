import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class VerifyCodeDTO {
    @ApiProperty()
    @IsString()
    code: string;
}
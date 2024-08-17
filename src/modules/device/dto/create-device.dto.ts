import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";
import { StatusType } from "../types/status.type";

enum Status {
    Online = 'online',
    Offline = 'offline'
}
export class CreateDeviceDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @Min(1)
    uid: number;


    @ApiProperty({ example: 'Mouse' })
    @IsString()
    @MinLength(1)
    @MaxLength(28)
    vendor: string;

    @ApiProperty({ enum: Status, example: 'online' })
    @IsEnum(Status)
    status: StatusType;
}

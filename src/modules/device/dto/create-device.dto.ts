import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

enum Status {
    Online = 'online',
    Offline = 'offline'
}
export class CreateDeviceDto {
    @ApiProperty()
    @IsNumber()
    @Min(1)
    uid: number;


    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(28)
    vendor: string;

    @ApiProperty({ enum: Status })
    @IsEnum(Status)
    status: 'online' | 'offline';
}

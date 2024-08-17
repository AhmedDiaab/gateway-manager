import { ApiProperty } from "@nestjs/swagger";
import { IsIP, IsString, MaxLength, MinLength } from "class-validator";
import { IsValidIPv4Address } from "../decorators/is-valid-ipv4-address.decorator";
import { IsValidSerial } from "../decorators/is-valid-serial.decorator";

export class CreateGatewayDto {
    @ApiProperty({description: 'Human readable name', example: 'Mouse'})
    @IsString()
    @MinLength(3)
    @MaxLength(24)
    name: string;

    @ApiProperty({description: 'Serial number', example: '4c5sTy4432s'})
    @IsString()
    @MinLength(4)
    @MaxLength(32)
    @IsValidSerial()
    serial: string;
 
    @ApiProperty({description: 'IPv4 address', example: '192.168.1.1'})
    @IsIP('4')
    @IsValidIPv4Address()
    address: string;
}

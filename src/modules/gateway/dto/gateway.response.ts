import { BaseResponse } from "@lib/classes/response.base";
import { ApiProperty } from "@nestjs/swagger";

export class GatewayResponse extends BaseResponse {
    @ApiProperty()
    serial: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;
}
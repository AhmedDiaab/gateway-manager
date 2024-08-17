import { BaseResponse } from "@lib/classes/response.base";
import { ApiProperty } from "@nestjs/swagger";
import { StatusType } from "../types/status.type";

export class DeviceResponse extends BaseResponse {
    @ApiProperty()
    uid: number;

    @ApiProperty()
    vendor: string;

    @ApiProperty()
    status: StatusType;
}
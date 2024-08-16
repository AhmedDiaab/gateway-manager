import { ApiProperty } from "@nestjs/swagger";

export class BaseResponse {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
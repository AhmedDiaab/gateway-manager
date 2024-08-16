import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class Paginatable {
    @ApiPropertyOptional({ description: 'Current page', example: 1, default: 1 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    currentPage: number = 1;

    @ApiPropertyOptional({ description: 'Items limit', example: 10, default: 10, maximum: 50, minimum: 10 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    itemsLimit: number = 10;


    get page(): number {
        if (this.currentPage < 1) return 1;
        return this.currentPage;
    }

    get items(): number {
        if (this.itemsLimit < 10) return 10;
        if (this.itemsLimit > 50) return 50;
        return this.itemsLimit;
    }
}
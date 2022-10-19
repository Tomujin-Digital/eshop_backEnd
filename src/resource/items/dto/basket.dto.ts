import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsIP, IsNotEmpty, IsOptional, isString, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AddBasketItem {

    @ApiProperty()
      @IsString()
      @IsNotEmpty()
      itemId: string;

    @ApiProperty()
      @IsString()
      @IsNotEmpty()
      basketId: string;

      @ApiProperty()
      @IsString()
      @IsNotEmpty()
      userId: string;
    
    @ApiProperty()
      @IsNotEmpty()
      count: number
}

export class RemoveBasketITem {

    @ApiProperty()
      @IsString()
      @IsNotEmpty()
      userId: string;

    @ApiProperty()
      @IsString()
      @IsNotEmpty()
      basketId: string;

      @ApiProperty()
      @IsString()
      @IsNotEmpty()
      itemId: string;
}

export class ReturnItemInBasket {
  @ApiProperty()
      @IsString()
      @IsNotEmpty()
      userId: string;
      
      @ApiProperty()
      @IsString()
      @IsNotEmpty()
      basketId: string;
      
}
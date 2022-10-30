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
      @IsNotEmpty()
      count: number
}

export class RemoveBasketITem {

    @ApiProperty()
      @IsString()
      @IsNotEmpty()
      basketId: string;

      @ApiProperty()
      @IsString()
      @IsNotEmpty()
      itemId: string;

      @ApiProperty()
      @IsNotEmpty()
      count: number;

      @ApiProperty()
      @IsString()
      @IsNotEmpty()
      userId: string;

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

export class BasketCheck {
  @ApiProperty()
      @IsString()
      basketId: string;

      @ApiProperty()
      @IsString()
      @IsNotEmpty()
      userId: string;

}

export class Order {
  @ApiProperty()
  @IsString()
  basketId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}

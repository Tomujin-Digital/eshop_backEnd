import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsIP, IsNotEmpty, IsOptional, isString, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AddItem {

  @ApiProperty({
    example: "Latte"
  })
  @IsString()
  @IsNotEmpty()
  name: string;
    
  @ApiProperty({
  example: "1000"
  })
  @IsString()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: "10"
  })
  @IsString()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: "Coffee"
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: "Elf"
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

}

export class ItemDetail{

  @ApiProperty({
    example: "Latte"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Id: string;
}

export class ItemSearch{

  @ApiProperty({
    example: "Latte"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Elf"
  })
  @IsString()
  @IsNotEmpty()
  Brand: string;

  @ApiProperty({
    example: "Drink"
  })
  @IsString()
  @IsNotEmpty()
  Category: string;
  
}

export class SearchByCat{
  @ApiProperty({
    example: "Drink"
  })
  @IsString()
  @IsNotEmpty()
  Category: string;
}
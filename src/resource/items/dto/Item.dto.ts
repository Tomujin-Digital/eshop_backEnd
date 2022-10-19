import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsIP, IsNotEmpty, IsOptional, isString, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AddNewItem {

  @ApiProperty({
    example: "Latte"
  })
  @IsString()
  @IsNotEmpty()
  itemName: string;
    
  @ApiProperty({
  example: "1000"
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: "10"
  })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: "Coffee"
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    example: "Elf"
  })
  @IsString()
  @IsNotEmpty()
  brandName: string;

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
  id: string;
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
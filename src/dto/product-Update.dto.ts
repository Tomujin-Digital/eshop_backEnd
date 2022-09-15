import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class productUpdateDto {

  @ApiProperty({
    example: "id",
  })
  @IsNotEmpty()
  @IsString()
  id:string;

  @ApiProperty({
    example: "Coffee",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    example: "6969",
  })
  @IsNotEmpty()
  @IsString()
  price: string;
  @ApiProperty({
    example: "Hot2",
  })
  @IsNotEmpty()
  @IsString()
  
  info:string;


  
  }

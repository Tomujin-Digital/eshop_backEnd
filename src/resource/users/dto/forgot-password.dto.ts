import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsIP, IsNotEmpty, IsOptional, isString, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ChangePasswordReqDto {
  @ApiProperty({
    example: '80208059'
  })
  @IsString()
  @MaxLength(10)
  credential: string;
}  

export class ChangePasswordAcceptDto {
  @ApiProperty({
    example: '80208059'
  })
  @IsString()
  @MaxLength(32)
  credential: string;

  @ApiProperty({
    example: 'HelloWorld@123'
  })
  @IsString()
  @MaxLength(32)
  @MinLength(8)
  @IsNotEmpty()
  password:string;

  @ApiProperty({
    example:'908760'
  })
  otp:string;
} 
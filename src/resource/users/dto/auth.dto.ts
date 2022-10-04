import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsIP, IsNotEmpty, IsOptional, isString, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterRequestDto{

  @ApiProperty({
    example: "90098848"
  })
  @IsString()
  @IsNotEmpty()
  otp: string;

  
    @ApiProperty({
        example:"Lola"
    })
    @IsString()
    @IsNotEmpty()
    userName: string;

    @ApiProperty({
        example: "978|80208059"
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    phone: string;

    @ApiProperty({
        example: "tsa01@gmail.com"
    })
    @IsNotEmpty()
    @IsString()
    email: string;


    @ApiProperty({
        example:"Tiny722$"
    })
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @Matches('(?=.*?[#?!@$%^&*-])', "", {
        message: "password must have a special character"
    })
    @IsNotEmpty()
    password:string;

    @ApiProperty({
        example: "Namuun"
    })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({
        example: "Boldbat"
    })
    @IsNotEmpty()
    @IsString()
    lastName: string;

}

export class CheckUserContact{
  @ApiProperty({example: "976|80208059"})
@IsString()
@IsNotEmpty()
@MinLength(3)
@MaxLength(16)
phone: string
}

export class RefreshToken {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}


export class LoginRequestDto {
  @ApiProperty({
    example: '90098848'
  })
  @IsString()
  @MaxLength(32)
  credential: string;
  
  @ApiProperty({
    example: 'Tiny722$'
  })
  @IsString()
  @MaxLength(100)
  password: string;
}


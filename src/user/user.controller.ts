import { UserService } from './user.service';
import { Controller, Post, Body, Get, UseGuards,Request, Param } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { OtpUserDto } from 'src/dto/otp-user.dto';
import { UserAuthGuard } from 'src/guards/user.guard';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { changePasswordDto } from 'src/dto/change-pass.dto';
import { ForgotPasswordDto, RequestPasswordDto } from 'src/dto/forgot-password.dto';
import { AddProductDto } from 'src/dto/add-product.dto';
import { productUpdateDto } from 'src/dto/product-Update.dto';


@Controller()
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.UserService.signUp(createUserDto);
  }
  @Post('signIn')
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.UserService.signIn( loginUserDto );
  }
  @Post('approve')
  approveVerify(@Body() otp:OtpUserDto) {
    return this.UserService.approveVerify(otp);
  }

  @Get('users')
  @UseGuards(UserAuthGuard)
  users(){
    return this.UserService.getUsers()
  }

  @Post('changePass')
  @UseGuards(UserAuthGuard)
  changePass(@Body() body: changePasswordDto, @Request() req){
    return this.UserService.passwordChange(body,req.user.id)
  }

  @Post('password/request')
  forgotPass(@Body() body: RequestPasswordDto){
    return this.UserService.requestPass(body)
  }

  @Post('password/accept')
  acceptPass(@Body() otp: OtpUserDto){
    return this.UserService.acceptPass(otp)
  }

  @Post('password/changed')
  changedPass(@Body() body: ForgotPasswordDto){
    return this.UserService.changedPass(body)
  }
  @Get('qwerty')
  mobicom(){
    return this.UserService.mobicom();
  }
  


  @Post('change')
  changeName(@Param('id') id:number, @Body() name: string){
    return this.UserService.changeUsername(id, name)
  }

@Post('addProduct')
addProduct(@Body() AddProductDto: AddProductDto) {
  return this.UserService.addProduct(AddProductDto);
}
@Post('update')
async update(
  @Body()
  body:productUpdateDto,
  @Request(){user }){
    const updateUser = await this.UserService.update(body);
      return{
        updateUser,
        success:true  
      }  
  }  






  // @Post('changeUsername1')
  // @UseGuards(UserAuthGuard)
  // changeUsername1(@Body() body: changeUsernameDto, @Request() req){
  //   return this.UserService.usernameChange(body,req.user.id)
  // }
}



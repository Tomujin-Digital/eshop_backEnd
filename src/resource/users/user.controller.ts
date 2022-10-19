import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { UserAccessGuard } from "src/guard/user.guard";
import { UserService } from "./user.service";
import { ApiHeader, ApiHeaders, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserUpdateDto } from './dto/user-update.dto';
import { UpdatePicDto } from "./dto/update-pic.dto";

@ApiTags("User")
@Controller("user")
@UseGuards(UserAccessGuard)
@ApiBearerAuth("access-token")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  async getMe(@Request() { user }) {
    
    const foundUser = await this.userService.getMe(user._id)
    return foundUser
  }

  @Post("updateMe")
  async updateMe( @Request() {user }, @Body() {firstName, lastName, gender, birthDate}:UserUpdateDto
  ) {
    
    const userUpdated = await this.userService.updateMe( user._id,{
      firstName,
      lastName,
      gender,
      birthDate
    });
    return {
      success: true,
      user: userUpdated,
    }
  }

  @Post("updatePic")
  async updatePic( @Request() {user }, @Body() {profilePic}:UpdatePicDto
  ) {
    
    const picUpdated = await this.userService.updatePic( user._id,{
      profilePic
    });
    return {
      success: true,
      user: picUpdated,
    }
  }
}
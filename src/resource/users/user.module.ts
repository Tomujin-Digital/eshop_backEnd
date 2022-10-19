import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "./models/user.model";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
     SequelizeModule.forFeature([User]),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, AuthService],
  exports: [UserService]
})
export class UserModule {}
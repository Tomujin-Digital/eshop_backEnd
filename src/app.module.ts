import { HttpException, HttpStatus, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./resource/users/models/user.model";
import { UserModule } from "./resource/users/user.module";

import { extname } from "path";
import { diskStorage } from "multer";


export const multerOptions = {
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST
        ),
        false
      );
    }
  },

  storage: diskStorage({
    destination: "files/",

    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuidv4()}${extname(file.originalname)}`);
    },
  }),
};

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "13.215.139.119",
      port: 3306,
      username: "rtd",
      password: "Tiny722$",
      database: "grinding_geeks",
      models: [
        User,
      ],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
function uuidv4() {
  throw new Error("Function not implemented.");
}


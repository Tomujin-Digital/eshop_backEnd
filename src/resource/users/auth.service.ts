import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { send } from "process";
import { connector } from "../../utils/connector";
import { User } from "./models/user.model";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async sendOtpWithAuthentication(credential: string, countryCode: string) {
    const data = await connector({
      microservice: "auth",
      url: "/auth/request/otp",
      method: "POST",
      data: {
        credential: credential,
      },
      headers: {
        country: "+" + countryCode,
      },
    });
    return data;
  }

  async registerToAuthentication({
    countryCode,
    userName,
    phone,
    password,
    otp,
    firstName,
    lastName,
  }) {
    const data = await connector({
      microservice: "auth",
      url: "/auth/register",
      data: {
        countryCode: "+" + countryCode,
        phone: phone,
        userName: userName,
        password: password,
        nickName: userName,
        firstName: firstName,
        lastName: lastName,
      },
      method: "POST",
      headers: {
        otp,
        used: "phone",
      },
    });
    return data;
  }

  async loginToAuthentication({
    credential,
    password,
  }: {
    credential: string;
    password: string;
  }) {
    const data = await connector({
      microservice: "auth",
      url: "/auth/login",
      method: "POST",
      data: {
        credential,
        password,
      },
    });
    return data;
  }

  async forgotPassword({ credential }: { credential: string }) {
    const data = await connector({
      microservice: "auth",
      url: "/auth/change/request",
      method: "POST",
      data: {
        credential,
      },
    });
    return data;
  }

  async changePasswordAccept({
    credential,
    password,
    otp,
  }: {
    credential: string;
    password: string;
    otp: string;
  }) {
    const data = await connector({
      microservice: "auth",
      url: "/auth/change/accept",
      method: "POST",
      data: {
        credential: credential,
        password: password,
        otp: otp,
        code: otp,
      },
    });
    return data;
  }

  async refreshToken({ refresh_token }: { refresh_token: string }) {
    const data = await connector({
      microservice: "auth",
      url: "/auth/refresh",
      method: "POST",
      data: {
        refresh_token,
      },
    });
    return data;
  }
}

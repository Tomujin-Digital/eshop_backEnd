import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { OtpUserDto } from 'src/dto/otp-user.dto';
import { User } from 'src/models/user.model';
import { CreatedAt, Sequelize } from 'sequelize-typescript';
import { Verification } from 'src/models/verification.model';
import { sign, verify } from 'jsonwebtoken';
import {access } from 'fs';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { hash } from 'bcrypt';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { Task } from 'src/models/task.model';
import { TaskType } from 'src/models/task-type.model';
import { Op } from 'sequelize';
import { AddProductDto } from 'src/dto/add-product.dto';
import { Product } from 'src/models/addproduct.model';
import { productUpdateDto } from 'src/dto/product-Update.dto';

export type UserFind={
  userName?: string;
  phone?: string;
  email?: string;
  id?: string;
}

export type UserCheck={
  userName?: string;
  phone?: string;
}


@Injectable()
export class UserService {
  usernameChange(body: productUpdateDto, id: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Verification) private verifyModel: typeof Verification,
    @InjectModel(Task) private taskModel: typeof Task,
    @InjectModel(TaskType) private taskTypeModel: typeof TaskType,
    @InjectModel(Product) private productModel: typeof Product
  ) {}

  async signIn(data: LoginUserDto) {

    const user = await this.userModel.findOne({where:{
      userName: data.userName}
    })
    const isPasswordMatching = await bcrypt.compare(
      data.password, user.password)

    if (isPasswordMatching) {
      const { access_token, refresh_token } = this.TokenGenerate(user.id, );
      const{}=this.verifyModel.findOne({where:{isVerify:true}});
      return {
        access_token,
        refresh_token,
      };}
    return 'User Not Found';
  }

  getUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  TokenGenerate(id: string, expiresIn: string = '24h') {
    const access_token = sign({ userId: id }, 'secret', { expiresIn: '15m' });
    const refresh_token = sign({ userId: id }, 'secret' + '_refresh', {
    expiresIn: expiresIn || '24h',
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async signUp(data: CreateUserDto) {
    const encrypted = await hash(data.password, 10);
  
      const newUser = new this.userModel({
        userName: data.userName,
        password: encrypted,
        phone: data.phone,
       
      });
  
      let checkedUser= await this.checkUser({userName: data.userName, phone: data.phone});
      if (checkedUser= true){
  
      newUser.save();
      let code = Math.floor(100000 + Math.random() * 900000);
      const newVerify = new this.verifyModel({
        userId: newUser.id,
        otp: code,
        sendDate: new Date(),
        usage: 'SignUp',
        isVerify: false,
      });
      newVerify.save();
      this.sendMessage(data.phone, code)
      return newUser;
    }
    }

  sendMessage(phone, otp){
  axios({
    method: 'post',
    url: 'http://18.167.46.29:5010/sms/messagePro',
    data: {
      to: phone,
      text: 'Your verification code is ' + otp,
      systemId: 'DA22',
      countryCode:'+976',
    }
  })}

  async approveVerify(data: OtpUserDto) {

    let ver = await this.verifyModel.findOne({
      where:{userId:data.id}, order:[["createdAt", "DESC"]]});

    if (ver.otp == data.verifyCode && !ver.isVerify) {
      this.userModel
        .update({ status: 'Active' }, { where: { id: ver.userId } })
      ver.isVerify = true;
      ver.save();
    } else {
      return 'Wrong OTP code';
    }
  }


async checkUser({userName, phone }: UserCheck): Promise<any>{
  if(!!phone){
    const checkPhone= await this.userModel.findOne({where:{
      phone: phone
    }});
    if(!checkPhone) return true;
    throw new HttpException('PHONE_ALREADY_EXISTS', 400);
  }

  if(!!userName){
    const checkPhone= await this.userModel.findOne({where:
      {userName: userName}});
    if(!checkPhone) return true;
    throw new HttpException('PHONE_ALREADY_EXISTS', 400);
  }
  return true;
}

async passwordChange(data, userid){
console.log(userid)
  const user= await this.userModel.findOne({where:{
  id: userid}})
  const passMatch = await bcrypt.compare(
  data.oldPassword, user.password)

  if(passMatch){
    const encrypted = await hash(data.newPassword, 10);
    this.userModel
        .update({ password: encrypted}, { where: { id: userid} });
    user.save();
  }
  else{
    throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST)
  }
}

async requestPass(data){
  const user = await this.userModel.findOne({where:{
  phone: data.phone
}})
  if(user){
  let code = Math.floor(100000 + Math.random() * 900000);
      const newVerify = new this.verifyModel({
        userId: user.id,
        otp: code,
        sendDate: new Date(),
        usage: 'ForgotPass',
        isVerify: false,
      });
      newVerify.save();
      this.sendMessage(user.phone, code)
      return user;
    }
    else return new HttpException('WRONG_PHONE', 404);
  
}

async acceptPass(data){
  let ver = await this.verifyModel.findOne({
    where:{userId:data.id}, order:[["createdAt", "DESC"]]});

  if (ver.otp == data.verifyCode) {
    this.verifyModel.update({isVerify: true}, {where:{userId: data.id}})
   return this.userModel.findOne({where:{id:ver.userId}})
  } 
  else {
    return new HttpException('Wrong OTP code', HttpStatus.BAD_REQUEST);
  }
}

async changedPass(data){
let user= await this.userModel.findOne({where:{
  id:data.id
}})
const encrypted= await hash(data.newPassword, 10);
this.userModel.update({ password: encrypted}, { where: { id: user.id} })
user.save();
return new HttpException('PASSWORD_CHANGED_SUCCESSFULLY', 200)
}
mobicom(){
  return this.userModel.findAll({attributes:['username', 'firstname', 'lastname', 'email'],
where:{
  phone:{ [Op.like]: '99%'}
}
})
}


async changeUsername(data, userid){
  console.log(userid)
    const user= await this.userModel.findOne({where:{
    id: userid}})
    const usernameMatch = (
      data.oldUsername, user.name)
  
    if(usernameMatch){
      const newUsername = await (data.newUsername);
      this.userModel
          .update({ username:newUsername }, { where: { id: userid} });
      user.save();
    }
  } 
 //Add Product

 async addProduct(data: AddProductDto) {      
  const addProducts= new this.productModel({
    status:'Active',
    name: data.name,
    price: data.price,
    info: data.info,}
  )

  addProducts.save();

  return addProducts
  }

  async update(data:productUpdateDto ){
    console.log(data)
    return await this.productModel.update({
   name: data.name,
   price: data.price,
   info:data.info },
   {where: {id: data.id }});
  }

  // async changeUsername1(name, userid){
  //   console.log(userid)
  //     const user= await this.userModel.findOne({where:{
  //       id: userid}})
  //       const update = new this.userModel()
  //       user.userName = name
  //       update.save()
  //       return user

    }

  
  



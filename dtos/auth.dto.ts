import { JwtPayload } from "jsonwebtoken";

export interface NewUserDto {
    name:string;
    email:string;
    password:string;
}

export interface LoginDto {
    email:string;
    password:string;
}

export interface UserResponseDto {
    _id:string,
    name:string
    email:string,
    token:string
}

export interface PayloadDto extends JwtPayload{
    uid:string,
    name:string,
}
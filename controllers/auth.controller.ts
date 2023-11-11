import { Request, Response } from "express";
import { NewUserDto, UserResponseDto } from "../dtos/auth.dto";
import User from "../models/user.model";
import bcrypt from 'bcrypt'
import generateJWT from "../helpers/jwt";

export const createUser = async (req: Request, res: Response) => {
  const body: NewUserDto = req.body;
  try {
    const user = new User(body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password!,salt);
    await user.save();

    res.status(201).json({ ok: true, uid: user.id, name: body.name });
  } catch (error: any) {
    console.log(error);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(400).json({
        ok: false,
        msg: `Duplicate key.`,
        keys: {
          key: error.keyPattern,
          value: error.keyValue,
        },
      });
    } else {
      res.status(500).json({
        ok: false,
        msg: "Server Error. Please try again or call an administrator.",
      });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const body: NewUserDto = req.body;
  try {
    let usuario = await User.findOne({email:body.email});
    if(!usuario){
      throw new Error('Invalid email or password');
    }

    const validPassword = bcrypt.compareSync(body.password, usuario.password!);

    if (!validPassword){
      throw new Error('Invalid email or password');
    }

    const token = await generateJWT(usuario.id,usuario.name!);

    res.status(200).json({_id:usuario.id, name:usuario.name, email:usuario.email, token:token} as UserResponseDto);

  } catch (error:any) {
    console.log(error)
    res.status(400).json({ok:false, msg:error.message})
  }
};

export const revalidateToken = async (req: Request, res: Response) => {
  try {
    if(req.uid && req.uname){
      const token = await generateJWT(req.uid,req.uname);
      res.status(200).json({ok:true, token:token});
    } else {
      throw new Error('No valid token');
    }
  } catch (error:any) {
    res.status(400).json({ok:false, msg:error.message})
  }
  res.json({ ok: true, userId: 2 });
};

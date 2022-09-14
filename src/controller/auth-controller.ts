import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto'
import User from '../model/user-model';
import jwt from 'jsonwebtoken'
class AuthController {
    register = async(req: Request, res: Response) => {
        let user = req.body
        let transporter = await nodemailer.createTransport(
            {
            
             host: "smtp.gmail.com",
             service:"gmail",
             port: 465,
            
             auth: {
               user: 'ducanh.le19896@gmail.com', 
               pass: 'anh1981996',
             },
            
           });
         user.password = await bcrypt.hash(user.password, 10)
         user.emailToken = crypto.randomBytes(64).toString('hex');
         user = await User.create(user)
         let mailOptions =  {
             from: '"Verified your email 👻" <ducanh.le19896@gmail.com>', // sender address
             to:user.email,
             subject: "Verified your email✔", 
             text: "Hello world?", 
             html: `<h2>Hello ${user.username}!</h2>
                     <p>Thanks you registering on our site</p>
                     <h4>Please verify your email to continue ...</h4>
                     <a href="http://${req.headers.host}/users/verify-email/${user._id}">Verify Your Email</a>`
             , 
           };
           transporter.sendMail(mailOptions, (err, info)=> {
             if (err) {
               console.log(err)}
               else {
                 console.log('Verification email sent successfully');
               }
           })
         res.status(200).json(user)
    }
    login = async (req:Request, res:Response) => {
      let loginFrom = req.body
      let user = await User.findOne({
          email: loginFrom.email
      })
      if(!user) {
          res.status(401).json({ message: 'User is not exits.'});
      }
      else {
          if(user.password){
              let comparePassword = await bcrypt.compare(loginFrom.password,user.password)
              if(!comparePassword){
                  res.status(401).json({ message: 'Incorrect password.' })
              }
              else {
                if(user.isVerified == false) {
                  let payload= {
                    email: user.email,
                }
                let token = await jwt.sign(payload,`${process.env.SECRET_KEY}`, {expiresIn : 360000} )
                res.status(200).json({ token })
                }
                else {
                  res.status(401).json({ message: 'Email is not verified.' })
                }
                  
              }
          }
      }

  }
    }

export default new AuthController();
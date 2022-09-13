import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto'
import User from '../model/user-model';
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
}
export default new AuthController();
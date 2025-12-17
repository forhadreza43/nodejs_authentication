import type { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../../schema/auth.schema';
import { User } from '../../models/user.model';
import { comparePassword, hashPassword } from '../../utils/hash';
import { sendEmail } from '../../utils/email';
import { render } from '@react-email/render';
import EmailVerification from '../../utils/EmailVerification';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { generateAccessToken, generateRefreshToken } from '../../utils/token';

const registerHandler = async (req: Request, res: Response) => {
   try {
      const result = registerSchema.safeParse(req.body);
      if (!result.success) {
         return res.status(400).json({
            message: 'Invalid input',
            errors: z.treeifyError(result.error),
         });
      }
      const { email, password, name } = result.data;
      const normalizedEmail = email.toLowerCase().trim();

      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
         return res.status(409).json({ message: 'Email already in use' });
      }

      const hashedPassword = await hashPassword(password);
      const newUser = {
         email: normalizedEmail,
         password: hashedPassword,
         name,
      };

      const createdUser = await User.create(newUser);

      const verificationToken = jwt.sign(
         { sub: createdUser?._id },
         process.env.JWT_ACCESS_SECRET!,
         {
            expiresIn: '10m',
         }
      );

      const verificationUrl = `${process.env.API_URL}/auth/verify-email?token=${verificationToken}`;

      const html = await render(
         EmailVerification({
            userName: name,
            verificationUrl,
            companyName: 'MyApp',
         })
      );

      const { data, error } = await sendEmail(
         normalizedEmail,
         'Verify your email',
         html
      );

      if (error) {
         console.error('Error sending email:', error);
      }

      return res
         .status(201)
         .json({ message: 'User registered successfully', createdUser });
   } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
   }
};

const verifyEmailHandler = async (req: Request, res: Response) => {
   const token = req.query.token as string;
   if (!token) {
      return res.status(400).json({ message: 'Invalid or missing token' });
   }
   try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
         sub: string;
      };

      const userId = decoded.sub;
      const user = await User.findById(userId);

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }
      if (user.isEmailVerified) {
         return res.status(400).json({ message: 'Email already verified' });
      }

      user.isEmailVerified = true;
      await user.save();

      return res
         .status(200)
         .json({ message: 'Email verified successfully', user });
   } catch (error) {
      return res.status(400).json({ message: 'Invalid or expired token' });
   }
};

const loginHandler = async (req: Request, res: Response) => {
   try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
         return res.status(400).json({
            message: 'Invalid input',
            errors: z.treeifyError(result.error),
         });
      }
      const { email, password } = result.data;
      const normalizedEmail = email.toLowerCase().trim();
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
         return res.status(401).json({ message: 'Invalid email' });
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
         return res.status(401).json({ message: 'Invalid password' });
      }
      // When email verification is mandatory while signup
      // if (!user.isEmailVerified) {
      //    return res.status(403).json({ message: 'Email not verified' });
      // }

      const accessToken = generateAccessToken(
         user._id.toString(),
         user.role as 'user' | 'admin',
         user.tokenVersion
      );
      const refreshToken = generateRefreshToken(
         user._id.toString(),
         user.tokenVersion
      );

      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'lax',
         maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
         message: 'Login successful',
         accessToken,
         user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            twoFactorEnabled: user.twoFactorEnabled,
         },
      });
   } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
   }
};

export { registerHandler, verifyEmailHandler, loginHandler };

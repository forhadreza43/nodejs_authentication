import type { Request, Response } from 'express';
import { registerSchema } from '../../schema/auth.schema';
import { User } from '../../models/user.model';
import { hashPassword } from '../../utils/hash';
import { sendEmail } from '../../utils/email';
import { render } from '@react-email/render';
import EmailVerification from '../../utils/EmailVerification';

const registerHandler = async (req: Request, res: Response) => {
   try {
      const result = registerSchema.safeParse(req.body);
      if (!result.success) {
         return res.status(400).json({
            message: 'Invalid input',
            errors: result.error.flatten(),
         });
      }
      const { email, password, name } = result.data;
      const normalizedEmail = email.toLowerCase().trim();

      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
         return res.status(409).json({ message: 'Email already in use' });
      }

      const hashedPassword = await hashPassword(password);

      const html = await render(
         EmailVerification({
            userName: name,
            verificationUrl: 'https://yourapp.com/verify?token=abc123xyz789',
            companyName: 'YourApp',
         })
      );

      const { data, error } = await sendEmail(
         normalizedEmail,
         'Verify your email',
         html
      );

      const newUser = {
         email: normalizedEmail,
         password: hashedPassword,
         name,
      };

      // await User.create(newUser);
      return res.status(201).json({ message: 'User registered successfully', newUser });
   } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
   }
};

export { registerHandler };

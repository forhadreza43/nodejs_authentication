import jwt from 'jsonwebtoken';

const generateAccessToken = (
   userId: string,
   role: 'user' | 'admin',
   tokenVersion: number
) => {
   const payload = { sub: userId, role, tokenVersion };
   return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: '30m',
   });
};

const generateRefreshToken = (userId: string, tokenVersion: number) => {
   const payload = { sub: userId, tokenVersion };
   return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '7d',
   });
};

export { generateAccessToken, generateRefreshToken };

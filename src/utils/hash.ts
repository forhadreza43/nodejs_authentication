import bcrypt from 'bcryptjs';

const hashPassword = async (password: string) => {
   const saltRounds = bcrypt.genSaltSync(10);
   const hashedPassword = await bcrypt.hash(password, saltRounds);
   return hashedPassword;
};

const comparePassword = async (
   plainPassword: string,
   hashedPassword: string
) => {
   return await bcrypt.compare(plainPassword, hashedPassword);
};

export { hashPassword, comparePassword };

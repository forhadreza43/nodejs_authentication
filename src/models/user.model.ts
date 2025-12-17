import { model, Schema } from "mongoose";
import {z} from "zod";

export const UserZodSchema = z.object({
   username: z.string().min(3).max(30),
   email: z.string().email(),
   password: z.string().min(6),
})


const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = model("User", userSchema);

export default User;
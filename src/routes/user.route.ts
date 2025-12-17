import { Router } from "express";
import { registerHandler } from "../controllers/auth/auth.controller";
const router = Router();

// Sample user route
router.post('/auth/register', registerHandler);
router.get("/", (req, res) => {
  res.json([{ id: 1, name: "John Doe" }]);
});


export default router;
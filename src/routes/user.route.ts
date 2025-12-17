import { Router } from "express";
const router = Router();

// Sample user route
router.get("/", (req, res) => {
  res.json([{ id: 1, name: "John Doe" }]);
});

export default router;
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/ai-insights", async (req, res) => {
  try {
    const { data, type } = req.body;
    console.log(data, type);
  } catch (err) {
    console.error("AI API error:", err.message);
    res.status(500).json({ error: "AI insight failed." });
  }
});

export default router;

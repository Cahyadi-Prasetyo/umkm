import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const response = await fetch("https://kingrayyy-smart-travel-ai.hf.space/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Chatbot Proxy Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

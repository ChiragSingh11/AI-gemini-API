const express = require("express");
const cors = require("cors");  // Import the cors package
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

const port = process.env.PORT || 3001;

// Middleware setup
app.use(cors());  // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// POST route for generating content
app.post("/generate-content", async (req, res) => {
  const { prompt } = req.body;

  try {
    // Replace this with your actual API key
    const genAI = new GoogleGenerativeAI("Your API Key");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    res.json({ content: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

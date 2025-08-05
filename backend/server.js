const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const corsOptions = require('./corsOptions.js')
const credentials = require('./credentials.js');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS with preflight support

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());

const systemPrompt = `
You are NovaGuide, a virtual assistant for a museum ticket booking website. You only answer questions related to:
- Museum exhibits and galleries
- Ticket booking process
- Museum timings, location, accessibility
- Ongoing or upcoming events
- General visitor guidance
- Science education and museum-related facts

If a user asks anything outside this scope, reply:
"I'm here to help with museum-related queries only."
Always stay in character.
`;

const ai = new GoogleGenAI({});

// ✅ Explicitly handle preflight requests for /chat
app.options("/chat", cors());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt + message,
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error("Error with Gemini:", error.message);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

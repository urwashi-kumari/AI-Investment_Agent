import dotenv from "dotenv";
import ai from "./config/gemini.js";

dotenv.config();

console.log(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello in one sentence.",
    });

    console.log(response.text);
  } catch (error) {
    console.error(error);
  }
}

testGemini();
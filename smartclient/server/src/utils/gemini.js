const { GoogleGenerativeAI } = require("@google/genai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
});

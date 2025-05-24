import express from "express";
import generateContent from "../Utils/ai.service.js";

const router = express.Router();

function buildPrompt(type, dataString, dataJson) {
  const sampleKeys = Object.keys(dataJson[0]).join(", ");
  let prompt = "";

  if (type === "summary") {
    prompt = `You are an AI assistant. Summarize this table data in 3–4 bullet points. Focus on key observations and patterns. The columns are: ${sampleKeys}.\n\n${dataString}`;
  } else if (type === "trends") {
    prompt = `Identify 2–3 meaningful trends in the following table data. Focus on changes, correlations, or patterns. The columns are: ${sampleKeys}.\n\n${dataString}`;
  } else if (type === "chart") {
    prompt = `Based on this table, suggest the most suitable chart type to visualize the data. Keep your answer to 2–3 short sentences. The columns are: ${sampleKeys}.\n\n${dataString}`;
  } else {
    prompt = `Provide a short summary of this data table. The columns are: ${sampleKeys}.\n\n${dataString}`;
  }

  return prompt;
}

router.post("/smartanalytics", async (req, res) => {
  const { data, type } = req.body;

  if (!data || !type) {
    return res.status(400).json({ error: "Both data and type are required." });
  }

  // Attempt to parse data from CSV back to JSON just to extract headers
  try {
    const rows = data.trim().split("\n");
    const headers = rows[0].split(",");
    const sampleRow = rows[1].split(",");

    const jsonData = [
      Object.fromEntries(
        headers.map((h, i) => [h.trim(), sampleRow[i].trim()])
      ),
    ];

    const prompt = buildPrompt(type, data, jsonData);

    const result = await generateContent(prompt);
    res.json({ result });
  } catch (err) {
    console.error("Prompt build error:", err);
    res.status(500).json({ error: "Failed to build prompt or process data." });
  }
});
export default router;

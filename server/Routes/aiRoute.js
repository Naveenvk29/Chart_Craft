import express from "express";
import generateContent from "../Utils/ai.service.js"; // Your AI powerhouse!

const router = express.Router();

/**
 * Crafting the perfect question for our AI guru!
 * This function builds tailored prompts based on what insights you're craving.
 * @param {string} type - The flavor of insight: "summary", "trends", "chart", or "actionable_insights".
 * @param {string} dataString - Your juicy data, neatly in CSV format.
 * @param {Array<Object>} dataJson - A peek at your data's structure (for column names).
 * @returns {string} The finely tuned prompt ready for the AI.
 */
function buildPrompt(type, dataString, dataJson) {
  // Let's grab those column names to give our AI some context!
  const sampleKeys =
    dataJson && dataJson.length > 0
      ? Object.keys(dataJson[0]).join(", ")
      : "our mystery columns"; // Just in case, no blanks!

  let prompt = "";

  switch (type) {
    case "summary":
      prompt = `Hey there, AI data wizard! Could you give me a **super clear and concise summary** of this table data? I'm looking for 3-4 bullet points highlighting the main vibes, key discoveries, and any big-picture patterns. The columns we're looking at are: ${sampleKeys}.\n\nHere's the data:\n${dataString}`;
      break;
    case "trends":
      prompt = `Alright, AI trend-spotter! Dive into this table and uncover 2-3 **meaningful trends, fascinating correlations, or cool changes**. Please break down each trend so it's easy to grasp. Our data columns are: ${sampleKeys}.\n\nHere's the data:\n${dataString}`;
      break;
    case "chart":
      prompt = `Chart whisperer, assemble! Based on this table data, what's the **absolute best chart type to visualize this story**? Give me your top pick in 2-3 short sentences, and tell me why it's the perfect match. The columns telling our tale are: ${sampleKeys}.\n\nHere's the data:\n${dataString}`;
      break;
    case "actionable_insights": // Our new secret sauce!
      prompt = `Listen up, AI strategist! I need you to analyze this data table and pull out 2-3 **smart, actionable insights or recommendations**. What brilliant moves can we make based on this information? The columns are: ${sampleKeys}.\n\nHere's the data:\n${dataString}`;
      break;
    default:
      // A friendly fallback if we're not sure what they're asking for.
      prompt = `Hey AI, just give me a quick, general overview of this data table. The columns are: ${sampleKeys}.\n\nHere's the data:\n${dataString}`;
      break;
  }
  return prompt;
}

router.post("/smartanalytics", async (req, res) => {
  const { data, type } = req.body;

  // First things first: Are we missing anything?
  if (!data || !type) {
    return res
      .status(400)
      .json({
        error:
          "Oops! I need both your **data** (as a CSV string) and the **type of insight** you're looking for to get started. Don't be shy!",
      });
  }

  // Let's quickly check if the data looks like a proper CSV string.
  if (typeof data !== "string" || data.trim().length === 0) {
    return res
      .status(400)
      .json({
        error:
          "Hmm, that data doesn't look quite right. I'm expecting a **non-empty CSV string**. Could you double-check it?",
      });
  }

  let jsonData = [];
  try {
    const rows = data.trim().split("\n");
    if (rows.length < 2) {
      // We need at least a header and one row of actual data to do our magic!
      return res
        .status(400)
        .json({
          error:
            "Not enough data to analyze! I need at least a **header row and one data row** to cook up some insights.",
        });
    }

    const headers = rows[0].split(",").map((h) => h.trim()); // Snagging those header names cleanly
    const sampleRow = rows[1].split(",").map((c) => c.trim()); // Getting a peek at the first data row

    // Quick sanity check: Do the headers match the data?
    if (headers.length === 0 || headers.length !== sampleRow.length) {
      return res
        .status(400)
        .json({
          error:
            "CSV data mismatch! Looks like your **headers and first data row don't quite line up**. Make sure they have the same number of columns!",
        });
    }

    // Just building a tiny JSON sample to help our AI understand the columns.
    jsonData = [Object.fromEntries(headers.map((h, i) => [h, sampleRow[i]]))];
  } catch (parseError) {
    console.error("Data parsing hiccup:", parseError);
    return res
      .status(400)
      .json({
        error:
          "Whoops, couldn't quite understand your CSV data. Please ensure it's a **valid CSV string**!",
      });
  }

  try {
    const prompt = buildPrompt(type, data, jsonData);
    // Sending our expertly crafted question to the AI! Adding a timeout so we don't wait forever.
    const result = await generateContent(prompt, { timeout: 30000 }); // Let's give it 30 seconds max!
    res.json({ result }); // Ta-da! Here are your insights!
  } catch (aiError) {
    console.error(`AI brain-fart for '${type}':`, aiError);
    // Something went wrong on the AI side. Let's give a friendly error.
    res
      .status(500)
      .json({
        error: `Argh, the AI had a little stumble trying to generate insights for '${type}'. Please give it another shot!`,
        details: aiError.message,
      });
  }
});

export default router;

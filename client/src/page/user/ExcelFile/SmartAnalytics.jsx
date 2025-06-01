import React, { useState, useCallback } from "react";
import { motion } from "framer-motion"; // Let's make things move smoothly!
import { useSmartanalyticsMutation } from "../../../redux/api/excelApi"; // Our data-fetching sidekick!

// Little animation for our insight cards, making them pop in nicely.
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const InsightCard = ({ title, content }) => (
  <motion.div
    className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg shadow mt-4 w-full max-w-3xl"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
  >
    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
      {title}
    </h3>
    {/* If it's a summary or trends, let's format it nicely with bullet points! */}
    {title.includes("Summary") ||
    title.includes("Trends") ||
    title.includes("Insights") ? (
      <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300">
        {content.split("\n").map(
          (item, index) =>
            item.trim() && <li key={index}>{item.replace(/^- /, "").trim()}</li> // Clean up those bullet points!
        )}
      </ul>
    ) : (
      <p className="text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap">
        {content}
      </p>
    )}
  </motion.div>
);

const SmartAnalytics = ({ data }) => {
  // Keeping all our awesome insights in one neat place!
  const [insights, setInsights] = useState({
    summary: "",
    trends: "",
    chart: "",
    actionable_insights: "", // Get ready for actionable advice!
  });
  const [loadingType, setLoadingType] = useState(null); // Helps us know which button is currently working hard.
  const [triggerInsights, { isLoading, error }] = useSmartanalyticsMutation(); // Our handy tool for talking to the backend.

  // A super efficient way to turn your JSON data into CSV for the AI.
  const convertToCSV = useCallback((jsonArray) => {
    if (!jsonArray || jsonArray.length === 0) {
      return ""; // No data? No CSV!
    }
    const headers = Object.keys(jsonArray[0]).join(",");
    const rows = jsonArray.map((obj) => Object.values(obj).join(","));
    return [headers, ...rows].join("\n");
  }, []); // This function is so good, it barely needs to change!

  const csvData = convertToCSV(data); // Here's our data, ready for AI consumption!

  // The main function to ask our AI for insights!
  const callAI = useCallback(
    async (type) => {
      if (!csvData) {
        setInsights((prev) => ({
          ...prev,
          [type]:
            "Uh oh! Looks like there's **no data to analyze**. Please load some data first!",
        }));
        return;
      }

      setLoadingType(type); // Show everyone which button is busy!
      setInsights((prev) => ({ ...prev, [type]: "" })); // Clear the old insight to make room for the new.

      try {
        const res = await triggerInsights({ data: csvData, type }).unwrap();
        setInsights((prev) => ({ ...prev, [type]: res.result })); // Yay! Insights received!
      } catch (err) {
        console.error(`AI Insights Problem for ${type}:`, err);
        const errorMessage =
          err.data?.error ||
          "Whoops! Couldn't fetch AI insights. Maybe check your data or try again in a bit?";
        setInsights((prev) => ({ ...prev, [type]: errorMessage })); // Oh no, an error! Let's tell the user.
      } finally {
        setLoadingType(null); // All done, free to click another button!
      }
    },
    [csvData, triggerInsights] // These are the things that might make this function change.
  );

  return (
    <div>
      <motion.div className="flex flex-col space-y-4 mt-6 items-center">
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => callAI("summary")}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loadingType === "summary" || isLoading} // Disable if this button is busy or any AI call is loading.
          >
            {loadingType === "summary"
              ? "⏳ Summarizing..."
              : "📑 Get a Quick Summary!"}
          </button>
          <button
            onClick={() => callAI("trends")}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loadingType === "trends" || isLoading}
          >
            {loadingType === "trends"
              ? "⏳ Spotting Trends..."
              : "📈 Discover Key Trends!"}
          </button>
          <button
            onClick={() => callAI("chart")}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loadingType === "chart" || isLoading}
          >
            {loadingType === "chart"
              ? "⏳ Charting the Course..."
              : "📊 Suggest the Best Chart!"}
          </button>
          <button
            onClick={() => callAI("actionable_insights")} // Your new button for real wisdom!
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loadingType === "actionable_insights" || isLoading}
          >
            {loadingType === "actionable_insights"
              ? "⏳ Brainstorming Actions..."
              : "💡 Unlock Actionable Insights!"}
          </button>
        </div>

        {/* Displaying our fantastic insights as they arrive! */}
        {insights.summary && (
          <InsightCard
            title="📑 Your Quick Summary"
            content={insights.summary}
          />
        )}
        {insights.actionable_insights && ( // Show off those smart recommendations!
          <InsightCard
            title="💡 Actionable Insights for You"
            content={insights.actionable_insights}
          />
        )}
        {insights.trends && (
          <InsightCard
            title="📈 Notable Trends Uncovered"
            content={insights.trends}
          />
        )}
        {insights.chart && (
          <InsightCard
            title="📊 Chart Suggestion for Visualizing"
            content={insights.chart}
          />
        )}

        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 w-full max-w-3xl"
            role="alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <strong className="font-bold">Uh oh! Error Alert:</strong>{" "}
            <span className="block sm:inline">
              {error.data?.error ||
                "Something unexpected happened. Please try again!"}
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SmartAnalytics;

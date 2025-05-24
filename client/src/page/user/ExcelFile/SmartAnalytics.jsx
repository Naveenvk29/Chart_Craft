import React, { useState } from "react";
import { motion } from "motion/react";
import { useSmartanalyticsMutation } from "../../../redux/api/excelApi";

const InsightCard = ({ title, content }) => (
  <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg shadow mt-4 w-full max-w-3xl">
    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
      {title}
    </h3>
    <p className="text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap">
      {content}
    </p>
  </div>
);

const SmartAnalytics = ({ data }) => {
  const [aiSummary, setAiSummary] = useState("");
  const [aiTrends, setAiTrends] = useState("");
  const [aiChartSuggestion, setAiChartSuggestion] = useState("");
  const [loading, setLoading] = useState("");
  const [triggerInsights] = useSmartanalyticsMutation();
  console.log(data);

  const convertToCSV = (jsonArray) => {
    const headers = Object.keys(jsonArray[0]).join(",");
    const rows = jsonArray.map((obj) => Object.values(obj).join(","));
    return [headers, ...rows].join("\n");
  };

  const csv = convertToCSV(data);
  console.log(csv);
  const callAI = async (type, setter) => {
    try {
      setLoading(type);
      const res = await triggerInsights({ data: csv, type }).unwrap();
      setter(res.result);
    } catch (err) {
      setter("⚠️ Failed to get AI insights.");
      console.error("AI Insights Error:", err);
    } finally {
      setLoading("");
    }
  };

  return (
    <div>
      <motion.div className="flex flex-col space-y-4 mt-6 items-center">
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => callAI("summary", setAiSummary)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            disabled={loading === "summary"}
          >
            {loading === "summary"
              ? "⏳ Summarizing..."
              : "📑 Summarize this Excel data"}
          </button>
          <button
            onClick={() => callAI("trends", setAiTrends)}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            disabled={loading === "trends"}
          >
            {loading === "trends"
              ? "⏳ Analyzing trends..."
              : "📈 What trends are visible?"}
          </button>
          <button
            onClick={() => callAI("chart", setAiChartSuggestion)}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            disabled={loading === "chart"}
          >
            {loading === "chart"
              ? "⏳ Thinking of charts..."
              : "📊 Suggest best chart type"}
          </button>
        </div>

        {aiSummary && <InsightCard title="📑 Summary" content={aiSummary} />}
        {aiTrends && <InsightCard title="📈 Trends" content={aiTrends} />}
        {aiChartSuggestion && (
          <InsightCard
            title="📊 Chart Suggestion"
            content={aiChartSuggestion}
          />
        )}
      </motion.div>
    </div>
  );
};

export default SmartAnalytics;

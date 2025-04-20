import React from "react";
import Insights from "../../assets/Insights.webp";

const articles = [
  {
    title: "Accounting Automation: The Future of Financial Management",
    category: "Finance",
    date: "Feb 20th, '24",
    image: Insights,
  },
  {
    title: "5 Best accounting tools for small businesses",
    category: "Finance",
    date: "Oct 4th, '23",
    image: Insights,
  },
  {
    title: "Tax Software: The Power of Automation for US businesses",
    category: "Finance",
    date: "Feb 20th, '23",
    image: Insights,
  },
];

const Card = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
          {article.category}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-gray-900">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm mt-1">Updated {article.date}</p>
      </div>
    </div>
  );
};

const InsightsCard = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Accounting Practice Management Software Insights
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Card key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default InsightsCard;

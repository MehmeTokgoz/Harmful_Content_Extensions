// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";
import "./ChartForAdresses.scss";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
  "#775DD0",
  "#00E396",
  "#FEB019",
  "#FF66C3",
];

// Custom tooltip for chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>
          <strong>Extension:</strong> .{data.extension}
        </p>
        <p>
          <strong>Description:</strong> {data.desc}
        </p>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};

function ChartForAdresses() {
  const [hundredItem, setHundredItem] = useState([]);

  const getHarmfulContentInfo = async () => {
    const totalPages = 6;
    const allData = [];

    for (let page = 1; page < totalPages; page++) {
      try {
        const response = await axios.get(
          `https://www.usom.gov.tr/api/address/index?page=${page}`
        );
        const pageData = response.data;
        allData.push(...pageData.models);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setHundredItem(allData);
  };

  const countExtensions = () => {
    const extensions = {};
    hundredItem.forEach((item) => {
      const extension = item.url.split(".").pop();
      if (!extensions[extension]) {
        extensions[extension] = {
          count: 0,
          desc: item.desc,
        };
      }
      extensions[extension].count += 1;
    });
    return extensions;
  };

  const extensionCounts = countExtensions();
  let chartData = Object.entries(extensionCounts).map(
    ([extension, data]) => ({
      extension,
      count: data.count,
      desc: data.desc,
    })
  );

  chartData.sort((a, b) => b.count - a.count);

  if (chartData.length > 10) {
    const topTen = chartData.slice(0, 10);
    const otherCount = chartData
      .slice(10)
      .reduce((sum, item) => sum + item.count, 0);
    topTen.push({
      extension: "Other",
      count: otherCount,
      desc: "Grouped smaller extensions",
    });
    chartData = topTen;
  }

  useEffect(() => {
    getHarmfulContentInfo();
  }, []);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Harmful Content by Extensions</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="count"
            isAnimationActive
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={150}
            paddingAngle={3}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartForAdresses;

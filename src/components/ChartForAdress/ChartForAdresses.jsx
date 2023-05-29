

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import "./ChartForAdresses.scss";

// eslint-disable-next-line react/prop-types
const CustomTooltip = ({ active, payload }) => {
  // eslint-disable-next-line react/prop-types
  if (active && payload && payload.length) {
    // eslint-disable-next-line react/prop-types
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        {/* eslint-disable-next-line react/prop-types*/}
        <p>Uzantı: .{data.extension}</p>
        {/* eslint-disable-next-line react/prop-types*/}
        <p>Açıklama: {data.desc}</p>
      </div>
    );
  }
  return null;
};

function ChartForAdresses() {
  // eslint-disable-next-line no-unused-vars
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
        console.log(error);
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
  const chartData = Object.entries(extensionCounts).map(
    ([extension, data]) => ({
      extension,
      count: data.count,
      desc: data.desc,
    })
  );

  useEffect(() => {
    getHarmfulContentInfo();
  }, []);

  return (
    <>
      <div className="chart-container">
        <h2 className="chart-title">Uzantılarına Göre Zararlı İçerikler</h2>
        <PieChart className="main-pie-chart" width={600} height={500}>
          <Pie
            className="pie"
            dataKey="count"
            isAnimationActive={true}
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={200}
            label
            stroke="hsla(8, 25%, 23%, 1)"
          />
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`#${index.toString(16)}${index.toString(
                16
              )}${index.toString(16)}`}
            />
          ))}
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>
    </>
  );
}

export default ChartForAdresses;

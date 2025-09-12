
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
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
    <div className="chart-container">
      <h2 className="chart-title">Harmful Content by Extensions</h2>
      <PieChart width={600} height={500}>
        <Pie
          dataKey="count"
          isAnimationActive
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={200}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </div>
  );
}

export default ChartForAdresses;

{/*
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
         eslint-disable-next-line react/prop-types*
        <p>Extension: .{data.extension}</p>
         eslint-disable-next-line react/prop-types*
        <p>Description: {data.desc}</p>
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
        <h2 className="chart-title">HARMFUL CONTENT BY EXTENSIONS</h2>
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
*/}
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip } from "recharts";

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
      <PieChart width={600} height={600}>
        <Pie
          dataKey="count"
          isAnimationActive={false}
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={200}
          fill="#8884d8"
          label
        />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </>
  );
}

export default ChartForAdresses;

// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Tooltip } from "recharts";

// function ChartForAdresses() {
//   const [hundredItem, setHundredItem] = useState([]);

//   const getHarmfulContentInfo = async () => {
//     const totalPages = 6;
//     const allData = [];

//     for (let page = 1; page < totalPages; page++) {
//       try {
//         const response = await axios.get(
//           `https://www.usom.gov.tr/api/address/index?page=${page}`
//         );
//         const pageData = response.data;
//         allData.push(...pageData.models);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     setHundredItem(allData);
//   };

//   console.log(hundredItem);

//   useEffect(() => {
//     getHarmfulContentInfo();
//   }, []);

//   const data01 = [
//     { name: "Group A", value: 400 },
//     { name: "Group B", value: 300 },
//     { name: "Group C", value: 300 },
//     { name: "Group D", value: 200 },
//     { name: "Group E", value: 278 },
//     { name: "Group F", value: 189 },
//   ];

//   const data02 = [
//     { name: "Group A", value: 2400 },
//     { name: "Group B", value: 4567 },
//     { name: "Group C", value: 1398 },
//     { name: "Group D", value: 9800 },
//     { name: "Group E", value: 3908 },
//     { name: "Group F", value: 4800 },
//   ];

//   return (
//     <>
//       <button onClick={getHarmfulContentInfo}>Verileri Güncelle</button>
//       <PieChart width={400} height={400}>
//         <Pie
//           dataKey="value"
//           isAnimationActive={false}
//           data={data01}
//           cx="50%"
//           cy="50%"
//           outerRadius={80}
//           fill="#8884d8"
//           label
//         />
//         <Pie
//           dataKey="value"
//           data={data02}
//           cx={500}
//           cy={200}
//           innerRadius={40}
//           outerRadius={80}
//           fill="#82ca9d"
//         />
//         <Tooltip />
//       </PieChart>
//     </>
//   );
// }

// export default ChartForAdresses;

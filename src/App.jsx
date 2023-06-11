// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./App.scss";
import FoxWithButtons from "./components/FoxAndButtons/FoxWithButtons";
import HarmfulContentTable from "./components/UsomDatas/HarmfulContentTable";
import IPRangeGenerator from "./components/ipAddressGenerator/IPRangeGenerator";
import ChartForAdresses from "./components/ChartForAdress/ChartForAdresses";

function App() {
  const [showHarmfulContentTable, setShowHarmfulContentTable] = useState(false);
  const [showIPRangeGenerator, setShowIPRangeGenerator] = useState(false);
  const [showChartForAdresses, setShowChartForAdresses] = useState(false);
// Setting visibility for HarmfulContentTable, IP Generator and Chart
  const handleTableButtonClick = () => {
    setShowHarmfulContentTable(!showHarmfulContentTable);
    setShowIPRangeGenerator(false);
    setShowChartForAdresses(false);
  };
  const handleIPRangeButtonClick = () => {
    setShowIPRangeGenerator(!showIPRangeGenerator);
    setShowHarmfulContentTable(false);
    setShowChartForAdresses(false);
  };
  const handleChartButtonClick = () => {
    setShowChartForAdresses(!showChartForAdresses);
    setShowIPRangeGenerator(false);
    setShowHarmfulContentTable(false);
  };

  return (
    <>
      <div className="container">
        <FoxWithButtons />
        {showHarmfulContentTable && (
          <HarmfulContentTable />
        )}
        {showIPRangeGenerator && <IPRangeGenerator />}
        {showChartForAdresses && <ChartForAdresses />}
        <div className="main-contents-buttons">
          {
            <button
              id="button-1"
              className="buttons table-button"
              onClick={handleTableButtonClick}
            >
              HARMFUL CONTENT TABLE
            </button>
          }
          {
            <button
              id="button-2"
              className="buttons ip-button"
              onClick={handleIPRangeButtonClick}
            >
              QUERY IP
            </button>
          }
          {
            <button
              id="button-3"
              className="buttons chart-button"
              onClick={handleChartButtonClick}
            >
              GRAPH BASED ON DESCRIPTION
            </button>
          }
        </div>
      </div>
    </>
  );
}

export default App;

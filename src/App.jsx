// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./App.scss";
import FoxWithButtons from "./components/FoxAndButtons/FoxWithButtons";
import HarmfulContentTable from "./components/UsomDatas/HarmfulContentTable";
import IPRangeGenerator from "./components/ipAddressGenerator/IPRangeGenerator";
import ChartForAdresses from "./components/ChartForAdress/ChartForAdresses";

function App() {
  const [showHarmfulContentTable, setShowHarmfulContentTable] = useState(false);
  const [showIPRangeGenerator, setShowIPRangeGenerator] = useState(false);
  const [showChartForAdresses, setShowChartForAdresses] = useState(false);

  const handleTableButtonClick = () => {
    setShowHarmfulContentTable(!showHarmfulContentTable);
  };
  const handleIPRangeButtonClick = () => {
    setShowIPRangeGenerator(!showIPRangeGenerator);
  };
  const handleChartButtonClick = () => {
    setShowChartForAdresses(!showChartForAdresses);
  };

  return (
    <>
      <div className="container">
        <FoxWithButtons />
        {showHarmfulContentTable && <HarmfulContentTable />}
        {showIPRangeGenerator && <IPRangeGenerator />}
        {showChartForAdresses && <ChartForAdresses />}
        <div className="main-contents-buttons">
          {
            <button id="button-1" className="buttons table-button" onClick={handleTableButtonClick}>
              ZARARLI İÇERİKLER TABLOSU
            </button>
          }
          {<button id="button-2" className="buttons ip-button" onClick={handleIPRangeButtonClick}>IP SORGULA</button>}
          {
            <button id="button-3" className="buttons chart-button" onClick={handleChartButtonClick}>
              UZANTI VE AÇIKLAMALARA GÖRE GRAFİK
            </button>
          }
        </div>
      </div>
    </>
  );
}

export default App;

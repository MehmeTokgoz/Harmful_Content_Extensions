import "./App.scss";
import FoxWithButtons from "./components/FoxAndButtons/FoxWithButtons";
import HarmfulContentTable from "./components/UsomDatas/HarmfulContentTable";
import IPRangeGenerator from "./ipAddressGenerator/IPRangeGenerator";

function App() {
  return (
    <>
      <div>
        <FoxWithButtons />
        <HarmfulContentTable />
        <IPRangeGenerator />
      </div>
    </>
  );
}

export default App;

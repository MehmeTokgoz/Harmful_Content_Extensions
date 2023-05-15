import "./App.scss";
import FoxWithButtons from "./components/FoxAndButtons/FoxWithButtons";
import HarmfulContentInfo from "./components/UsomDatas/HarmfulContentInfo";
import EnhancedTable from "./components/UsomDatas/HarmfulContentTable";

function App() {
  return (
    <>
      <div>
        <FoxWithButtons />
        <EnhancedTable />
        <HarmfulContentInfo />

      </div>
    </>
  );
}

export default App;

// App.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  Stack,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper,
} from "@mui/material";
import FoxWithButtons from "./components/FoxAndButtons/FoxWithButtons";
import HarmfulContentTable from "./components/UsomDatas/HarmfulContentTable";
import IPRangeGenerator from "./components/ipAddressGenerator/IPRangeGenerator";
import ChartForAdresses from "./components/ChartForAdress/ChartForAdresses";

const theme = createTheme({
  palette: {
    mode: "light", // dark mode da eklenebilir
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
});

function App() {
  const [activeView, setActiveView] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Box display="flex" justifyContent="center" mb={3}>
            <FoxWithButtons />
          </Box>

          {/* Aktif component gösterimi */}
          <Box mb={3}>
            {activeView === "table" && <HarmfulContentTable />}
            {activeView === "ip" && <IPRangeGenerator />}
            {activeView === "chart" && <ChartForAdresses />}
          </Box>

          {/* Buton grubu */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant={activeView === "table" ? "contained" : "outlined"}
              onClick={() =>
                setActiveView(activeView === "table" ? null : "table")
              }
            >
              Harmful Content Table
            </Button>
            <Button
              color="secondary"
              variant={activeView === "ip" ? "contained" : "outlined"}
              onClick={() => setActiveView(activeView === "ip" ? null : "ip")}
            >
              Query IP
            </Button>
            <Button
              color="success"
              variant={activeView === "chart" ? "contained" : "outlined"}
              onClick={() =>
                setActiveView(activeView === "chart" ? null : "chart")
              }
            >
              Graph Based on Description
            </Button>
          </Stack>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;







{/* // eslint-disable-next-line no-unused-vars
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
*/}
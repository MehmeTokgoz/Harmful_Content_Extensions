// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./HarmfulContentTable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

function HarmfulContentTable() {
  const [hundredItem, setHundredItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [details, setDetails] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const getHarmfulContentInfo = useMemo(() => {
    return async () => {
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
      setIsLoading(false);
    };
  }, []);  

  console.log(hundredItem)
  
  useEffect(() => {
    getHarmfulContentInfo();
  }, []);

  const visibleRows = useMemo(
    () =>
      stableSort(hundredItem, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = showDetails
    ? [
        {
          id: "domain_name",
          numeric: false,
          disablePadding: true,
          label: "Domain İsmi",
        },
        {
          id: "city",
          numeric: true,
          disablePadding: false,
          label: "Şehir",
        },
        {
          id: "country",
          numeric: true,
          disablePadding: false,
          label: "Ülke",
        },
        {
          id: "zip_code",
          numeric: true,
          disablePadding: false,
          label: "Posta Kodu",
        },
        {
          id: "phone",
          numeric: true,
          disablePadding: false,
          label: "Telefon",
        },
        {},
      ]
    : [
        {
          id: "name",
          numeric: false,
          disablePadding: true,
          label: "Zararlı Adres (Url)",
        },
        {
          id: "date",
          numeric: true,
          disablePadding: false,
          label: "Eklenme Tarihi",
        },
        {
          id: "criticality_level",
          numeric: true,
          disablePadding: false,
          label: "Kritiklik Seviyesi",
        },
        {
          id: "description",
          numeric: true,
          disablePadding: false,
          label: "Açıklama",
        },
        {
          id: "source",
          numeric: true,
          disablePadding: false,
          label: "Kaynak",
        },
        {},
      ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = hundredItem.map((n) => n.url);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, url) => {
    const selectedIndex = selected.indexOf(url);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, url);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (url) => selected.indexOf(url) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - hundredItem.length) : 0;

  const handleShowInfo = async (url) => {
    try {
      const response = await axios.get(
        `/api/?key=0607942437A13C55233425498F4F2AFD&domain=${url}`
      );
      const data = response.data;
      setDetails([data]);
      setShowDetails(true);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(details.map((item) => item.registrant));

  return (
    <Box className="main-table-container">
      <Paper className="main-table-paper">
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className="harmful-content-table"
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={hundredItem.length}
              headCells={headCells}
            />
            <TableBody className="harmful-content-table-body">
              {showDetails
                ? details.map((detail, index) => {
                    const isItemSelected = isSelected(detail.registrant.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(event, detail.registrant.name)
                          }
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={detail.billing.domain_id}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                          className={`harmful-content-table-row ${
                            isItemSelected
                              ? "harmful-content-table-row-selected"
                              : ""
                          }`}
                          id="deneme"
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              // color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              className="harmful-content-table-body-cell"
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            className="harmful-content-table-body-cell"
                          >
                            {detail.registrant.name}
                          </TableCell>
                          <TableCell
                            align="right"
                            className="harmful-content-table-body-cell"
                          >
                            {detail.registrant.city}
                          </TableCell>
                          <TableCell
                            className="harmful-content-table-body-cell"
                            align="right"
                          >
                            {detail.registrant.country}
                          </TableCell>
                          <TableCell
                            className="harmful-content-table-body-cell"
                            align="right"
                          >
                            {detail.registrant.zip_code}
                          </TableCell>
                          <TableCell
                            className="harmful-content-table-body-cell"
                            align="right"
                          >
                            {detail.registrant.phone}
                          </TableCell>
                          <TableCell
                            className="harmful-content-table-body-cell"
                            align="right"
                          >
                            <Button
                              variant="outlined"
                              onClick={() => setShowDetails(false)}
                              id="button-show-info"
                            >
                              GERİ DÖN
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })
                : visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.url);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.url)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.url}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                        className={`harmful-content-table-row ${
                          isItemSelected
                            ? "harmful-content-table-row-selected"
                            : ""
                        }`}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            className="harmful-content-table-body-cell"
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          className="harmful-content-table-body-cell"
                        >
                          {row.url}
                        </TableCell>
                        <TableCell
                          align="right"
                          className="harmful-content-table-body-cell"
                        >
                          {row.date}
                        </TableCell>
                        <TableCell
                          className="harmful-content-table-body-cell"
                          align="right"
                        >
                          {row.criticality_level}
                        </TableCell>
                        <TableCell
                          className="harmful-content-table-body-cell"
                          align="right"
                        >
                          {row.desc}
                        </TableCell>
                        <TableCell
                          className="harmful-content-table-body-cell"
                          align="right"
                        >
                          {row.source}
                        </TableCell>
                        <TableCell
                          className="harmful-content-table-body-cell"
                          align="right"
                        >
                          <Button
                            variant="outlined"
                            onClick={() => handleShowInfo(row.url)}
                            id="button-show-info"
                          >
                            Bilgileri Göster
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage="Satır sayısı:"
          component="div"
          count={hundredItem.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
export default HarmfulContentTable;

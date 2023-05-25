// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./HarmfulContentTable.scss";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";

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
    setIsLoading(false);
  };
  console.log(hundredItem);

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
    return <div>Loading...</div>; // Veri çekilirken "Loading..." mesajını göster
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

  const headCells = [
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
  ];

  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead className="harmful-content-table-head">
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              className="harmful-content-table-head-cell"
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              className="harmful-content-table-head-cell"
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} Selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            ZARARLI ADRESLER
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

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
      setShowDetails(true);
      const response = await axios.get(
        `/api?key=0607942437A13C55233425498F4F2AFD&domain=${url}`
      );
      const data = response.data;
      setDetails([data]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(details.map((item)=>item.registrant.phone))

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
            />
            <TableBody className="harmful-content-table-body">
              {showDetails
                ? details.map((detail, index) => {
                    const isItemSelected = isSelected(detail.registrant.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
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
                          {detail.billing.domain}
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
                          {detail.registrant.email}
                        </TableCell>
                        <TableCell
                          className="harmful-content-table-body-cell"
                          align="right"
                        >
                          {detail.registrant.phone}
                        </TableCell>
                      </TableRow>
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

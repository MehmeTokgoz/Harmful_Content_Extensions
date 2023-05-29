// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha } from "@mui/material/styles";
import "./EnhancedTableToolbar.scss";

const EnhancedTableToolbar = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { numSelected, showDetails, setShowDetails} = props;

  return (
    <Toolbar
    className="main-toolbar"
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
      {numSelected > 0 && !showDetails ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Selected
        </Typography>
      ) : showDetails ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableDetailsTitle"
          component="div"
        >
          DETAILS
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          HARMFUL ADDRESSES
        </Typography>
      )}

      {numSelected > 0 && !showDetails ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : showDetails ? null : (
        <IconButton>
          <FilterListIcon />
        </IconButton>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  showDetails: PropTypes.bool.isRequired,
  setShowDetails: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;

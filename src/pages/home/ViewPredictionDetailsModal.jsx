import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ViewPredictionDetailsModal = ({ open, onClose, predictionData }) => {
  // State
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const matchingDataString = predictionData.matchesData
      ? predictionData.matchesData.replace(/'/g, '"')
      : undefined;

    const newRows = [];

    if (matchingDataString) {
      const matchingData = JSON.parse(matchingDataString);

      if (matchingData) {
        const labels = Object.keys(matchingData);

        labels.forEach((lbl) => {
          const matchingVal = matchingData[lbl] || 0;

          const val = (matchingVal * 100).toFixed(2);

          const rowItem = {
            label: lbl,
            value: `${val}%`,
          };

          newRows.push(rowItem);
        });
      }
      console.log("matchingData", matchingData);
    }

    setRows(newRows);
  }, []);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Prediction Details</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#000000",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Stack role="presentation">
          <div style={{ textAlign: "center" }}>
            <img
              src="https://fastly.picsum.photos/id/522/200/300.jpg?hmac=6-KFAVAX70eulRbHj_faT1bRFPGrXhPiDHXe6zPaH-4"
              alt={predictionData.classifiedClass}
              style={{ width: "150px", height: "150px", borderRadius: "7px" }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h6" fontWeight={600}>
              {predictionData.classifiedClass}
            </Typography>
          </div>
          <div style={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "gray" }}>
              {new Date(predictionData.createdAt).toDateString()}
            </Typography>
          </div>
          <div style={{ padding: "16px 0" }} />
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="prediction-details-table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Similarity (%)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <StyledTableRow key={row.label}>
                        <StyledTableCell component="th" scope="row">
                          {row.label}
                        </StyledTableCell>
                        <StyledTableCell>{row.value}</StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPredictionDetailsModal;

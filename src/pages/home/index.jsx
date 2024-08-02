import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { getPredictionHistory } from "../../apis";
import { StoreContext } from "../../store";
import FileUploader from "../../components/FileUploader";
import ViewPredictionDetailsModal from "./ViewPredictionDetailsModal";

const HomePage = () => {
  const { store, setStore } = useContext(StoreContext);

  // State
  const [historyList, setHistoryList] = useState([]);
  const [viewPredictionResultModalData, setViewPredictionResultModalData] =
    useState({
      open: false,
      historyItem: undefined,
    });

  useEffect(() => {
    getHistory();
  }, []);

  const updateStore = (attributes = {}) => {
    setStore((prevState) => ({
      ...prevState,
      ...attributes,
    }));
  };

  const getHistory = async () => {
    updateStore({ isLoading: true });

    await getPredictionHistory().then((res) => {
      if (res.success && res.data) {
        setHistoryList(res.data || []);
      }
    });

    updateStore({ isLoading: false });
  };

  const sortList = (a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    if (dateA < dateB) {
      return 1;
    }

    if (dateA > dateB) {
      return -1;
    }

    return 0;
  };

  const openiewPredictionResultModalData = (historyItem) => {
    setViewPredictionResultModalData({
      open: true,
      historyItem,
    });
  };

  const closePredictionResultModalData = () => {
    setViewPredictionResultModalData({
      open: false,
    });
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Stack>
          <div style={{ padding: "60px 0 30px 0" }}>
            <FileUploader updateHistoryList={getHistory} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Divider textAlign="left">
              <Typography variant="h6">Recent Predictions</Typography>
            </Divider>
          </div>
          <div>
            <Grid container spacing={2}>
              {historyList.sort(sortList).map((historyItem) => {
                let accuracy = "";

                const matchesData = JSON.parse(
                  historyItem.matchesData.replace(/'/g, '"')
                );

                if (matchesData) {
                  const matchingValue =
                    matchesData[historyItem.classifiedClass];

                  if (matchingValue) {
                    accuracy = `${(matchingValue * 100).toFixed(2)}%`;
                  }
                }

                return (
                  <Grid item xs={12} md={6} key={historyItem.jobId}>
                    <Card
                      elevation={0}
                      sx={{
                        transition: ".3s all ease",
                        "&:hover": { backgroundColor: "rgba(0,0,0, 0.1)" },
                      }}
                    >
                      <CardContent style={{ padding: "8px" }}>
                        <Stack direction="row" alignItems="center" gap={2}>
                          <Stack>
                            <Avatar
                              variant="rounded"
                              src="https://fastly.picsum.photos/id/522/200/300.jpg?hmac=6-KFAVAX70eulRbHj_faT1bRFPGrXhPiDHXe6zPaH-4"
                              sx={{ width: "60px", height: "60px" }}
                            />
                          </Stack>
                          <Stack flexGrow={1} flexWrap="wrap">
                            <Typography
                              className="ellipsis-text-one-line"
                              sx={{
                                fontSize: "14px",
                                fontWeight: 600,
                                textTransform: "capitalize",
                              }}
                            >
                              {historyItem.classifiedClass}
                            </Typography>
                            <Typography
                              className="ellipsis-text-one-line"
                              sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                textTransform: "capitalize",
                              }}
                            >
                              Precition Accuracy: {accuracy}
                            </Typography>
                            <Typography
                              className="ellipsis-text-one-line"
                              sx={{
                                fontSize: "12px",
                                fontWeight: 500,
                                textTransform: "capitalize",
                                color: "gray",
                              }}
                            >
                              Date:{" "}
                              {new Date(historyItem.createdAt).toDateString()}
                            </Typography>
                          </Stack>
                          <Stack>
                            <Button
                              size="small"
                              color="primary"
                              onClick={() =>
                                openiewPredictionResultModalData(historyItem)
                              }
                              sx={{
                                textTransform: "capitalize",
                                fontWeight: 600,
                                fontSize: "12px",
                              }}
                            >
                              View Similarity
                            </Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
              {!historyList.length ? (
                <Grid item xs={12}>
                  <Typography variant="h6" textAlign="center">
                    No history data yet!
                  </Typography>
                </Grid>
              ) : null}
            </Grid>
          </div>
        </Stack>
      </Container>
      {/* MODALS */}
      {viewPredictionResultModalData.open &&
      viewPredictionResultModalData.historyItem ? (
        <ViewPredictionDetailsModal
          open={viewPredictionResultModalData.open}
          onClose={closePredictionResultModalData}
          predictionData={viewPredictionResultModalData.historyItem}
        />
      ) : null}
    </div>
  );
};

export default HomePage;

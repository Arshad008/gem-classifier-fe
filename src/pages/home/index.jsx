import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { getPredictionHistory } from "../../apis";
import { StoreContext } from "../../store";
import FileUploader from "../../components/FileUploader";

const HomePage = () => {
  const { store, setStore } = useContext(StoreContext);

  // State
  const [historyList, setHistoryList] = useState([]);

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

  return (
    <div>
      <Container maxWidth="lg">
        <Stack>
          <div style={{ padding: "60px 0 30px 0" }}>
            <FileUploader />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Divider textAlign="left">
              <Typography variant="h6">Recent</Typography>
            </Divider>
          </div>
          <div>
            <Grid container spacing={2}>
              {historyList.map((historyItem, index) => {
                return (
                  <Grid item lg={2} key={historyItem.jobId}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://fastly.picsum.photos/id/522/200/300.jpg?hmac=6-KFAVAX70eulRbHj_faT1bRFPGrXhPiDHXe6zPaH-4"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Stack>
      </Container>
    </div>
  );
};

export default HomePage;

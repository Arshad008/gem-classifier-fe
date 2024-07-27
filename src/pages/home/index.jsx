import React from "react";
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

import FileUploader from "../../components/FileUploader";

const HomePage = () => {
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
              <Grid item lg={2}>
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
            </Grid>
          </div>
        </Stack>
      </Container>
    </div>
  );
};

export default HomePage;

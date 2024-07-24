import React from "react";
import { Container, Stack } from "@mui/material";
import FileUploader from "../../components/FileUploader";


const Home = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Stack>
          <div style={{ padding: '16px 0' }}>
            <FileUploader />
          </div>
        </Stack>
      </Container>
    </div>
  )
};

export default Home;

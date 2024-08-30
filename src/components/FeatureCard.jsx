import React from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";

const cardStyles = {
  border: "1px dashed gray",
  borderRadius: "7px",
};

const cardContentStyles = {
  padding: "16px 4px",
  minHeight: "80px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
};

const FeatureCard = ({ title, iconName }) => {
  const imagePath = `/images/features/${iconName}.png`;

  return (
    <Card elevation={0} sx={cardStyles}>
      <CardContent style={cardContentStyles}>
        <Stack gap={2}>
          <div style={{ textAlign: "center" }}>
            <img
              src={imagePath}
              alt={`feature-${iconName}`}
              style={{ width: "38px", height: "38px" }}
            />
          </div>
          <Typography
            fontWeight={600}
            fontSize="14px"
            textAlign="center"
            lineHeight={1.2}
          >
            {title}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;

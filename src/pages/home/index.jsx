import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion as MuiAccordion,
  AccordionActions,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Button,
  ButtonBase,
  Container,
  Stack,
  styled,
  Typography,
  Grid,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ArrowForwardIosSharp as ArrowForwardIosSharpIcon,
} from "@mui/icons-material";

import FeatureCard from "../../components/FeatureCard";

const heroContainerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  background:
    "url('/images/light-spot-left.png') no-repeat center left/contain, url('/images/light-spot-right.png') no-repeat center right/contain, url('/images/grid-bg.png'), #0d1116",
  color: "#ffffff",
  textAlign: "center",
  padding: "40px 16px",
  borderBottomLeftRadius: "12px",
  borderBottomRightRadius: "12px",
};

const heroActionButtonStyles = {
  padding: "12px 24px",
  borderRadius: "7px",
  backgroundColor: "#ffffff",
  color: "#000000",
  fontWeight: 600,
  fontSize: "18px",
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const accordionData = [
  {
    title: "What is this app about?",
    description:
      "Our app uses advanced AI technology to classify gemstones based on images you upload. It helps you identify the type and characteristics of various gemstones quickly and accurately.",
  },
  {
    title: "How do I use the app?",
    description:
      "Simply upload a clear image of your gemstone using the 'Upload' button on the home page. Our AI will analyze the image and provide you with an accurate classification within seconds.",
  },
  {
    title: "Do I need to create an account to use the app?",
    description:
      "Yes account is necessary! You can use the app immediately after the registration. This allows you to save and track your gemstone classifications results.",
  },
  {
    title: "Are there any costs associated with using the app?",
    description: "No, Our features are free to use",
  },
];

const features = [
  {
    iconName: "accuracy",
    title: "AI-Powered Accuracy",
  },
  {
    iconName: "fast",
    title: "Fast and Easy Process",
  },
  {
    iconName: "secure",
    title: "Secure and Private",
  },
  {
    iconName: "mobile-friendly",
    title: "Mobile Compatibility",
  },
  {
    iconName: "user-friendly",
    title: "User-Friendly Interface",
  },
];

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div>
        <Stack sx={heroContainerStyles} rowGap="10px">
          <Typography variant="h3">Discover the beauty of</Typography>
          <Typography
            variant="h3"
            mt="-15px"
            sx={{
              background: "-webkit-linear-gradient(360deg, #e6d9fe, #8e77f3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Gemstones with AI
          </Typography>
          <Typography style={{ fontWeight: 200, fontSize: "18px" }}>
            Upload an image of your gemstone and let our AI model classify
            instantly!
          </Typography>
          <img
            src="/images/hero-image.png"
            alt="app-logo"
            style={{ maxWidth: "250px", margin: "20px 0" }}
          />
          <ButtonBase
            sx={heroActionButtonStyles}
            onClick={() => navigate("/predict")}
          >
            Get Started
          </ButtonBase>
        </Stack>
      </div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, .03)",
          marginBottom: "60px",
        }}
      >
        <div style={{ marginBottom: "15px", padding: "30px 15px" }}>
          <div style={{ marginBottom: "15px" }}>
            <Typography variant="h5" textAlign="center">
              About
            </Typography>
          </div>
          <Typography textAlign="justify" maxWidth="800px" m="0 auto">
            Our gemstone classifying web app leverages cutting-edge AI
            technology to provide quick and accurate gemstone identification for
            enthusiasts and professionals alike. Our mission is to make gemstone
            knowledge accessible to everyone, offering a user-friendly platform
            that combines technology and passion for gems. Whether you're a
            gemologist or a curious collector, our app is designed to enhance
            your understanding and appreciation of these beautiful stones.
          </Typography>
        </div>
      </div>
      <Container maxWidth="lg" sx={{ pb: "60px" }}>
        {/* How It Works Section */}
        <Stack alignItems="center">
          <div style={{ marginBottom: "15px" }}>
            <Typography variant="h5" textAlign="center">
              How it works?
            </Typography>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src="/images/how-it-works.png"
              alt="how-it-works"
              style={{ width: "100%", maxWidth: "600px" }}
            />
          </div>
        </Stack>
      </Container>
      <Container sx={{ pb: "60px" }}>
        <div style={{ marginBottom: "15px" }}>
          <Typography variant="h5" textAlign="center">
            Features
          </Typography>
        </div>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Grid container spacing={2}>
            {features.map((featureItem, index) => {
              const keyName = `feature-item-${index + 1}`;

              return (
                <Grid item xs={12} sm={4} key={keyName}>
                  <FeatureCard {...featureItem} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Container>
      <Container maxWidth="lg" sx={{ pb: "60px" }}>
        {/* FAQ Section */}
        <Stack alignItems="center">
          <div style={{ marginBottom: "15px" }}>
            <Typography variant="h5" textAlign="center">
              Frequently Asked Questions
            </Typography>
          </div>
          <div style={{ maxWidth: "600px" }}>
            {accordionData.map((item, index) => {
              const key = `accordion-${index}`;
              const id = `panel-header-${index}`;
              const ariaControls = `panel-content-${index}`;

              const styles = {};

              if (index === 0) {
                styles.borderTopLeftRadius = "7px";
                styles.borderTopRightRadius = "7px";
              }

              if (index === accordionData.length - 1) {
                styles.borderBottomLeftRadius = "7px";
                styles.borderBottomRightRadius = "7px";
              }

              return (
                <Accordion key={key} sx={styles}>
                  <AccordionSummary id={id} aria-controls={ariaControls}>
                    <Typography>{item.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.description}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </Stack>
      </Container>
    </div>
  );
};

export default HomePage;

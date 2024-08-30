import React from "react";
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
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ArrowForwardIosSharp as ArrowForwardIosSharpIcon,
} from "@mui/icons-material";

const heroContainerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  background:
    "url('/images/light-spot-left.png') no-repeat center left/contain, url('/images/light-spot-right.png') no-repeat center right/contain, #0d1116",
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

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const HomePage = () => {
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
            style={{ maxWidth: "250px", margin: '20px 0' }}
          />
          <ButtonBase sx={heroActionButtonStyles}>Get Started</ButtonBase>
        </Stack>
      </div>
      <Container maxWidth="lg">
        {/* FAQ Section */}
        <Stack>
          <div style={{ marginBottom: "15px" }}>
            <Typography variant="h6">Frequently Asked Questions</Typography>
          </div>
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
        </Stack>
      </Container>
    </div>
  );
};

export default HomePage;

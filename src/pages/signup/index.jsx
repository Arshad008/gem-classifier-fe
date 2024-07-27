import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Collapse,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { signUpUser } from "../../apis";
import { isEmailValid } from "../../helpers";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "inherit",
};

const cardContainerStyles = {
  maxWidth: "600px",
  borderRadius: "20px",
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function SignUpPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // State
  const [state, setState] = useState({ ...initialState });
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const updateState = (attributes) => {
    setState((prevState) => ({
      ...prevState,
      ...attributes,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = [];

    if (!state.firstName.trim().length) {
      newErrors.push("First name is required.");
    } else if (state.firstName.trim().length < 3) {
      newErrors.push("First name should have at least 3 characters.");
    }

    if (!state.lastName.trim().length) {
      newErrors.push("Last name is required.");
    } else if (state.lastName.trim().length < 3) {
      newErrors.push("Last name should have at least 3 characters.");
    }

    if (!state.email.trim().length) {
      newErrors.push("Email is required.");
    } else if (!isEmailValid(state.email)) {
      newErrors.push("Invali email.");
    }

    if (!state.password.trim().length) {
      newErrors.push("Password is required.");
    } else if (state.password.trim().length < 8) {
      newErrors.push("Password should contain atleast 8 characters");
    }

    if (!newErrors.length) {
      setLoading(true);

      const apiData = {
        firstName: state.firstName.trim(),
        lastName: state.lastName.trim(),
        email: state.email.trim().toLowerCase(),
        password: state.password.trim(),
      };

      await signUpUser(apiData)
        .then((res) => {
          if (res.success) {
            enqueueSnackbar("User registration successfull, Please Login", {
              variant: "success",
            });

            navigate("/sign-in");
          } else {
            enqueueSnackbar(
              res.msg || "User registration failed, Please try again!",
              {
                variant: "error",
              }
            );
          }
        })
        .catch((err) => {
          enqueueSnackbar(
            err.message || "User registration failed, Please try again!",
            {
              variant: "error",
            }
          );
        });

      setLoading(false);
    }

    setErrors(newErrors);
  };

  return (
    <div style={containerStyles}>
      <Card style={cardContainerStyles}>
        <CardContent>
          <div style={{ marginBottom: "15px" }}>
            <Typography variant="h4">Sign Up</Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {errors.length ? (
                <Grid item xs={12}>
                  <Collapse in>
                    <Typography
                      component="ul"
                      sx={{
                        border: "1px solid red",
                        borderRadius: "4px",
                        paddingTop: "15px",
                        paddingBottom: "15px",
                      }}
                    >
                      {errors.map((item, index) => (
                        <Typography
                          key={index}
                          component="li"
                          variant="caption"
                          color="error.main"
                        >
                          {item}
                        </Typography>
                      ))}
                    </Typography>
                  </Collapse>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="First Name *"
                    placeholder="John"
                    value={state.firstName}
                    onChange={(e) => updateState({ firstName: e.target.value })}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Last Name *"
                    placeholder="Doe"
                    value={state.lastName}
                    onChange={(e) => updateState({ lastName: e.target.value })}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    type="email"
                    label="Email *"
                    placeholder="johndoe@gmail.com"
                    value={state.email}
                    onChange={(e) => updateState({ email: e.target.value })}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    type="password"
                    label="Password *"
                    placeholder="********"
                    value={state.password}
                    onChange={(e) => updateState({ password: e.target.value })}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Stack alignItems="center" mt="16px" spacing={2}>
              <LoadingButton
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                loading={isLoading}
                sx={{ maxWidth: "400px", textTransform: "capitalize" }}
              >
                Sign Up
              </LoadingButton>
              <Typography>
                Already have an account?{" "}
                <NavLink to="/sign-in" style={{ textDecoration: "none" }}>
                  <Typography component="span" color="primary" fontWeight={600}>
                    Sign In
                  </Typography>
                </NavLink>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpPage;

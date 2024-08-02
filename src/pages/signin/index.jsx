import React, { useContext, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { signInUser } from "../../apis";
import { StoreContext } from "../../store";
import {
  getSha512ConvertedHash,
  setAuthUserIdToLocalStorage,
} from "../../helpers";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "inherit",
};

const cardContainerStyles = {
  maxWidth: "400px",
  borderRadius: "20px",
  margin: "15px 0",
};

const initialState = {
  email: "",
  password: "",
};

function SignInPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { store, setStore } = useContext(StoreContext);

  // State
  const [state, setState] = useState({ ...initialState });
  const [isLoading, setLoading] = useState(false);

  const isSubmitDisabled =
    !state.email.trim().length || !state.password.trim().length;

  const updateState = (attributes) => {
    setState((prevState) => ({
      ...prevState,
      ...attributes,
    }));
  };

  const updateStore = (attributes = {}) => {
    setStore((prevState) => ({
      ...prevState,
      ...attributes,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await signInUser({
      email: state.email,
      password: getSha512ConvertedHash(state.password),
    })
      .then((res) => {
        if (res.data && res.success) {
          setAuthUserIdToLocalStorage(res.data);
          updateStore({
            authUserId: res.data,
          });

          navigate("/");
          window.location.reload();
        } else {
          enqueueSnackbar("Invalid username or password!", {
            variant: "error",
          });
        }
      })
      .catch(() => {
        enqueueSnackbar("Invalid username or password!", {
          variant: "error",
        });
      });

    setLoading(false);
  };

  return (
    <div style={containerStyles}>
      <Card style={cardContainerStyles}>
        <CardContent>
          <div style={{ marginBottom: "15px" }}>
            <Typography variant="h4">Sign In</Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    type="email"
                    label="Email *"
                    placeholder="johndoe@gmail.com"
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
                disabled={isSubmitDisabled}
                sx={{ maxWidth: "300px", textTransform: "capitalize" }}
              >
                Sign In
              </LoadingButton>
              <Typography>
                Don't have an account?{" "}
                <NavLink to="/sign-up" style={{ textDecoration: "none" }}>
                  <Typography component="span" color="primary" fontWeight={600}>
                    Sign Up
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

export default SignInPage;

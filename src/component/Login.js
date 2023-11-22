import { useContext, useState } from "react";
import backgroundImage from './../imgs/bg.jpg'; 
import {
  Grid,
  Button,
  Typography,
  makeStyles,
  Paper,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

const customTheme = createMuiTheme({
  typography: {
    fontFamily: 'serif', // Applying serif font globally
  },
});

const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
    backgroundSize: "180% 180%",
    animation: "$gradient-animation 18s ease infinite",
    backgroundImage:`url(${backgroundImage})`,
  },
  root: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    minHeight: '93vh',
    // Other styles you want to apply
  },
  inputBox: {
    width: "300px",
  },
  submitButton: {
    width: "300px",
  },
  "@keyframes gradient-animation": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return (
    <ThemeProvider theme={customTheme}
    className={`${classes.root} gradient-background`}>
      {loggedin ? (
        <Redirect to="/" />
      ) : (
        <Paper
          elevation={3}
          className={`${classes.body} gradient-background`}
        >
          <Grid container direction="column" spacing={4} alignItems="center">
            <Grid item>
              <Typography variant="h3" component="h2">
                Login
              </Typography>
            </Grid>
            <Grid item>
              <EmailInput
                label="Email"
                value={loginDetails.email}
                onChange={(event) => handleInput("email", event.target.value)}
                inputErrorHandler={inputErrorHandler}
                handleInputError={handleInputError}
                className={classes.inputBox}
              />
            </Grid>
            <Grid item>
              <PasswordInput
                label="Password"
                value={loginDetails.password}
                onChange={(event) => handleInput("password", event.target.value)}
                className={classes.inputBox}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogin()}
                className={classes.submitButton}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </ThemeProvider>
  );
};

export default Login;

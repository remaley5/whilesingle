import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
// import styled from 'styled-components';
import { withStyles } from "@material-ui/core/styles";
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { buttonThemeOne } from "../styles/buttonThemes.js";
// import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import AuthContext from "../auth";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

// const DialogTitle = withStyles(styles)((props) => {
withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function Login(props) {
	// changed open default value to props.location.redirected - idea is that if they click 'sign in instead' from sign up page, they will be redirected to the login page with redirected = true - this will open the sign in modal immediately
	// props.location is always defined. If redirected is undefined, page functions as desired.
  let [open, setOpen] = useState(props.location.redirected);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState([]);
  const { fetchWithCSRF, setCurrentUserId } = useContext(AuthContext);
  let history = useHistory();
  // const classes =
  buttonThemeOne();

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  async function loginUser(email, password) {
    // console.log(email, password)
    const response = await fetchWithCSRF("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      setErrors(responseData.errors);
    } else {
      setOpen(false);
      setCurrentUserId(responseData.current_user_id);
      history.push("/");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
    // return <Redirect to="/" />;
  };

  const handleDemoUserSubmit = (e) => {
    e.preventDefault();
    loginUser("ian@aa.io", "password");
  };
  return (
    <div className="landing">
      <div className="body">
        <dialog
          open={open}
          onClose={handleClose}
          className="page-mask"
          aria-labelledby="form-dialog-title"
        >
          <div className="sign-in-dialog">
            <div className="sign-in__content">
              <button
                onClick={handleClose}
                className="exit-sign"
                style={{ cursor: "pointer" }}
              >
                x
              </button>
              <div className="sign-in__title">Sign in</div>
              <div
                className="sign-in__errors"
                id="form-dialog-title"
                onClose={handleClose}
              >
                {errors.length
                  ? errors.map((err) => <li key={err}>{err}</li>)
                  : ""}
              </div>
              <div className="sign-form">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="sign-in__text"
                  margin="none"
                  variant="outlined"
                  id="email"
                  type="email"
                  placeholder="Email"
                  fullWidth
                  onChange={handleEmailChange}
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="sign-in__text"
                  margin="none"
                  id="password"
                  variant="outlined"
                  type="password"
                  placeholder="Password"
                  fullWidth
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="sign-form-btns">
                <button
                  className="sign-form-btn left"
                  onClick={handleSubmit}
                  style={{ cursor: "pointer" }}
                >
                  sign in
                </button>
                <button
                  className="sign-form-btn right"
                  onClick={handleDemoUserSubmit}
                  style={{ cursor: "pointer" }}
                >
                  demo sign in
                </button>
              </div>
            </div>
          </div>
        </dialog>
        <div className="main">
          <div className="title">while(single):</div>
          <div className="landing-txt">
            <p>
              On while(single): you are more than just an HTML element. You're a
              probably a bunch of them. Get out of the daily grind and repeat
              the loop of dating. Look for people who you pair well with thanks
              to our match algorithm and say goodbye to type errors.
            </p>
          </div>
          <div className="landing-btns">
            <NavLink
              variant="contained"
              to="/signup"
              className="signup-btn landing-btn"
            >
              sign up
            </NavLink>
            <button
              color="primary"
              className="sign-in-btn landing-btn"
              onClick={handleOpen}
              style={{ cursor: "pointer" }}
            >
              sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;

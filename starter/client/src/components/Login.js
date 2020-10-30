import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { buttonThemeOne } from '../styles/buttonThemes.js';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import AuthContext from '../auth';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
});

const LoginWrapper = styled.div`
  .header{
    display: flex;
    justify-content: space-between;
  }

  .logo {
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: bold;
    color: black;
  }

  .login{
    display: flex;
    align-items: flex-end;
  }

  .login-text{
    align-self: center;
    padding-right: 10px;
    font-size: 16px;
    font-weight: bold;
    font-family: 'Roboto';
  }

  .main{
    margin: auto;
    width: 50%;
  }

  .main p{
    font-size: 20px;
    line-height: 30px;
  }
`;

function Login(props) {
  let [open, setOpen] = useState(false);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [errors, setErrors] = useState([]);
  const {fetchWithCSRF, setCurrentUserId} = useContext(AuthContext);
  let history = useHistory();

  const classes = buttonThemeOne()

  const handleOpen = (e) => {
    setOpen(true);
  }

  const handleClose = (e) => {
    setOpen(false);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  async function loginUser(email, password) {
		console.log(email, password)
    const response = await fetchWithCSRF('/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    });

    const responseData = await response.json();
    if(!response.ok) {
      setErrors(responseData.errors);
    } else {
      setOpen(false);
      setCurrentUserId(responseData.current_user_id)
      history.push('/')
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
    // return <Redirect to="/" />;
  }

  const handleDemoUserSubmit = (e) => {
    e.preventDefault();
    loginUser("ian@aa.io", "password");
  }

  return (
      <LoginWrapper>
        <div className="header">
          <div className="logo">while(single):</div>
          <div className="login">
            <div className="login-text">Have an account?</div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>Sign in</Button>
          </div>
        </div>
        <div className="body">
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" onClose={handleClose}>
              {errors.length ? errors.map((err) => <li key={err}>{err}</li>) : ''}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter Email and Password
              </DialogContentText>
              <label htmlFor="email">Email</label>
              <TextField
                margin="none"
                variant="outlined"
                id="email"
                type="email"
                placeholder="Email"
                fullWidth
                onChange={handleEmailChange}
              />
              <label htmlFor="password">Password</label>
              <TextField
                margin="none"
                id="password"
                variant="outlined"
                type="password"
                placeholder="Password"
                fullWidth
                onChange={handlePasswordChange}
              />
            </DialogContent>
            <DialogActions>
              <Button className={clsx(classes.root)} onClick={handleSubmit}>
                Sign-In
              </Button>
              <Button className={clsx(classes.root)} onClick={handleDemoUserSubmit}>
                Demo User Sign-In
              </Button>
            </DialogActions>
          </Dialog>
          <div className="main">
            <h1>Dating Deserves Better</h1>
            <p>On while(single): you are more than just an HTML element. You're a probably a bunch of them. Get out of the daily grind and repeat the loop of dating. Look for people who you pair well with thanks to our match algorithm and say goodbye to type errors.</p>
            <Button
              variant="contained"
              href="/signup"
              className={classes.signup}
            >JOIN while(single):</Button>
          </div>
        </div>
        <img src='https://while-single-bucket.s3-us-west-2.amazonaws.com/WedOct281609032020.png' alt='home'/>
      </LoginWrapper>
  );
}
export default Login;

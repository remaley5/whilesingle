import React, {useState} from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
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
import { Redirect } from 'react-router-dom';


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

const LoginSignupWrapper = styled.div`
  .header{
    display: flex;
    justify-content: space-between;
  }

  .login{
    display: flex;
    align-items: flex-end;
  }
`;

function LoginSignup(props) {
  let [open, setOpen] = useState(false);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    console.log(email, password);
    return <Redirect to="/" />;
  }

  return (
      <LoginSignupWrapper>
        <div className="header">
          <div>Logo</div>
          <div className="login">
            <div>Have an account?</div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>Sign in</Button>
          </div>
        </div>
        <div className="body">
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" onClose={handleClose}></DialogTitle>
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
                Next
              </Button>
            </DialogActions>
          </Dialog>
          <h1>Dating Deserves Better</h1>
          <p>On OkCupid, you’re more than just a photo. You have stories to tell, and passions to share, and things to talk about that are more interesting than the weather. Get noticed for who you are, not what you look like. Because you deserve what dating deserves: better.</p>
          <button>Join OKCUPID</button>
        </div>
      </LoginSignupWrapper>
  );
}
export default LoginSignup;

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
import { Redirect, useHistory } from 'react-router-dom';
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

  .login{
    display: flex;
    align-items: flex-end;
  }

  .login-text{

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    async function loginUser() {
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

    loginUser();
    // return <Redirect to="/" />;
  }

  return (
      <LoginWrapper>
        <div className="header">
          <div>while(single):</div>
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
                Next
              </Button>
            </DialogActions>
          </Dialog>
          <div className="main">
            <h1>Dating Deserves Better</h1>
            <p>On OkCupid, you’re more than just a photo. You have stories to tell, and passions to share, and things to talk about that are more interesting than the weather. Get noticed for who you are, not what you look like. Because you deserve what dating deserves: better.</p>
            <Button
              variant="contained"
              href="/signup"
              className={classes.signup}
            >JOIN while(single):</Button>
          </div>
        </div>
      </LoginWrapper>
  );
}
export default Login;

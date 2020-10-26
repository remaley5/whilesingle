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

function LoginSignup(props) {
  let [open, setOpen] = useState(false);

  const classes = withStyles(styles)

  const handleOpen = (e) => {
    setOpen(true);
  }

  const handleClose = (e) => {
    setOpen(false);
  }

  return (
      <>
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
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email"
                type="email"
                placeholder="Email"
                fullWidth
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                placeholder="Password"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button classes={classes.nextButton} onClick={handleClose} color="primary">
                Next
              </Button>
            </DialogActions>
          </Dialog>
          <h1>Dating Deserves Better</h1>
          <p>On OkCupid, you’re more than just a photo. You have stories to tell, and passions to share, and things to talk about that are more interesting than the weather. Get noticed for who you are, not what you look like. Because you deserve what dating deserves: better.</p>
          <button>Join OKCUPID</button>
        </div>
      </>
  );
}
export default LoginSignup;

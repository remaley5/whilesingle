import { makeStyles } from '@material-ui/core/styles';

export const buttonThemeOne = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #33FFC0 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      margin: "auto",
      width: "90%"
    },
    label: {
      textTransform: 'capitalize',
    },
    signup: {
      background: 'black',
      color: 'white',
      width: '35%',
      padding: '15px',
    }

});

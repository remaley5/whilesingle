import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Upload from "./Upload";

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


let user = {
    username: 'Sophie',
    location: 'Portland, OR',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget nunc tempor laoreet. Quisque ac gravida enim, at viverra lorem. Nulla quis magna leo. Donec quis ante vel magna sodales luctus ac sed ipsum. Nulla consequat varius finibus. Sed non fermentum ex. Fusce dignis',
    preferences: 'Gay, Androgynous, Single, Monogamy or Non-Monogamy'
}

let questions = [
    {
        question: 'I could probably beat you at',
        alt: 'Go ahead and brag a little, champ'
    },
    {
        question: 'My golden rule',
        alt: 'The thing you live by'
    }
]
let answeredQuestions = [
    {
        question: 'My current goal',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget nunc tempor laoreet. Quisque ac gravida enim, at viverra lorem. '
    },
    {
        question: 'My favorite furry friend',
        answer: 'Lorem ipsum dolor sit amet.'
    }
]

function AddPhotos({open, setOpen}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <Upload open={open} setOpen={setOpen}/>
                </Dialog>
            </div>
        </>
    );
}
export default AddPhotos;

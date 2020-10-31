import React from 'react';
// import EditIcon from '@material-ui/icons/Edit';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';
import Upload from "./Upload";

// const styles = (theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(2),
//     },
//     closeButton: {
//         position: 'absolute',
//         right: theme.spacing(1),
//         top: theme.spacing(1),
//         color: theme.palette.grey[500],
//     },
// });

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

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Upload from "./Upload";

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

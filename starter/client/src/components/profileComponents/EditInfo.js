import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import SetPreferences from '../loginComponents/SetPreferences'

function EditInfo({open, setOpen}) {
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <div>
                <Dialog className='edit-popup' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <div className='edit-info-popup'>
                        <SetPreferences edit='true'/>
                    </div>
                </Dialog>
            </div>
        </>
    );
}

export default EditInfo;

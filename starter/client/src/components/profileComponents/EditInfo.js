import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import SetPreferences from '../loginComponents/SetPreferences'

<<<<<<< HEAD
function EditInfo({open, setOpen}) {

=======
function EditInfo({open, setOpen, user}) {
>>>>>>> bafbfbf5742d76623d7b3c7a8b012ae20cedbacf
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <div>
                <Dialog className='edit-popup' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <div className='edit-info-popup'>
<<<<<<< HEAD
                        <SetPreferences edit='true' handleClose={handleClose} />
=======
                        <SetPreferences edit='true' handleClose={handleClose} user={user} />
>>>>>>> bafbfbf5742d76623d7b3c7a8b012ae20cedbacf
                    </div>
                </Dialog>
            </div>
        </>
    );
}

export default EditInfo;

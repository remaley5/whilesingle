import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import SetPreferences from './loginComponents/SetPreferences'

function EditInfo({open, setOpen, user}) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                <dialog className='page-mask' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <div className='edit-info-dialog'>
                        <SetPreferences edit='true' handleClose={handleClose} user={user} />
                    </div>
                </dialog>
            </div>
        </>
    );
}

export default EditInfo;

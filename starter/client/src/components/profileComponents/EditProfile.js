import React, {useContext} from "react";
import AddPhotos from "./AddPhotos";
import EditIcon from "@material-ui/icons/Edit";
// import { withStyles } from '@material-ui/core/styles';
import {UserProfileContext, } from '../../context/user_profile_context';

import Button from "@material-ui/core/Button";
import Fr from '../../views/Fr'


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

function EditProfile(props) {
	const [open, setOpen] = React.useState(false);
	const user = useContext(UserProfileContext);
	let {first_name, last_name, bio, location, preferences, gender, pronouns} = user
  const handleClickOpen = () => {
    setOpen(true);
	};
	// we're going to add a second level of validation (beyond logging in) that requires user to enter location, preferences, gender, and bio before viewing the full site. Use placeholders for now
	if(!location) {
		location = 'Planet Earth'
	}
	if(!preferences){
		preferences = ['All of them']
	}
	if(!bio) {
		bio = 'Tell us about yourself'
	}
	if(!gender) {
		gender = 'Human'
	}
	if(!pronouns) {
		pronouns = 'They/Them'
	}
	const preferencesString = preferences.join(', ')
  const handleClose = () => {
    setOpen(false);
	};
  return (
    <>
      <div className="pro-con">
        <div className="pro-head">
          <img
            className="pro-head__img"
            src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
          />
          <div className="pro-head__cont">
            <h2 className="pro-head__username">{`${first_name} ${last_name}`}</h2>
            <h4 className="pro-head__location">{location}</h4>
            <p className="pro-head__pref">Identifies as: {gender}</p>
						<p className="pro-head__pref">Pronouns: {pronouns} pronouns</p>
						<p className="pro-head__pref">Interested in: {preferencesString}</p>
          </div>
        </div>
        <div className="pro-body-outer">
          <div className="pro-body">
            <div className="pro-body__con">
              <h3 className="pro-body__head">about me</h3>
              <p className="pro-body__cont">{bio}</p>
            </div>
            <div className='pro-body__img-con'>
              {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>edit photos</Button> */}
              <EditIcon className='edit-icon' onClick={handleClickOpen} />
              <div className='pro-body__imgs'>
                  <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                  <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                  <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                  <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                  <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                  <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
              </div>
            </div>
						<Fr show={'edit'} />
          </div>
        </div>
      </div>
      <AddPhotos open={open} setOpen={setOpen} />
    </>
  );
}
export default EditProfile;

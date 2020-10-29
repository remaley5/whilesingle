import React, {useContext} from "react";
import AddPhotos from "./AddPhotos";
import EditIcon from "@material-ui/icons/Edit";
// import { withStyles } from '@material-ui/core/styles';
import {UserProfileContext, } from '../../context/user_profile_context';

import Button from "@material-ui/core/Button";
import Fr from '../../views/Fr'

// import context provider component

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
	},
});

// let user = {
//   username: "Sophie",
//   location: "Portland, OR",
//   bio:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget nunc tempor laoreet. Quisque ac gravida enim, at viverra lorem. Nulla quis magna leo. Donec quis ante vel magna sodales luctus ac sed ipsum. Nulla consequat varius finibus. Sed non fermentum ex. Fusce dignis",
//   preferences: "Gay, Androgynous, Single, Monogamy or Non-Monogamy",
// };

// let questions = [
//   {
//     question: "I could probably beat you at",
//     alt: "Go ahead and brag a little, champ",
//   },
//   {
//     question: "My golden rule",
//     alt: "The thing you live by",
//   },
// ];
// let answeredQuestions = [
//   {
//     question: "My current goal",
//     answer:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget nunc tempor laoreet. Quisque ac gravida enim, at viverra lorem. ",
//   },
//   {
//     question: "My favorite furry friend",
//     answer: "Lorem ipsum dolor sit amet.",
//   },
// ];

function EditProfile(props) {
	const [open, setOpen] = React.useState(false);
	const user = useContext(UserProfileContext);
	let {first_name, last_name, bio, location, preferences} = user
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
            <p className="pro-head__pref">{preferencesString}</p>
          </div>
        </div>
        <div className="pro-body-outer">
          <div className="pro-body">
            <div className="pro-body__con">
              <h3 className="pro-body__head">about me</h3>
              <p className="pro-body__cont">{bio}</p>
            </div>
            <div className="pro-body__img-con">
              {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>edit photos</Button> */}
              <EditIcon className="edit-icon" onClick={handleClickOpen} />
              <div className="pro-body__imgs">
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
              </div>
            </div>
						<Fr show={'edit'} />
            {/* {answeredQuestions.map((question) => {
              return (
                <div className="pro-body__con">
                  <h3 className="pro-body__head">{question.question}</h3>
                  <p className="pro-body__cont">{question.answer}</p>
                </div>
              );
            })}
            {questions.map((question) => {
              return (
                <div className="pro-body__con">
                  <h3 className="pro-body__head">{question.question}</h3>
                  <p className="pro-body__alt-cont">{question.alt}</p>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
      <AddPhotos open={open} setOpen={setOpen} />
    </>
  );
}
export default EditProfile;

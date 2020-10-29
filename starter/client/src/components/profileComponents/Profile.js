import React from 'react';
import AddPhotos from './AddPhotos'
import Button from '@material-ui/core/Button';


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

function Profile(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    return (
        <>
            <div className='pro-con'>
                <div className='pro-head'>
                    <img className='pro-head__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                    <div className='pro-head__cont'>
                        <h2 className='pro-head__username'>{user.username}</h2>
                        <h4 className='pro-head__location'>{user.location}</h4>
                        <p className='pro-head__pref'>{user.preferences}</p>
                    </div>
                </div>
                <div className='pro-body-outer'>
                    <div className='pro-body'>
                        <div className='pro-body__con'>
                            <h3 className='pro-body__head'>about me</h3>
                            <p className='pro-body__cont'>{user.bio}</p>
                        </div>
                        <div className='pro-body__img-con'>
                            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>edit photos</Button> */}
                            <div className='pro-body__imgs'>
                                <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                                <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                                <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                                <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                                <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                                <img className='pro-body__img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' />
                            </div>
                        </div>
                        {answeredQuestions.map((question) => {
                            return (
                                <div className='pro-body__con'>
                                    <h3 className='pro-body__head'>{question.question}</h3>
                                    <p className='pro-body__cont'>{question.answer}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile;

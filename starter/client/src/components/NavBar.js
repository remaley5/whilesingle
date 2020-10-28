import React, { useContext } from 'react';
import '../styles/navbar.css'
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth'
import HomeIcon from '@material-ui/icons/Home';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import Tooltip from '@material-ui/core/Tooltip';
import navStyles from '../styles/navbarThemes';


const NavBar = () => {

    const { fetchWithCSRF, setCurrentUserId } = useContext(AuthContext);

    const navClass = navStyles();

    const logoutUser = async ()=> {
        const response = await fetchWithCSRF('/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if(response.ok){
            setCurrentUserId(null)
        }
    }


    return (
        <div className='navbar-wrapper'>
            <nav className='nav-links'>
                <div className='logo'>while(single):</div>
                <Tooltip title='Home'>
                    <div>
                        <NavLink to="/"><HomeIcon className={navClass.home} /></NavLink>
                    </div>
                </Tooltip>
                <Tooltip title='Matches'>
                    <div>
                        <NavLink to="/users"><SupervisorAccountRoundedIcon className={navClass.matches} /></NavLink>
                    </div>
                </Tooltip>
                <Tooltip title='Messages'>
                    <div>
                        <NavLink to="/messenger"><QuestionAnswerRoundedIcon className={navClass.messages}/></NavLink>
                    </div>
                </Tooltip>
                <Tooltip title='Messages'>
                    <div>
                        <a onClick={logoutUser} href="/login">
                            <MeetingRoomRoundedIcon className={navClass.logout} />
                        </a>
                    </div>
                </Tooltip>
            </nav>
        </div>
    )
}

export default NavBar

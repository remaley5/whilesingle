import React, { useContext } from 'react';
import '../styles/navbar.css'
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth'
import AssessmentIcon from '@material-ui/icons/Assessment';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import Tooltip from '@material-ui/core/Tooltip';
import navStyles from '../styles/navbarThemes';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

const NavBar = () => {

    const { fetchWithCSRF, setCurrentUserId, currentUserId } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

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
                <div className='icons' >
                <NavLink to='/' className='menu-link'>
                    <div className='logo'>while(single):</div>
                </NavLink>
                <Tooltip title='Take Match Quiz'>
                    <div>
                        <NavLink to="/quiz"><AssessmentIcon className={navClass.messages} /></NavLink>
                    </div>
                </Tooltip>
                <Tooltip title='Messages'>
                    <div>
                        <NavLink to="/messenger"><QuestionAnswerRoundedIcon className={navClass.messages}/></NavLink>
                    </div>
                </Tooltip>
                </div>
                <div>
                    <MoreVertRoundedIcon onClick={handleClick} className={navClass.messages} />
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <NavLink to={`/profile/${currentUserId}`} className='menu-link'>
                            <MenuItem>Profile</MenuItem>
                        </NavLink>
                        <MenuItem onClick={logoutUser}>Logout</MenuItem>
                    </Menu>
                </div>
            </nav>
        </div>
    )
}

export default NavBar

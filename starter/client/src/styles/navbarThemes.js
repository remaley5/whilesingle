import { makeStyles } from '@material-ui/core/styles'


const navStyles = makeStyles((theme) => ({
    home:{
        fontSize: 35,
        color: 'white',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    matches:{
        fontSize: 38,
        color: 'white',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    messages:{
        fontSize: 35,
        color: 'white',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    logout:{
        fontSize: 35,
        color: 'white',
        '&:hover': {
            cursor: 'pointer',
        },
    },
}))

export default navStyles;
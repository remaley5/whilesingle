import { makeStyles } from '@material-ui/core/styles';

export const iconTheme = makeStyles({
    heart: {
        fontSize: 70,
        alignSelf: 'flex-end',
        '&:hover': {
            cursor: 'pointer',
            color: '#ff6f87',
            fontSize: 80,
            boxShadow: '0 0 6 white'
        },
        color: 'rgb(233, 145, 160)',
    },
    nope: {
        fontSize: 70,
        alignSelf: 'flex-end',
        '&:hover': {
            cursor: 'pointer',
            color: '#6f42ba',
            fontSize: 80,
        },
        color: 'rgb(145, 146, 233)',
    },
});

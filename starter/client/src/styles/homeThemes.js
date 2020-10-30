import { makeStyles } from '@material-ui/core/styles';

export const iconTheme = makeStyles({
    heart: {
        fontSize: 35,
        alignSelf: 'flex-end',
        '&:hover': {
            cursor: 'pointer',
        },
        color: 'rgb(233, 145, 160)',
    },
    nope: {
        fontSize: 40,
        alignSelf: 'flex-end',
        '&:hover': {
            cursor: 'pointer',
        },
        color: 'rgb(145, 146, 233)',
    },
});
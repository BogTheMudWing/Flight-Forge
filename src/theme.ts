import {createTheme} from '@mantine/core';
import './fonts/Ubuntu.woff'

export const theme = createTheme({
    colors: {
        purpleFire: [
            '#fee9ff',
            '#f4d1ff',
            '#e5a0fc',
            '#d56cf8',
            '#c840f5',
            '#c22cf4',
            '#bc13f4',
            '#a504d9',
            '#9300c3',
            '#8000ab',
        ],
    },
    fontFamily: 'Ubuntu, Roboto, sans-serif',
    primaryColor: 'purpleFire',
    defaultRadius: 'md',
});

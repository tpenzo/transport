'use client';

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        // xxl: true;
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            // xxl: 1536,
        },
    },
});

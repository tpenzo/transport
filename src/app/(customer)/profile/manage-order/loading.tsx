import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
    return (
        <Box className="w-[100wh] h-[100vh] flex items-center justify-center">
            <CircularProgress />
        </Box>
    );
}

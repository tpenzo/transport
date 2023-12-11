import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
    return (
        <Box className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-500 opacity-60 flex flex-col items-center justify-center">
            <Box className="mb-2">
                <CircularProgress />
            </Box>
            <Typography className="text-center text-white text-xl font-semibold">
                Loading...
            </Typography>
            <Typography className="w-1/3 text-center text-white">
                Việc này có thể mất vài giây, vui lòng không đóng trang này.
            </Typography>
        </Box>
    );
};

export default Loading;

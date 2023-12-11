import { Box, Typography } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Image from 'next/image';

interface BoxTotalProps {
    title: String;
    icon: any;
    bg: String;
    border: String;
}

const BoxTotal = ({ title, icon, bg, border = 'border-gray-200' }: BoxTotalProps) => {
    return (
        <Box className={`p-2 bg-white border rounded-lg shadow-sm mr-2 cursor-pointer ${border}`}>
            <Box className="flex space-x-2">
                <Box className={`${bg} rounded w-[50px] flex items-center justify-center p-2`}>
                    <Image src={icon} alt="" width={32} height={32} />
                </Box>
                <Box>
                    <Typography>{title} </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default BoxTotal;

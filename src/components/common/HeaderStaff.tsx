'use client';
import { Box, Container, Typography } from '@mui/material';
import logo from '../../../public/logo.png';
import { useDispatch } from 'react-redux';
import { resetAuthSlice } from '@/redux/authSlice';
import Image from 'next/image';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

const HeaderStaff = () => {
    const dispatch = useDispatch();
    const Router = useRouter();

    const handleLogout = async () => {
        await dispatch(resetAuthSlice());
        Router.push('/');
    };
    return (
        <Box className="bg-white border-gray-200 shadow-md">
            <Container className="max-w-full py-3">
                <Box className="flex justify-between items-center">
                    <Box className="flex items-center space-x-2">
                        <Image src={logo} alt="logo" height={50} />
                        <Typography className="text-[29px]">TpMove</Typography>
                    </Box>
                    <Box className="flex justify-between items-center space-x-6">
                        <Box
                            className="flex items-center space-x-1 hover:text-red-500 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <LogoutIcon />
                            {/* <Link href={``}>
                                        <Typography className="hover:text-red-500">
                                            
                                        </Typography>
                                    </Link> */}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeaderStaff;

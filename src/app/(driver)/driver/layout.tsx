'use client';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import LabelCategory from '@/components/common/LabelCategory';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../../public/logo.png';
import Image from 'next/image';
import { resetAuthSlice } from '@/redux/authSlice';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { user } = useSelector((state) => (state as any).auth);
    const pathname = usePathname();
    const dispatch = useDispatch();
    const Router = useRouter();

    const handleLogout = async () => {
        await dispatch(resetAuthSlice());
        Router.push('/');
    };

    return (
        <Box>
            <Box className="fixed top-0 w-full z-10">
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
            </Box>
            <Box className="mt-[75px]">
                <Container className="max-w-full">
                    <Grid container>
                        <Grid item xs={2.5}>
                            <Box className="p-3 fixed z-30 w-[330px] h-[90vh] bg-white border border-gray-200 shadow-lg">
                                <Box className="flex items-center space-x-2">
                                    <Avatar
                                        src={user?.url_avatar}
                                        sx={{ width: 56, height: 56 }}
                                    ></Avatar>
                                    <Box>
                                        <Typography className="text-orange-600 font-bold">{`${user?.firstName} ${user?.lastName}`}</Typography>
                                        <Link href="/profile">
                                            <span className="text-slate-600 text-xs hover:underline">
                                                Chỉnh sửa tài khoản
                                            </span>
                                        </Link>
                                    </Box>
                                </Box>
                                <Box>
                                    <LabelCategory label="Quản lý chung" />
                                    <ul>
                                        <li>
                                            <Link
                                                href="/driver"
                                                className={`flex pl-3 py-2 cursor-pointer ${
                                                    pathname === '/driver'
                                                        ? 'bg-blue-400 text-white'
                                                        : ''
                                                }`}
                                            >
                                                <span>Lịch phân công</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/driver/order-assign"
                                                className={`flex pl-3 py-2 cursor-pointer ${
                                                    pathname === '/driver/order-assign'
                                                        ? 'bg-blue-400 text-white'
                                                        : ''
                                                }`}
                                            >
                                                <span>Đơn hàng phân công</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/staff/manage-car"
                                                className={`flex pl-3 py-2 cursor-pointer ${
                                                    pathname === '/staff/manage-car'
                                                        ? 'bg-blue-400 text-white'
                                                        : ''
                                                }`}
                                            >
                                                <span>Thông báo</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={9.5}
                            // className="max-h-full bg-white border border-gray-200 shadow-lg"
                        >
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

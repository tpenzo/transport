'use client';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import logo from '../../../public/logo.png';
import Image from 'next/image';
import { useState } from 'react';
import { deepOrange } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { resetAuthSlice } from '@/redux/authSlice';
import { useRouter } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useDetectClickOutside } from 'react-detect-click-outside';

const Header = () => {
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();
    const Router = useRouter();

    const closeDropdown = () => {
        setDropdown(!dropdown);
    };

    const ref = useDetectClickOutside({ onTriggered: closeDropdown });

    const { user } = useSelector((state) => (state as any).auth);
    const handleLogout = async () => {
        await dispatch(resetAuthSlice());
        Router.push('/');
    };

    return (
        <Box className="bg-white border-gray-200 shadow-md">
            <Container className="max-w-7xl py-3">
                <Box className="flex justify-between items-center">
                    <Box className="flex items-center space-x-2">
                        <Image src={logo} alt="logo" height={50} />
                        <Typography className="text-[29px]">TpMove</Typography>
                    </Box>
                    <Box className="flex justify-between items-center space-x-6">
                        <Link href={'/'}>
                            <Typography className="hover:text-red-500 cursor-pointer">
                                Trang chủ
                            </Typography>
                        </Link>
                        <Typography className="hover:text-red-500 cursor-pointer">
                            Dịch vụ
                        </Typography>
                        <Link href={'/price-list'}>
                            <Typography className="hover:text-red-500 cursor-pointer">
                                Bảng giá
                            </Typography>
                        </Link>
                        <Typography className="hover:text-red-500 cursor-pointer">
                            Ưu đãi
                        </Typography>
                        <Typography className="hover:text-red-500 cursor-pointer">
                            Giới thiệu
                        </Typography>
                        {user ? (
                            <Box className="flex items-center space-x-2 mr-0">
                                <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                                <Box className="relative">
                                    <Avatar
                                        sx={{ bgcolor: deepOrange[500] }}
                                        alt="Remy Sharp"
                                        src={user?.url_avatar}
                                    >
                                        User
                                    </Avatar>
                                    <Box
                                        className="absolute top-7 -right-2 h-6 rounded-full bg-white scale-[70%] cursor-pointer"
                                        onClick={() => setDropdown(!dropdown)}
                                    >
                                        {dropdown ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                                    </Box>
                                </Box>
                                {dropdown && (
                                    <Box
                                        ref={ref}
                                        className="absolute top-[100px] right-[230px] z-[10] bg-white  rounded shadow-xl border overflow-hidden"
                                    >
                                        <Box className="p-3 flex flex-col space-y-3">
                                            <Box className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
                                                <AccountCircleIcon />
                                                <Link href={`/profile`}>
                                                    <Typography className="hover:text-red-500">
                                                        Quản lý tài khoản
                                                    </Typography>
                                                </Link>
                                            </Box>
                                            <Box className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
                                                <NotificationsNoneIcon />
                                                <Link href={``}>
                                                    <Typography className="hover:text-red-500">
                                                        Thông báo
                                                    </Typography>
                                                </Link>
                                            </Box>
                                            <Box
                                                className="flex items-center space-x-1 hover:text-red-500 cursor-pointer"
                                                onClick={handleLogout}
                                            >
                                                <LogoutIcon />
                                                <Link href={``}>
                                                    <Typography className="hover:text-red-500">
                                                        Đăng xuất
                                                    </Typography>
                                                </Link>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            <>
                                <Link href={'/login'}>
                                    <Box className="flex items-center space-x-2 hover:text-red-500 cursor-pointer">
                                        <PermIdentityOutlinedIcon />
                                        <Typography>Đăng nhập</Typography>
                                    </Box>
                                </Link>
                                <Link href={'/register'}>
                                    <Button type="button" className="bg-red-500 text-white p-2">
                                        Đăng ký
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Header;

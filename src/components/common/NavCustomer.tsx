'use client';

import { Avatar, Box, Typography } from '@mui/material';
import Link from 'next/link';
import LabelCategory from './LabelCategory';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const NavCustomer = () => {
    const { user } = useSelector((state) => (state as any).auth);

    console.log(user);

    const pathname = usePathname();
    return (
        <Box className="p-3 fixed z-30 w-[308px] bg-white border border-gray-200 shadow-lg h-[85vh]">
            <Box className="flex items-center space-x-2">
                <Avatar src={user?.url_avatar} sx={{ width: 56, height: 56 }}></Avatar>
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
                <LabelCategory label="Quản lý tài khoản" />
                <ul>
                    <li>
                        <Link
                            href="/profile"
                            className={`flex pl-3 py-2 cursor-pointer ${
                                pathname === '/profile' ? 'bg-blue-400 text-white' : ''
                            }`}
                        >
                            <span>Thông tin tài khoản</span>
                        </Link>
                    </li>
                </ul>
            </Box>
            <Box>
                <LabelCategory label="Quản lý đơn hàng vận chuyển" />
                <ul>
                    <li>
                        <Link
                            href="/profile/manage-order"
                            className={`flex pl-3 py-2 cursor-pointer ${
                                pathname === '/profile/manage-order' ? 'bg-blue-400 text-white' : ''
                            }`}
                        >
                            <span>Quản lý đơn hàng</span>
                        </Link>
                    </li>
                </ul>
            </Box>
            <Box>
                <LabelCategory label="Quản lý thông báo" />
                <ul>
                    <li>
                        <Link
                            href=""
                            className={`flex pl-3 py-2 cursor-pointer ${
                                pathname === 'fffff' ? 'bg-blue-400 text-white' : ''
                            }`}
                        >
                            <span>Thông báo</span>
                        </Link>
                    </li>
                </ul>
            </Box>
        </Box>
    );
};

export default NavCustomer;

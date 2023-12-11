'use client';

import { Avatar, Box, Typography } from '@mui/material';
import LabelCategory from './LabelCategory';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

const NavStaff = () => {
    const { user } = useSelector((state) => (state as any).auth);
    const pathname = usePathname();
    return (
        <Box className="p-3 fixed z-30 w-[330px] h-[90vh] bg-white border border-gray-200 shadow-lg">
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
                <LabelCategory label="Quản lý đơn hàng" />
                <ul>
                    <li>
                        <Link
                            href="/staff"
                            className={`flex pl-3 py-2 cursor-pointer ${
                                pathname === '/staff' ? 'bg-blue-400 text-white' : ''
                            }`}
                        >
                            <span>Quản lý đơn hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/staff/assignment"
                            className={`flex pl-3 py-2 cursor-pointer ${
                                pathname === '/staff/assignment' ? 'bg-blue-400 text-white' : ''
                            }`}
                        >
                            <span>Đơn mới</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/staff/manage-prolem"
                            className={`flex pl-3 py-2 cursor-pointer ${
                                pathname === '' ? 'bg-blue-400 text-white' : '/staff/manage-prolem'
                            }`}
                        >
                            <span>Quản lý sự cố</span>
                        </Link>
                    </li>
                </ul>
            </Box>
            <Box>
                <LabelCategory label="Quản lý chung" />
                <ul>
                    <li>
                        <Link
                            href="/profile/manage-order"
                            className={`flex pl-3 py-2 cursor-pointer ${
                                pathname === '/profile/manage-order' ? 'bg-blue-400 text-white' : ''
                            }`}
                        >
                            <span>Khách hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/staff/manage-driver"
                            className={`flex pl-3 py-2 cursor-pointer ${
                                pathname === '/staff/manage-driver' ? 'bg-blue-400 text-white' : ''
                            }`}
                        >
                            <span>Tài xế</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/staff/manage-car"
                            className={`flex pl-3 py-2 cursor-pointer ${
                                pathname === '/staff/manage-car' ? 'bg-blue-400 text-white' : ''
                            }`}
                        >
                            <span>Xe vận chuyển</span>
                        </Link>
                    </li>
                </ul>
            </Box>
            <Box>
                <LabelCategory label="Phân công" />
                <ul>
                    <li>
                        <Link
                            href="/staff/order-calendar"
                            className={`flex pl-3 py-2 cursor-pointer ${
                                pathname === '/staff/order-calendar' ? 'bg-blue-400 text-white' : ''
                            }`}
                        >
                            <span>Phân công</span>
                        </Link>
                    </li>
                </ul>
            </Box>
        </Box>
    );
};

export default NavStaff;

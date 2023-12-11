'use client';
import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import { NextPage } from 'next';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { formatCurrency, nameDisplay } from '@/utils/FormatData';
import DoubleArrow from '../../../../../public/DoubleArrow.png';
import Image from 'next/image';
import StatusOrder from '@/components/common/StatusOrder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import iconXe from '../../../../../public/iconXe.png';
import DriverOrderAssignment from '@/components/assignment/DriverOrderAssign';

const Manage: NextPage = () => {
    const { user } = useSelector((state) => (state as any).auth);

    const [orderAssignList, setOrderAssignList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [needsRefresh, setNeedsRefresh] = useState<Boolean>(false);

    const handlePageChange = (event: any, value: any) => {
        setPage(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                `http://localhost:3000/api/user/driver/${user?._id}/order?page=${page}&limit=${10}`,
            );
            setOrderAssignList(res.data?.orderAssignList);
            setTotalCount(res.data.totalCount);
        };
        fetchData();
    }, []);

    const pageCount = Math.ceil(totalCount / 1);

    return (
        <Box className="p-4 h-[100vh]">
            <Box className="flex space-x-2 mt-3 h-[40px] border-b bprolem-gray-200">
                <MenuIcon />
                <Typography className="font-bold">Đơn hàng phân công</Typography>
            </Box>
            <Box className="mt-4">
                {orderAssignList.map((item: any, index: any) => (
                    <DriverOrderAssignment item={item} key={index} />
                ))}
                <Box className="flex justify-center mt-3">
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Manage;

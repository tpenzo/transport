'use client';
import OrderAssignment from '@/components/assignment/OrderAssignment';
import axiosClient from '@/lib/axiosClient';
import { Box, Pagination, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import notFoundOrder from '../../../../../public/no_order.jpg';

const AssignmentPage: NextPage = () => {
    const [newOrderList, seNewOrderList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [needsRefresh, setNeedsRefresh] = useState<Boolean>(false);

    useEffect(() => {
        const getData = async () => {
            const res = await axiosClient.get(`http://localhost:3000/api/order?status=wait`);
            seNewOrderList(res.data.orderList);
            setTotalCount(res.data.totalCount);
        };
        getData();
    }, [needsRefresh]);

    const pageCount = Math.ceil(totalCount / 1);
    const handlePageChange = (event: any, value: any) => {
        setPage(value);
    };

    return (
        <Box className="p-4">
            <Box className="flex space-x-2 mt-3 h-[40px] border-b bprolem-gray-200">
                <MenuIcon />
                <Typography className="font-bold">ĐƠN MỚI</Typography>
            </Box>
            <Box>
                {newOrderList?.length === 0 && (
                    <Box className="flex justify-center items-center">
                        <Box className="mt-7">
                            <Image src={notFoundOrder} height={400} width={400} alt="" />
                            <Box className="mt-5">
                                <Typography className="font-bold">
                                    Hiện tại không có đơn hàng mới nào!
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
                {newOrderList.map((item: any, index: any) => (
                    <OrderAssignment
                        newOrder={item}
                        key={index}
                        needsRefresh={needsRefresh}
                        setNeedsRefresh={setNeedsRefresh}
                    />
                ))}
            </Box>
            {newOrderList.length !== 0 && (
                <Box className="mt-4 flex items-center justify-center">
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
};

export default AssignmentPage;

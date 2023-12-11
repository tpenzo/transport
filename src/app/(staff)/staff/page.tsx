'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import SearchIcon from '@mui/icons-material/Search';
import SelectInput from '@/components/common/SelectInput';
import axiosClient from '@/lib/axiosClient';
import TableOrder from '@/components/Table/TableOrder';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import MenuIcon from '@mui/icons-material/Menu';

const Manage: NextPage = () => {
    const [orderList, setOrderList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [needsRefresh, setNeedsRefresh] = useState<Boolean>(false);

    const handlePageChange = (event: any, value: any) => {
        setPage(value);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(
                    `http://localhost:3000/api/order/?page=${page}&limit=${5}`,
                );
                setOrderList(res.data?.orderList);
                setTotalCount(res.data?.totalCount);
            } catch (error) {
                return [];
            }
        };
        getData();
    }, [page, needsRefresh]);

    const pageCount = Math.ceil(totalCount / 5);

    return (
        <Box className="p-4 h-[100vh]">
            <Box className="flex space-x-2 mt-3 h-[40px] border-b bprolem-gray-200">
                <MenuIcon />
                <Typography className="font-bold">QUẢN LÝ ĐƠN HÀNG</Typography>
            </Box>
            <Box className="items-center  flex justify-between ">
                <Box className="flex items-center mb-4 space-x-2">
                    <Box>
                        <TextField
                            className="w-[200px]"
                            type="Text"
                            label="Mã đơn hàng"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Box>
                    <Box className="mr-2 relative">
                        <SelectInput
                            className="w-[150px]"
                            itemSelected={'CONFIRMED'}
                            setItemSelected={() => {}}
                            items={[
                                'CONFIRMED',
                                'PICKUP',
                                'TRANSPORT',
                                'RETURNS',
                                'COMPLETED',
                                'CANCEL',
                            ]}
                        />
                        <Button
                            className="absolute top-[15px] p-4 ml-2 bg-blue-500 rounded text-white"
                            type="button"
                        >
                            <SearchIcon />
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Box>
                    <TableOrder
                        orderList={orderList}
                        needsRefresh={needsRefresh}
                        setNeedsRefresh={setNeedsRefresh}
                    />
                </Box>
                <Box className="flex justify-center my-4">
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

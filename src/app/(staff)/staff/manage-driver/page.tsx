'use client';

import { Box, Button, Pagination, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import axiosClient from '@/lib/axiosClient';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import TableDriver from '@/components/Table/TableDriver';
import CEDriver from '@/components/Modal/CEDriver';
import SearchIcon from '@mui/icons-material/Search';
import ModalCEDriver from '@/components/Modal/ModalCEDriver';

const Manage: NextPage = () => {
    const [driverList, setDriverList] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
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
                    `http://localhost:3000/api/user/driver?page=${page}&limit=${6}`,
                );
                setDriverList(res.data.driverList);
                setTotalCount(res.data.totalCount);
            } catch (error) {
                return [];
            }
        };
        getData();
    }, [page, needsRefresh]);

    const pageCount = Math.ceil(totalCount / 6);

    const handleClose = () => {
        setIsCreate(!isCreate);
    };

    const handleRefresh = () => {
        setNeedsRefresh(!needsRefresh);
    };

    return (
        <>
            <Box className="p-4 h-[100vh]">
                <Box className="flex space-x-2 mt-3 h-[40px] border-b bprolem-gray-200">
                    <MenuIcon />
                    <Typography className="font-bold">QUẢN LÝ TÀI XẾ</Typography>
                </Box>
                <Box className="mt-4 items-center flex justify-between">
                    <Box className="flex justify-between items-center space-x-2">
                        <Box>
                            <Box>
                                <TextField
                                    className="w-[200px]"
                                    type="Text"
                                    label="Họ tên"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <Button
                                    className="top-[15px] p-4 ml-2 bg-blue-500 rounded text-white"
                                    type="button"
                                >
                                    <SearchIcon />
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Button type="button" variant="contained" onClick={handleClose}>
                            Thêm mới
                        </Button>
                    </Box>
                </Box>
                <Box className="mt-4">
                    <Box>
                        <TableDriver driverList={driverList} handleRefresh={handleRefresh} />
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
            {isCreate && <ModalCEDriver close={handleClose} handleRefresh={handleRefresh} />}
        </>
    );
};

export default Manage;

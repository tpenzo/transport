'use client';
import { Box, Button, Pagination, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import TableCar from '@/components/Table/TableCar';
import axiosClient from '@/lib/axiosClient';
import SearchIcon from '@mui/icons-material/Search';
import CECar from '@/components/Modal/CECar';
import ModalCECar from '@/components/Modal/ModalCECar';

const Manage: NextPage = () => {
    const [isCreate, setIsCreate] = useState(false);
    const [carList, setCarList] = useState([]);
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
                    `http://localhost:3000/api/car?page=${page}&limit=${9}`,
                );
                console.log(res.data.carList);
                setCarList(res.data.carList);
                setTotalCount(res.data.totalCount);
            } catch (error) {
                return [];
            }
        };
        getData();
    }, [needsRefresh, page]);

    // useEffect(() => {
    //     const delayGetData = setTimeout(() => {
    //         const getData = async () => {
    //             try {
    //                 const res = await axiosClient.get(
    //                     `http://localhost:3000/api/car?page=${page}&limit=${9}`,
    //                 );
    //                 console.log(res.data.carList);
    //                 setCarList(res.data.carList);
    //                 setTotalCount(res.data.totalCount);
    //             } catch (error) {
    //                 return [];
    //             }
    //         };
    //         getData();
    //     }, 3000);

    //     return () => clearTimeout(delayGetData);
    // }, [needsRefresh, page]);

    const handleClose = () => {
        setIsCreate(!isCreate);
    };

    const handleRefresh = () => {
        setNeedsRefresh(!needsRefresh);
    };

    const pageCount = Math.ceil(totalCount / 9);

    return (
        <>
            <Box className="p-4 h-[100vh]">
                <Box className="flex space-x-2 mt-3 h-[40px] border-b bprolem-gray-200">
                    <MenuIcon />
                    <Typography className="font-bold">QUẢN LÝ XE VẬN CHUYỂN</Typography>
                </Box>
                <Box className="mt-4 items-center flex justify-between">
                    <Box className="flex justify-between items-center space-x-2">
                        <Box>
                            <Box>
                                <TextField
                                    className="w-[200px]"
                                    type="Text"
                                    label="Biển số xe"
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
                        <TableCar carList={carList} handleRefresh={handleRefresh} />
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
            {isCreate && <ModalCECar close={handleClose} handleRefresh={handleRefresh} />}
        </>
    );
};

export default Manage;

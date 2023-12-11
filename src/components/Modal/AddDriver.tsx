'use client';

import { Avatar, Box, Stack, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import CommonModal from '../common/CommonModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from 'react';
import axiosClient from '@/lib/axiosClient';
import Image from 'next/image';
import { nameDisplay } from '@/utils/FormatData';
import { toast } from 'react-toastify';
import CalendarDriver from './CalendarDriver';

interface AddDriverProps {
    vehicleTypeId: string;
    setDriverSelected: any;
}

const AddDriver = ({ vehicleTypeId, setDriverSelected }: AddDriverProps) => {
    const [driverList, setDriverList] = useState([]);

    const [driver, setDriver] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosClient.post('http://localhost:3000/api/user/driver/assign', {
                id: vehicleTypeId,
            });
            setDriverList(res.data);
        };
        fetchData();
    }, [vehicleTypeId]);

    const handleAdd = () => {
        toast('Thêm thành công');
        setDriverSelected(driver);
    };

    const handleClose = () => {
        // setDriver({});
        // setDriverSelected({});
    };

    return (
        <CommonModal
            handleSubmit={handleAdd}
            handleClose={handleClose}
            modalBtnText="Thêm tài xế"
            modalBtnIcon={<AddCircleIcon />}
            modalTitle="Thêm tài xế"
            actConfirmColor="bg-red-500"
            modalWidth="w-[750px]"
        >
            <Stack spacing={2} className="">
                <TextField placeholder="Tìm kiếm" />
                <Box className="h-[400px] overflow-y-auto">
                    {driverList.map((item: any, index) => (
                        <Box
                            key={index}
                            className={`p-3 mb-2 rounded flex space-x-3 justify-between items-center cursor-pointer border ${
                                driver?._id === item?._id
                                    ? 'border-[2px] border-red-500'
                                    : 'border border-gray-300'
                            }`}
                            onClick={() => setDriver(item)}
                        >
                            <Box className="flex space-x-3 items-center">
                                <Box>
                                    <Avatar src={item?.url_avatar} sx={{ width: 50, height: 50 }}>
                                        H
                                    </Avatar>
                                </Box>
                                <Box>
                                    <Typography>
                                        {nameDisplay(item?.firstName, item?.lastName)}
                                    </Typography>
                                    <Typography className="text-[12px]">
                                        Số GPLX: {item?.driver_license}
                                    </Typography>
                                    <Typography className="text-[12px]">
                                        Hạng: {item?.driver_license_class}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <CalendarDriver idDriver={item?._id} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Stack>
        </CommonModal>
    );
};

export default AddDriver;

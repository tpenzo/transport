'use client';

import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';
import Loading from '../common/Loading';
import { useState } from 'react';

interface DeleteCarProps {
    _id: string;
    licensePlate: string;
    setIsDelete: any;
    handleRefresh: any;
}

const ModalDeleteCar = ({ _id, licensePlate, setIsDelete, handleRefresh }: DeleteCarProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setIsDelete(false);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const res = await axiosClient.delete(`/api/car/${_id}`);
            setIsLoading(false);
            handleRefresh();
            handleClose();
            toast(res.data.message);
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loading />}
            <Box className="fixed top-0 left-0 w-full h-full bg-[#0008] z-[49] overflow-auto flex items-center justify-center">
                <Box className="bg-white px-[20px] py-[5px] rounded-lg w-[400px] m-auto">
                    <Stack
                        className="my-2 modal-header"
                        justifyContent="space-between"
                        alignItems="center"
                        direction="row"
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            className="font-bold"
                        >
                            Xoá xe
                        </Typography>
                        <IconButton aria-label="close-modal" onClick={handleClose}>
                            <CloseIcon className="cursor-pointer"></CloseIcon>
                        </IconButton>
                    </Stack>
                    <Divider></Divider>
                    <Stack spacing={2} className="">
                        <Typography>Bạn có muốn xoá xe: {licensePlate}</Typography>
                    </Stack>
                    <Stack
                        spacing={1}
                        direction="row"
                        justifyContent={{ xs: 'space-between', lg: 'flex-end' }}
                        className="my-5"
                    >
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Xác nhận
                        </Button>
                        <Button variant="contained" color="inherit" onClick={handleClose}>
                            Đóng
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default ModalDeleteCar;

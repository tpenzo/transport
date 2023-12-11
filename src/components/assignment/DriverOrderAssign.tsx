'use client';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import iconXe from '../../../public/iconXe.png';
import Image from 'next/image';
import DoubleArrow from '../../../public/DoubleArrow.png';
import StatusOrder from '../common/StatusOrder';
import moment from 'moment';
import { formatCurrency, isEmptyObject, nameDisplay } from '@/utils/FormatData';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';
import SelectInput from '../common/SelectInput';
import { useState } from 'react';

interface DriverOrderAssignmentProps {
    item: any;
}

const DriverOrderAssignment = ({ item }: DriverOrderAssignmentProps) => {
    const [status, setStatus] = useState(item.status);

    // change status order
    const handleChangeStatus = async () => {
        const res = await axiosClient.post(`http://localhost:3000/api/order/${item._id}/status`, {
            status,
        });
        toast(res.data.message);
    };

    return (
        <Box className="mb-4 border p-3 border-gray-200 rounded-lg shadow-lg space-y-1">
            <Box className="flex p-3 justify-between">
                <Box>
                    <Typography>
                        Mã đơn hàng:&ensp;
                        <span className="cursor-pointer text-blue-500">#{item.code}</span>
                    </Typography>
                </Box>
                <Box>
                    <Typography className="text-[13px] text-gray-400">
                        {moment(item.createdAt).format('DD/MM/YYYY')}
                    </Typography>
                </Box>
            </Box>
            <Box className="p-3">
                <Grid container>
                    <Grid item xs={5}>
                        {/* <Box className="mb-2 p-3 rounded-sm bg-slate-100">
                                        <Typography>Lấy hàng</Typography>
                                    </Box> */}
                        <Box className="p-3 rounded space-y-1 items-center cursor-pointer border border-gray-300">
                            <Typography>
                                Họ tên:{' '}
                                {nameDisplay(
                                    item?.pickup_information?.firstName,
                                    item?.pickup_information?.lastName,
                                )}
                            </Typography>
                            <Typography>SĐT: {item?.pickup_information.phone}</Typography>
                            <Typography>Địa chỉ: {item?.pickup_information.address}</Typography>
                            <Typography>
                                Thời gian lấy hàng:{' '}
                                {moment(item?.pickup_information.time).format('HH:MM DD/MM/YYYY')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box className="flex w-full h-full justify-center items-center">
                            <Image width={100} height={100} src={DoubleArrow} alt="" />
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        {/* <Box className="mb-2 p-3 rounded-sm bg-slate-100">
                                        <Typography>Trả hàng</Typography>
                                    </Box> */}
                        <Box className="p-3 rounded space-y-1 items-center cursor-pointer border border-gray-300">
                            <Typography>
                                Họ tên:{' '}
                                {nameDisplay(
                                    item?.return_information?.firstName,
                                    item?.return_information?.lastName,
                                )}
                            </Typography>
                            <Typography>SĐT: {item?.return_information.phone}</Typography>
                            <Typography>Địa chỉ: {item?.return_information.address}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box className="p-3">
                <Grid container columnGap={1}>
                    <Grid item xs={3.8}>
                        <Box className="mb-2 p-3 flex  items-center rounded-sm bg-slate-100">
                            <Typography>Xe thực hiện</Typography>
                        </Box>
                        <Box className="p-3 rounded flex space-x-3 justify-between items-center border border-gray-300">
                            <Box className="flex space-x-3 items-center">
                                <Image
                                    src={item?.car_id?.image_url}
                                    alt=""
                                    width={50}
                                    height={50}
                                />
                                <Box>
                                    {/* <Typography>Loại xe: 2 tấn</Typography> */}
                                    <Typography>Biển số: {item?.car_id?.license_plate}</Typography>
                                    <Typography>Nhãn hiệu: {item?.car_id?.make}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box className="mb-2 p-3 flex items-center rounded-sm bg-slate-100">
                            <Typography>Hàng hoá</Typography>
                        </Box>
                        <Box className="space-y-2">
                            {item?.merchandise_list.map((item: any, index: any) => (
                                <Box
                                    key={index}
                                    className="p-4 flex justify-between items-center border border-gray-200 rounded"
                                >
                                    <Box className="flex space-x-4 items-center">
                                        <Image src={item.image} alt="" width={60} height={60} />
                                        <Box>
                                            <Typography>{item?.name}</Typography>
                                            <Box>
                                                <Typography className="text-[13px] text-gray-400">
                                                    {item?.type}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                <Box className="mt-5">
                    <Box className="mb-2 px-3 flex items-center justify-between rounded-sm bg-slate-100">
                        <Box>
                            <Typography>Trạng thái</Typography>
                        </Box>
                        <Box className="w-[200px]">
                            <SelectInput
                                itemSelected={status}
                                setItemSelected={setStatus}
                                items={[
                                    'CONFIRMED',
                                    'PICKUP',
                                    'TRANSPORT',
                                    'RETURNS',
                                    'COMPLETED',
                                    'CANCEL',
                                ]}
                            />
                        </Box>
                    </Box>
                    <Box className="p-4 flex justify-center items-center border border-gray-200 rounded">
                        <StatusOrder status={status} />
                    </Box>
                </Box>
                <Box className="flex justify-end mt-5">
                    <Typography>
                        Tổng tiền:{' '}
                        <span className="text-blue-500">{formatCurrency(item?.total_payment)}</span>
                    </Typography>
                </Box>
            </Box>
            <Box className="mt-5 flex justify-end space-x-3">
                <Button
                    type="button"
                    className="bg-blue-500 text-white"
                    onClick={handleChangeStatus}
                >
                    Cập nhật đơn hàng
                </Button>
            </Box>
        </Box>
    );
};

export default DriverOrderAssignment;

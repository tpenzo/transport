'use client';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import iconXe from '../../../public/iconXe.png';
import Image from 'next/image';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddDriver from '@/components/Modal/AddDriver';
import AddCar from '@/components/Modal/AddCar';
import DoubleArrow from '../../../public/DoubleArrow.png';
import StatusOrder from '../common/StatusOrder';
import moment from 'moment';
import { formatCurrency, isEmptyObject, nameDisplay } from '@/utils/FormatData';
import { useState } from 'react';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';

interface OrderAssignmentProps {
    newOrder: any;
    needsRefresh: Boolean;
    setNeedsRefresh: any;
}

const OrderAssignment = ({ newOrder, needsRefresh, setNeedsRefresh }: OrderAssignmentProps) => {
    const [carSelected, setCarSelected] = useState<any>({});
    const [driverSelected, setDriverSelected] = useState<any>({});

    const handleSubmit = async () => {
        if (isEmptyObject(carSelected) || isEmptyObject(driverSelected)) {
            toast.warn('Bạn cần phân công xe và tài xế');
        } else {
            const res = await axiosClient.post(`http://localhost:3000/api/order/${newOrder._id}`, {
                code: newOrder.code,
                driver_id: driverSelected._id,
                car_id: carSelected._id,
                status: 'CONFIRMED',
                time: newOrder.pickup_information.time,
            });
            toast(res.data.message);
            setNeedsRefresh(!needsRefresh);
        }
    };

    const handleCancelOrder = async (_id: string) => {
        const res = await axiosClient.post(`http://localhost:3000/api/order/${_id}/status`, {
            status: 'CANCEL',
        });
        toast(res.data.message);
        setNeedsRefresh(!needsRefresh);
    };

    return (
        <Box className="mt-5">
            <Box className="border p-3 border-gray-200 rounded-lg shadow-lg space-y-1">
                <Box className="flex p-3 justify-between">
                    <Box className="flex items-center space-x-2">
                        <Avatar
                            src={newOrder?.customer_id?.url_avatar}
                            sx={{ width: 50, height: 50 }}
                        ></Avatar>
                        <Box>
                            <Typography className="text-orange-600 font-bold">
                                {nameDisplay(
                                    newOrder?.customer_id?.firstName,
                                    newOrder?.customer_id?.lastName,
                                )}
                            </Typography>
                            <Typography className="text-[12px]">
                                SĐT: {newOrder?.customer_id.phone}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography>
                            Mã đơn hàng:&ensp;
                            <span className="cursor-pointer text-blue-500">#{newOrder.code}</span>
                        </Typography>
                        <Box className="flex justify-end">
                            <Typography className="text-[13px] text-gray-400">
                                {moment(newOrder.createdAt).format('DD/MM/YYYY')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className="p-3">
                    <Grid container>
                        <Grid item xs={5}>
                            <Box className="mb-2 p-3 rounded-sm bg-slate-100">
                                <Typography>Lấy hàng</Typography>
                            </Box>
                            <Box className="p-3 rounded space-y-1 items-center cursor-pointer border border-gray-300">
                                <Typography>
                                    Họ tên:{' '}
                                    {nameDisplay(
                                        newOrder?.pickup_information?.firstName,
                                        newOrder?.pickup_information?.lastName,
                                    )}
                                </Typography>
                                <Typography>SĐT: {newOrder?.pickup_information.phone}</Typography>
                                <Typography>
                                    Địa chỉ: {newOrder?.pickup_information.address}
                                </Typography>
                                <Typography>
                                    Thời gian lấy hàng:{' '}
                                    {moment(newOrder?.pickup_information.time).format(
                                        'HH:MM DD/MM/YYYY',
                                    )}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box className="flex w-full h-full justify-center items-center">
                                <Image width={100} height={100} src={DoubleArrow} alt="" />
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <Box className="mb-2 p-3 rounded-sm bg-slate-100">
                                <Typography>Trả hàng</Typography>
                            </Box>
                            <Box className="p-3 rounded space-y-1 items-center cursor-pointer border border-gray-300">
                                <Typography>
                                    Họ tên:{' '}
                                    {nameDisplay(
                                        newOrder?.return_information?.firstName,
                                        newOrder?.return_information?.lastName,
                                    )}
                                </Typography>
                                <Typography>SĐT: {newOrder?.return_information.phone}</Typography>
                                <Typography>
                                    Địa chỉ: {newOrder?.return_information.address}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box className="p-3">
                    <Grid container columnGap={1}>
                        <Grid item xs={3.8}>
                            <Box className="mb-2 p-3 flex  items-center rounded-sm bg-slate-100">
                                <Typography>Loại xe</Typography>
                            </Box>
                            <Box className="p-3 rounded flex space-x-3 justify-between items-center cursor-pointer border border-gray-300">
                                <Box className="flex space-x-3 items-center">
                                    <Image src={iconXe} alt="" width={50} height={50} />
                                    <Typography>{newOrder?.vehicle_type.name}</Typography>
                                </Box>
                                <Box>
                                    <RemoveRedEyeIcon />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box className="mb-2 p-3 flex items-center rounded-sm bg-slate-100">
                                <Typography>Hàng hoá</Typography>
                            </Box>
                            <Box className="space-y-2">
                                {newOrder?.merchandise_list.map((item: any, index: any) => (
                                    <Box
                                        key={index}
                                        className="p-4 flex justify-between items-center border border-gray-200 rounded"
                                    >
                                        <Box className="flex space-x-4">
                                            <Image src={item.image} alt="" width={70} height={70} />
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
                        <Box className="mb-2 p-3 flex justify-between items-center rounded-sm bg-slate-100">
                            <Typography>Phân công</Typography>
                            <Box className="space-x-1 flex">
                                <AddCar
                                    vehicleTypeId={newOrder?.vehicle_type?._id}
                                    setCarSelected={setCarSelected}
                                />
                                <AddDriver
                                    vehicleTypeId={newOrder?.vehicle_type?._id}
                                    setDriverSelected={setDriverSelected}
                                />
                            </Box>
                        </Box>
                        <Grid container columnGap={1}>
                            <Grid item xs={4.8}>
                                {Object.keys(carSelected).length !== 0 && (
                                    <Box className="p-3 rounded flex space-x-3 justify-between items-center border border-gray-300">
                                        <Box className="flex space-x-3 items-center">
                                            <Image
                                                src={carSelected?.image_url}
                                                alt=""
                                                width={50}
                                                height={50}
                                            />
                                            <Box>
                                                {/* <Typography>Loại xe: 2 tấn</Typography> */}
                                                <Typography>
                                                    Biển số: {carSelected?.license_plate}
                                                </Typography>
                                                <Typography>
                                                    Nhãn hiệu: {carSelected?.make}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            className="cursor-pointer"
                                            onClick={() => setCarSelected({})}
                                        >
                                            <HighlightOffIcon />
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={7}>
                                {Object.keys(driverSelected).length !== 0 && (
                                    <Box className="p-3 flex justify-between items-center border border-gray-200 rounded">
                                        <Box className="flex items-center space-x-2">
                                            <Avatar
                                                src={driverSelected?.url_avatar}
                                                sx={{ width: 50, height: 50 }}
                                            >
                                                H
                                            </Avatar>
                                            <Box>
                                                <Typography>
                                                    {nameDisplay(
                                                        driverSelected?.firstName,
                                                        driverSelected?.lastName,
                                                    )}
                                                </Typography>
                                                <Typography className="text-[12px]">
                                                    Số GPLX: {driverSelected?.driver_license}
                                                </Typography>
                                                <Typography className="text-[12px]">
                                                    Hạng: {driverSelected?.driver_license_class}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            className="cursor-pointer"
                                            onClick={() => setDriverSelected({})}
                                        >
                                            <HighlightOffIcon />
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box className="mt-5">
                        <Box className="mb-2 p-3 flex items-center rounded-sm bg-slate-100">
                            <Typography>Trạng thái</Typography>
                        </Box>
                        <Box className="p-4 flex justify-center items-center border border-gray-200 rounded">
                            <StatusOrder status={newOrder?.status} />
                        </Box>
                    </Box>
                    <Box className="flex justify-end mt-5">
                        <Typography>
                            Tổng tiền:{' '}
                            <span className="text-blue-500">
                                {formatCurrency(newOrder?.total_payment)}
                            </span>
                        </Typography>
                    </Box>
                    <Box className="mt-5 flex justify-end space-x-3">
                        <Button
                            onClick={() => handleCancelOrder(newOrder._id)}
                            type="button"
                            className="bg-red-500 text-white"
                        >
                            Từ chối đơn hàng
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            type="button"
                            className="bg-blue-500 text-white"
                        >
                            Xác nhận đơn hàng
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderAssignment;

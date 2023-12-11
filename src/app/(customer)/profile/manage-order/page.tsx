'use client';
import { Box, Button, Grid, Typography, Pagination, Avatar } from '@mui/material';
import { NextPage } from 'next';
import Image from 'next/image';
import iconXe from '../../../../../public/iconXe.png';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StatusOrder from '@/components/common/StatusOrder';
import BoxTotal from '@/components/common/BoxTotal';
import wait from '../../../../../public/status/wait.svg';
import confirmed from '../../../../../public/status/confirmed.svg';
import pickup from '../../../../..//public/status/pickup.svg';
import transport from '../../../../../public/status/transport.svg';
import returns from '../../../../../public/status/returns.svg';
import completed from '../../../../../public/status/completed.svg';
import DoubleArrow from '../../../../../public/DoubleArrow.png';
import notFoundOrder from '../../../../../public/no_order.jpg';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import axiosClient from '@/lib/axiosClient';
import { formatCurrency, nameDisplay } from '@/utils/FormatData';
import moment from 'moment';
import { toast } from 'react-toastify';
import AddProlem from '@/components/Modal/AddProlem';
import { useSelector } from 'react-redux';
import Loading from '@/components/common/Loading';

const ManageOrderPage: NextPage = () => {
    const { user } = useSelector((state) => (state as any).auth);
    const [status, setStatus] = useState('WAIT');
    const [loading, setLoading] = useState(false);
    const [orderList, setOrderList] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [needsRefresh, setNeedsRefresh] = useState<Boolean>(false);

    const handlePageChange = (event: any, value: any) => {
        setPage(value);
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        setPage(1);
    };

    // Get order with status
    useEffect(() => {
        const getData = async () => {
            const res = await axiosClient.get(
                `http://localhost:3000/api/order?status=${status}&page=${page}&limit=${1}`,
            );
            setOrderList(res.data?.orderList);
            setTotalCount(res.data?.totalCount);
        };
        getData();
    }, [status, needsRefresh, page]);

    // Cancel Order
    const handleCancelOrder = async (_id: string) => {
        setLoading(true);
        const res = await axiosClient.post(`http://localhost:3000/api/order/${_id}/status`, {
            status: 'CANCEL',
        });
        setNeedsRefresh(!needsRefresh);
        toast(res.data.message);
        setLoading(false);
    };

    const pageCount = Math.ceil(totalCount / 1);

    return (
        <>
            {loading && <Loading />}
            <Box className="p-4 overflow-auto bg-white border border-gray-200 shadow-lg h-[85vh]">
                <Box className="flex items-center space-x-2 mt-3 h-[40px] border-b border-gray-200">
                    <MenuIcon />
                    <Typography className="font-bold">Quản lý đơn hàng</Typography>
                </Box>
                <Grid container className="my-5 overflow-auto">
                    <Grid item xs={2}>
                        <Box onClick={() => handleStatusChange('WAIT')}>
                            <BoxTotal
                                title="Đơn mới"
                                bg="bg-green-100"
                                icon={wait}
                                border={status == 'WAIT' ? 'border-[2px] border-red-500' : ''}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box onClick={() => handleStatusChange('CONFIRMED')}>
                            <BoxTotal
                                title="Đã xác nhận"
                                bg="bg-green-100"
                                icon={completed}
                                border={status == 'CONFIRMED' ? 'border-[2px]  border-red-500' : ''}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box onClick={() => handleStatusChange('PICKUP')}>
                            <BoxTotal
                                title="Lấy hàng"
                                bg="bg-green-100"
                                icon={pickup}
                                border={status == 'PICKUP' ? 'border-[2px] border-red-500' : ''}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box onClick={() => handleStatusChange('TRANSPORT')}>
                            <BoxTotal
                                title="Vận chuyển"
                                bg="bg-green-100"
                                icon={transport}
                                border={status == 'TRANSPORT' ? 'border-[2px] border-red-500' : ''}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box onClick={() => handleStatusChange('RETURNS')}>
                            <BoxTotal
                                title="Trả hàng"
                                bg="bg-green-100"
                                icon={returns}
                                border={status == 'RETURNS' ? 'border-[2px] border-red-500' : ''}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box onClick={() => handleStatusChange('COMPLETED')}>
                            <BoxTotal
                                title="Hoàn thành"
                                bg="bg-green-100"
                                icon={confirmed}
                                border={status == 'COMPLETED' ? 'border-[2px] border-red-500' : ''}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box className="mt-5">
                    {orderList.map((item: any, index: any) => (
                        <Box
                            key={index}
                            className="mb-4 border p-3 border-gray-200 rounded-lg shadow-lg space-y-1"
                        >
                            {/* <Button onClick={handlePayment}>Click me</Button> */}
                            <Box className="flex p-3 justify-between">
                                <Box>
                                    <Typography>
                                        Mã đơn hàng:&ensp;
                                        <span className="cursor-pointer text-blue-500">
                                            #{item.code}
                                        </span>
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
                                        <Box className="mb-2 p-3 rounded-sm bg-slate-100">
                                            <Typography>Lấy hàng</Typography>
                                        </Box>
                                        <Box className="p-3 rounded space-y-1 items-center cursor-pointer border border-gray-300">
                                            <Typography>
                                                Họ tên:{' '}
                                                {nameDisplay(
                                                    item?.pickup_information?.firstName,
                                                    item?.pickup_information?.lastName,
                                                )}
                                            </Typography>
                                            <Typography>
                                                SĐT: {item?.pickup_information.phone}
                                            </Typography>
                                            <Typography>
                                                Địa chỉ: {item?.pickup_information.address}
                                            </Typography>
                                            <Typography>
                                                Thời gian lấy hàng:{' '}
                                                {moment(item?.pickup_information.time).format(
                                                    'HH:MM DD/MM/YYYY',
                                                )}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box className="flex w-full h-full justify-center items-center">
                                            <Image
                                                width={100}
                                                height={100}
                                                src={DoubleArrow}
                                                alt=""
                                            />
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
                                                    item?.return_information?.firstName,
                                                    item?.return_information?.lastName,
                                                )}
                                            </Typography>
                                            <Typography>
                                                SĐT: {item?.return_information.phone}
                                            </Typography>
                                            <Typography>
                                                Địa chỉ: {item?.return_information.address}
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
                                                <Typography>{item?.vehicle_type.name}</Typography>
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
                                            {item?.merchandise_list.map((item: any, index: any) => (
                                                <Box
                                                    key={index}
                                                    className="p-4 flex justify-between items-center border border-gray-200 rounded"
                                                >
                                                    <Box className="flex space-x-4 items-center">
                                                        <Image
                                                            src={item.image}
                                                            alt=""
                                                            width={60}
                                                            height={60}
                                                        />
                                                        <Box>
                                                            <Typography>{item?.name}</Typography>
                                                            <Box>
                                                                <Typography className="text-[13px] text-gray-400">
                                                                    {item?.type}
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography className="text-[13px] text-gray-400">
                                                                    {item?.note}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Grid>
                                </Grid>
                                {status !== 'WAIT' && (
                                    <Box className="mt-5">
                                        <Box className="mb-2 p-3 flex justify-between items-center rounded-sm bg-slate-100">
                                            <Typography>Thông tin vận chuyển</Typography>
                                        </Box>
                                        <Grid container columnGap={1}>
                                            <Grid item xs={4.8}>
                                                <Box className="p-3 rounded flex space-x-3 justify-between items-center border border-gray-300">
                                                    <Box className="flex space-x-3 items-center">
                                                        <Image
                                                            src={item?.car_id?.image_url}
                                                            alt=""
                                                            width={50}
                                                            height={50}
                                                        />
                                                        <Box>
                                                            <Typography>
                                                                {item?.car_id?.make}
                                                            </Typography>
                                                            <Typography>
                                                                {item?.car_id?.license_plate}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Box className="p-3 flex justify-between items-center border border-gray-200 rounded">
                                                    <Box className="flex items-center space-x-2">
                                                        <Avatar
                                                            src={item?.driver_id?.url_avatar}
                                                            sx={{ width: 50, height: 50 }}
                                                        >
                                                            H
                                                        </Avatar>
                                                        <Box>
                                                            <Typography>
                                                                {nameDisplay(
                                                                    item?.driver_id?.firstName,
                                                                    item?.driver_id?.lastName,
                                                                )}
                                                            </Typography>
                                                            <Typography className="text-[12px]">
                                                                {item?.driver_id?.phone}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}
                                <Box className="mt-5">
                                    <Box className="mb-2 p-3 flex items-center rounded-sm bg-slate-100">
                                        <Typography>Trạng thái</Typography>
                                    </Box>
                                    <Box className="p-4 flex justify-center items-center border border-gray-200 rounded">
                                        <StatusOrder status={item?.status} />
                                    </Box>
                                </Box>
                                <Box className="flex justify-end mt-5">
                                    <Typography>
                                        Tổng tiền:{' '}
                                        <span className="text-blue-500">
                                            {formatCurrency(item?.total_payment)}
                                        </span>
                                    </Typography>
                                </Box>
                                {item?.status === 'WAIT' ? (
                                    <Box className="mt-5 flex justify-end space-x-3">
                                        <Button
                                            onClick={() => handleCancelOrder(item._id)}
                                            type="button"
                                            className="bg-red-500 text-white"
                                        >
                                            Huỷ đơn hàng
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box className="mt-4 flex justify-end">
                                        <AddProlem userId={user?._id} orderId={item?._id} />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ))}
                    {orderList.length == 0 ? (
                        <Box className="flex justify-center items-center">
                            <Box className="mt-7">
                                <Image src={notFoundOrder} height={400} width={400} alt="" />
                                <Box className="mt-5">
                                    <Typography className="font-bold">
                                        Hiện tại bạn không có đơn hàng ở trạng thái này!
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        <Box className="flex justify-center mt-3">
                            <Pagination
                                count={pageCount}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default ManageOrderPage;

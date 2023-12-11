'use client';

import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import SelectInput from '../common/SelectInput';
import StatusOrder from '../common/StatusOrder';
import { formatCurrency, nameDisplay } from '@/utils/FormatData';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axiosClient from '@/lib/axiosClient';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import AddMerchandise from './AddMerchandise';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import DetailCarType from '../common/DetailCarType';
import AddCar from './AddCar';
import AddDriver from './AddDriver';
import iconXe from '../../../public/iconXe.png';
import CloseIcon from '@mui/icons-material/Close';
import Loading from '../common/Loading';

interface EditOrderProps {
    order: any;
    setIsEdit: any;
    needsRefresh?: any;
    setNeedsRefresh?: any;
}

const initOrder = {
    customer_id: {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
    },
    pickup_information: {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        time: '',
    },
    return_information: {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
    },
    vehicle_type: {
        _id: '',
    },
    status: '',
    total_payment: 0,
};

const ModalEditOrder = ({ order, setNeedsRefresh, needsRefresh, setIsEdit }: EditOrderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [orderEdit, setOrderEdit] = useState(initOrder);
    const [selectedTime, setSelectedTime] = useState<any>(null);
    const [merchandiseIds, setMerchandiseIds] = useState<Array<string>>([]);
    const [carSelected, setCarSelected] = useState<any>({});
    const [driverSelected, setDriverSelected] = useState<any>({});
    const [carTypeList, setCarTypeList] = useState([]);
    const [carTypeSelected, setCarTypeSelected] = useState<string>(''); // Id
    const [status, setStatus] = useState<string>('');

    const handleTimeChange = (date: any) => {
        // const time = moment(date).format('HH:mm:ss');
        setSelectedTime(date.$d);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/api/car-type`);
            setCarTypeList((await res.json()) as any);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const mcdIds = order?.merchandise_list.map((item: any) => item._id);
        setMerchandiseIds(mcdIds);
        setCarSelected(order?.car_id ? order?.car_id : {});
        setDriverSelected(order?.driver_id ? order?.driver_id : {});
        setCarTypeSelected(order?.vehicle_type?._id);
        setStatus(order?.status);
        setSelectedTime(dayjs(order?.pickup_information?.time));
        setOrderEdit(order);
    }, []);

    const formik = useFormik({
        initialValues: order,
        onSubmit: async (values, { setValues }) => {
            try {
                const data = {
                    code: order?.code,
                    pickup_information: {
                        ...values.pickup_information,
                        time: selectedTime,
                    },
                    return_information: {
                        ...values.return_information,
                    },
                    merchandise_list: merchandiseIds,
                    note: values.note,
                    // Assgignment car and driver
                    vehicle_type: carTypeSelected,
                    driver_id: driverSelected?._id,
                    car_id: carSelected?._id,
                    status: status,
                    time: selectedTime,
                    // Delete calender when time update or change driver or car
                    oldDriver_id: order?.driver_id,
                    oldCar_id: order?.car_id,
                    oldTime: order?.pickup_information?.time,
                };
                setIsLoading(true);
                const res = await axiosClient.post(`/api/order/${order._id}`, data);
                setIsLoading(false);
                setNeedsRefresh(!needsRefresh);
                toast(res.data.message);
                handleClose();
                // Update table
            } catch (error) {
                setIsLoading(false);
            }
        },
    });

    const handleEdit = () => {
        formik.handleSubmit();
    };
    const handleClose = () => {
        setIsEdit(false);
    };

    return (
        <>
            {isLoading && <Loading />}
            <Box className="fixed top-0 left-0 w-full h-full bg-[#0008] z-[49] overflow-auto flex items-center justify-center">
                <Box className="bg-white px-[20px] py-[5px] rounded-lg w-[1000px] m-auto">
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
                            Chỉnh sửa đơn hàng
                        </Typography>
                        <IconButton aria-label="close-modal" onClick={handleClose}>
                            <CloseIcon className="cursor-pointer"></CloseIcon>
                        </IconButton>
                    </Stack>
                    <Divider></Divider>
                    <Box className="h-[600px] overflow-y-auto">
                        <Box>
                            <Grid container columnGap={1}>
                                <Grid item xs={5.9}>
                                    <Box className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                                        <Box className="pb-3 flex justify-between items-center space-x-2 border-b-[1px] border-gray-200">
                                            <Box className="flex space-x-2">
                                                <PersonOutlineOutlinedIcon />
                                                <Typography className="font-bold">
                                                    Thông tin lấy hàng
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box className="mt-5 space-y-4">
                                            <Box className="flex justify-between space-x-3">
                                                <Box className="space-y-3 w-full">
                                                    <Typography className="text-[15px]">
                                                        Tên:
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        placeholder="Tên"
                                                        value={
                                                            formik.values.pickup_information
                                                                .firstName
                                                        }
                                                        onChange={formik.handleChange}
                                                        size="small"
                                                        name="pickup_information.firstName"
                                                    />
                                                </Box>
                                                <Box className="space-y-3 w-full">
                                                    <Typography className="text-[15px]">
                                                        Họ:
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        placeholder="Họ"
                                                        size="small"
                                                        name="pickup_information.lastName"
                                                        value={
                                                            formik.values.pickup_information
                                                                .lastName
                                                        }
                                                        onChange={formik.handleChange}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="space-y-3 w-full">
                                                <Typography className="text-[15px]">
                                                    Số điện thoại:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Số điện thoại"
                                                    size="small"
                                                    name="pickup_information.phone"
                                                    value={formik.values.pickup_information.phone}
                                                    onChange={formik.handleChange}
                                                />
                                            </Box>
                                            <Box className="space-y-3">
                                                <Typography className="text-[15px]">
                                                    Địa chỉ:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Địa chỉ"
                                                    size="small"
                                                    value={formik.values.pickup_information.address}
                                                    name="pickup_information.address"
                                                    onChange={formik.handleChange}
                                                />
                                            </Box>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DateTimePicker']}>
                                                    <DateTimePicker
                                                        label="Thời gian:"
                                                        value={selectedTime}
                                                        format="DD/MM/YYYY HH:mm:ss"
                                                        onChange={handleTimeChange}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={5.9}>
                                    <Box className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                                        <Box className="mb-5 pb-3 flex items-center space-x-2 border-b-[1px] border-gray-200">
                                            <PersonOutlineOutlinedIcon />
                                            <Typography className="font-bold">
                                                Thông tin trả hàng
                                            </Typography>
                                        </Box>
                                        <Box className="space-y-4">
                                            <Box className="flex justify-between space-x-3">
                                                <Box className="space-y-3 w-full">
                                                    <Typography className="text-[15px]">
                                                        Tên:
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        placeholder="Tên"
                                                        size="small"
                                                        name="return_information.firstName"
                                                        value={
                                                            formik.values.return_information
                                                                .firstName
                                                        }
                                                        onChange={formik.handleChange}
                                                    />
                                                </Box>
                                                <Box className="space-y-3 w-full">
                                                    <Typography className="text-[15px]">
                                                        Họ:
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        placeholder="Họ"
                                                        size="small"
                                                        name="return_information.lastName"
                                                        value={
                                                            formik.values.return_information
                                                                .lastName
                                                        }
                                                        onChange={formik.handleChange}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className="space-y-3 w-full">
                                                <Typography className="text-[15px]">
                                                    Số điện thoại:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Số điện thoại"
                                                    size="small"
                                                    name="return_information.phone"
                                                    value={formik.values.return_information.phone}
                                                    onChange={formik.handleChange}
                                                />
                                            </Box>
                                            <Box className="space-y-3">
                                                <Typography className="text-[15px]">
                                                    Địa chỉ:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Địa chỉ"
                                                    size="small"
                                                    value={formik.values.return_information.address}
                                                    name="return_information.address"
                                                    onChange={formik.handleChange}
                                                />
                                            </Box>
                                            {/* <Button onClick={calculateRoute}>Click me</Button> */}
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className="mt-3 p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <Box className="mb-5 pb-3 flex items-center space-x-2 border-b-[1px] border-gray-200">
                                <AttachmentOutlinedIcon />
                                <Typography className="font-bold">Thông tin hàng hoá</Typography>
                            </Box>
                            <Box>
                                <AddMerchandise
                                    merchandiseIds={merchandiseIds}
                                    setMerchandiseIds={setMerchandiseIds}
                                />
                            </Box>
                        </Box>
                        <Box className="mt-3 p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <Box className="pb-3 flex items-center space-x-2 border-b-[1px] border-gray-200">
                                {/* <LocalShippingOutlinedIcon /> */}
                                <Typography className="font-bold">Loại phương tiện</Typography>
                            </Box>
                            <Swiper
                                className="mt-5"
                                spaceBetween={10}
                                slidesPerView={3}
                                navigation={true}
                                modules={[Navigation]}
                            >
                                {carTypeList.map((carType: any) => (
                                    <SwiperSlide key={carType._id}>
                                        <Box
                                            className={`h-[190px] border rounded flex flex-col justify-center items-center cursor-pointer ${
                                                carTypeSelected === carType._id
                                                    ? 'border-[3px] border-red-500'
                                                    : 'border border-gray-300'
                                            }`}
                                            onClick={() => setCarTypeSelected(carType._id)}
                                        >
                                            <Image src={iconXe} alt="" width={50} height={50} />
                                            <Typography>{carType?.name}</Typography>
                                            <Box className="mt-3">
                                                <DetailCarType carType={carType} />
                                            </Box>
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Box>
                        <Box className="mt-5">
                            <Box className="mb-2 p-3 flex justify-between items-center rounded-sm bg-slate-100">
                                <Typography>Phân công</Typography>
                                <Box className="space-x-1 flex">
                                    <AddCar
                                        vehicleTypeId={carTypeSelected}
                                        setCarSelected={setCarSelected}
                                    />
                                    <AddDriver
                                        vehicleTypeId={carTypeSelected}
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
                            <Box className="mb-2 px-3 flex items-center justify-between rounded-sm bg-slate-100">
                                <Box>
                                    <Typography>Trạng thái</Typography>
                                </Box>
                                <SelectInput
                                    className="w-[200px]"
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
                            <Box className="p-4 flex justify-center items-center border border-gray-200 rounded">
                                <StatusOrder status={status} />
                            </Box>
                        </Box>
                        <Box className="flex justify-end mt-5 mr-3">
                            <Typography>
                                Tổng tiền:{' '}
                                <span className="text-blue-500">
                                    {formatCurrency(orderEdit?.total_payment)}
                                </span>
                            </Typography>
                        </Box>
                    </Box>
                    <Stack
                        spacing={1}
                        direction="row"
                        justifyContent={{ xs: 'space-between', lg: 'flex-end' }}
                        className="my-5"
                    >
                        <Button variant="contained" color="primary" onClick={handleEdit}>
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

export default ModalEditOrder;

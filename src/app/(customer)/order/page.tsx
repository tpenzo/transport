'use client';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import iconXe from '../../../../public/iconXe.png';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import LinearBuffer from '@/components/common/LinearBuffer';
import DetailCarType from '@/components/common/DetailCarType';
import { useFormik } from 'formik';
import AddMerchandise from '@/components/Modal/AddMerchandise';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { useSelector } from 'react-redux';
import axiosClient from '@/lib/axiosClient';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { formatCurrency } from '@/utils/FormatData';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Loading from '@/components/common/Loading';

const center = { lat: 21.0369023, lng: 105.8320918 };
const libraries = ['places'];

const initialValues = {
    pickup_information: {
        firstName: '',
        lastName: '',
        phone: '',
        address: '263 Chợ Phong Điền, Phong Điền, Cần Thơ',
    },
    return_information: {
        firstName: '',
        lastName: '',
        phone: '',
        address: 'Can Tho University, Đường 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ',
    },
    note: '',
};

const OrderPage: NextPage = () => {
    // --------------------------------------------------------------
    const { user } = useSelector((state) => (state as any).auth);
    const [loading, setLoading] = useState(false);
    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('20');
    const [duration, setDuration] = useState('');
    const [totalPayment, setTotalPayment] = useState(650000);
    const [carTypeList, setCarTypeList] = useState([]);
    const [carTypeSelected, setCarTypeSelected] = useState<string>(''); // Id
    const [isPayment, setIsPayment] = useState<Boolean>(false);
    const [merchandiseIds, setMerchandiseIds] = useState<Array<string>>([]);
    const originRef = useRef<HTMLInputElement | null>(null);
    const destiantionRef = useRef<HTMLInputElement | null>(null);

    const [selectedTime, setSelectedTime] = useState(null);

    const handleTimeChange = (date: any) => {
        // const time = moment(date).format('HH:mm:ss');
        setSelectedTime(date.$d);
    };

    // --------------------------------------------------------------
    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosClient.get(`http://localhost:3000/api/car-type`);
            setCarTypeList(res.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const value = parseInt(distance);
        const fetchData = async () => {
            const res = await axiosClient.post(`/api/pricing/cost`, {
                distance: value,
                vehicleType: carTypeSelected,
            });
            setTotalPayment(res.data);
        };
        if (carTypeSelected && value) {
            fetchData();
        }
    }, [distance, carTypeSelected]);
    // --------------------------------------------------------------

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDzQWw10xZYtT2AXrm0hJUnCNW9k2z5eWQ',
        libraries: libraries as any,
    });

    async function calculateRoute() {
        if (originRef.current?.value === '' || destiantionRef.current?.value === '') {
            return;
        }

        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current?.value as string,
            destination: destiantionRef.current?.value as string,
            travelMode: google.maps.TravelMode.DRIVING,
        });

        setDirectionsResponse(results as any);
        if (
            results?.routes &&
            results.routes[0]?.legs &&
            results.routes[0].legs[0]?.distance &&
            typeof results.routes[0].legs[0].distance.text === 'string'
        ) {
            setDistance(results.routes[0].legs[0].distance.text);
        }

        if (
            results?.routes &&
            results.routes[0]?.legs &&
            results.routes[0].legs[0]?.duration &&
            typeof results.routes[0].legs[0].duration.text === 'string'
        ) {
            setDuration(results.routes[0].legs[0].duration.text);
        }
    }

    const resetAllStates = () => {
        setMerchandiseIds([]);
        setCarTypeSelected('');
        setSelectedTime(null);
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values, { setValues }) => {
            try {
                setLoading(true);
                const data = {
                    customer_id: user._id,
                    pickup_information: {
                        ...values.pickup_information,
                        // address: originRef.current?.value,
                        address: '263 Chợ Phong Điền, Phong Điền, Cần Thơ',
                        time: selectedTime,
                    },
                    return_information: {
                        ...values.return_information,
                        // address: destiantionRef.current?.value,
                        address:
                            'Can Tho University, Đường 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ',
                    },
                    merchandise_list: merchandiseIds,
                    vehicle_type: carTypeSelected,
                    note: values.note,
                    payment_menthods: isPayment ? 'CARSH' : 'CARD',
                    total_payment: totalPayment,
                };
                const res = await axiosClient.post(`/api/order`, data);
                setLoading(false);
                toast(res.data?.message);
                // Clean data
                resetAllStates();
                setValues(initialValues);
            } catch (error) {
                setLoading(false);
            }
        },
    });

    const handleSetInfo = () => {
        formik.setValues({
            ...formik.values,
            pickup_information: {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                address: '',
            },
        });
    };

    if (!isLoaded) {
        return <LinearBuffer />;
    }
    return (
        <>
            {loading && <Loading />}
            <Box className="bg-gray-200 p-3">
                <Container className="max-w-7xl">
                    <Grid container>
                        <Grid item xs={6} className="h-[80vh] overflow-auto">
                            <form onSubmit={formik.handleSubmit}>
                                <Box className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    <Box className="pb-3 flex justify-between items-center space-x-2 border-b-[1px] border-gray-200">
                                        <Box className="flex space-x-2">
                                            <PersonOutlineOutlinedIcon />
                                            <Typography className="font-bold">
                                                Thông tin lấy hàng
                                            </Typography>
                                        </Box>
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={handleSetInfo}
                                        >
                                            Sử dụng thông tin tài khoản
                                        </Button>
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
                                                    size="small"
                                                    name="pickup_information.firstName"
                                                    value={
                                                        formik.values.pickup_information.firstName
                                                    }
                                                    onChange={formik.handleChange}
                                                />
                                            </Box>
                                            <Box className="space-y-3 w-full">
                                                <Typography className="text-[15px]">Họ:</Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Họ"
                                                    size="small"
                                                    name="pickup_information.lastName"
                                                    value={
                                                        formik.values.pickup_information.lastName
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
                                                name="pickup_information.address"
                                                value={formik.values.pickup_information.address}
                                                onChange={formik.handleChange}
                                            />
                                            {/* <Autocomplete>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Nhập địa chỉ"
                                                    size="small"
                                                    inputRef={originRef}
                                                    onChange={calculateRoute}
                                                />
                                            </Autocomplete> */}
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
                                <Box className="mt-3 p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
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
                                                        formik.values.return_information.firstName
                                                    }
                                                    onChange={formik.handleChange}
                                                />
                                            </Box>
                                            <Box className="space-y-3 w-full">
                                                <Typography className="text-[15px]">Họ:</Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Họ"
                                                    size="small"
                                                    name="return_information.lastName"
                                                    value={
                                                        formik.values.return_information.lastName
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
                                            <Typography className="text-[15px]">Địa chỉ</Typography>
                                            <TextField
                                                fullWidth
                                                placeholder="Địa chỉ"
                                                size="small"
                                                name="return_information.address"
                                                value={formik.values.return_information.address}
                                                onChange={formik.handleChange}
                                            />
                                            {/* <Autocomplete>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Nhập địa chỉ"
                                                    size="small"
                                                    inputRef={destiantionRef}
                                                    onChange={calculateRoute}
                                                />
                                            </Autocomplete> */}
                                        </Box>
                                        {/* <Button onClick={calculateRoute}>Click me</Button> */}
                                    </Box>
                                </Box>
                                <Box className="mt-3 p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    <Box className="pb-3 flex items-center space-x-2 border-b-[1px] border-gray-200">
                                        <LocalShippingOutlinedIcon />
                                        <Typography className="font-bold">
                                            Chọn phương tiện
                                        </Typography>
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
                                                    <Image
                                                        src={iconXe}
                                                        alt=""
                                                        width={50}
                                                        height={50}
                                                    />
                                                    <Typography>{carType?.name}</Typography>
                                                    <Box className="mt-3">
                                                        <DetailCarType carType={carType} />
                                                    </Box>
                                                </Box>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </Box>
                                <Box className="mt-3 p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    <Box className="mb-5 pb-3 flex items-center space-x-2 border-b-[1px] border-gray-200">
                                        <AttachmentOutlinedIcon />
                                        <Typography className="font-bold">
                                            Thông tin hàng hoá
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <AddMerchandise
                                            merchandiseIds={merchandiseIds}
                                            setMerchandiseIds={setMerchandiseIds}
                                        />
                                    </Box>
                                </Box>
                                <Box className="mt-3 p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    <Box className="mb-5 pb-3 flex items-center space-x-2 border-b-[1px] border-gray-200">
                                        <NoteAltOutlinedIcon />
                                        <Typography className="font-bold">Ghi chú</Typography>
                                    </Box>
                                    <Box>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            minRows={8}
                                            size="small"
                                            placeholder="Ghi chú"
                                            name="note"
                                            value={formik.values.note}
                                            onChange={formik.handleChange}
                                        />
                                    </Box>
                                </Box>
                                <Box className="mt-3 p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    <Box className="mb-5 pb-3 flex items-center space-x-2 border-b-[1px] border-gray-200">
                                        <PaymentIcon />
                                        <Typography className="font-bold">
                                            Hình thức thanh toán
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <label className="flex justify-between border p-2 rounded shadow-md drop-shadow-2xl cursor-pointer mb-2">
                                            <Box className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="mr-3 bg-orange-500 w-5 h-5"
                                                    name="method_pay"
                                                    id="cash"
                                                    checked={!isPayment}
                                                    onChange={() => {
                                                        setIsPayment(false);
                                                    }}
                                                />
                                                <Box>
                                                    <Typography className="font-bold">
                                                        Tiền mặt
                                                    </Typography>
                                                    <Typography className="text-sm text-slate-500">
                                                        Thanh toán lúc lấy hàng
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 576 512"
                                                className="w-5 fill-slate-500 "
                                            >
                                                <path d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM288 352c-44.2 0-80-43-80-96s35.8-96 80-96s80 43 80 96s-35.8 96-80 96zM64 352c35.3 0 64 28.7 64 64H64V352zm64-208c0 35.3-28.7 64-64 64V144h64zM512 304v64H448c0-35.3 28.7-64 64-64zM448 96h64v64c-35.3 0-64-28.7-64-64z" />
                                            </svg>
                                        </label>
                                        <label className="flex justify-between border p-2 rounded shadow-md drop-shadow-2xl cursor-pointer mb-2">
                                            <Box className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="mr-3 bg-orange-500 w-5 h-5"
                                                    name="method_pay"
                                                    id="bank"
                                                    checked={isPayment as any}
                                                    onChange={() => {
                                                        setIsPayment(true);
                                                    }}
                                                />
                                                <Box>
                                                    <Typography className="font-bold">
                                                        Chuyển khoản
                                                    </Typography>
                                                    <Typography className="text-sm text-slate-500">
                                                        Chuyển khoản ngân hàng
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <svg
                                                className="w-5 fill-slate-500 "
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 576 512"
                                            >
                                                <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" />
                                            </svg>
                                        </label>
                                    </Box>
                                </Box>
                                <Box className="mt-3 p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    <Box className="flex justify-between mb-5 pb-3 items-center space-x-2">
                                        <Typography className="font-bold">Tổng tiền</Typography>
                                        <Typography className="font-medium text-[30px]">
                                            {formatCurrency(totalPayment)}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Link href={'/'}>
                                            <Button>Quay lại</Button>
                                        </Link>
                                        <Button type="submit">Đặt ngay</Button>
                                    </Box>
                                </Box>
                            </form>
                        </Grid>
                        <Grid item xs={6}>
                            <Box className="p-2 bg-white border border-gray-200 rounded-lg shadow-lg  h-full w-full">
                                <GoogleMap
                                    center={center}
                                    zoom={15}
                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                    options={{
                                        zoomControl: false,
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        fullscreenControl: false,
                                    }}
                                    onLoad={(map) => setMap(map as any)}
                                >
                                    <Marker position={center} />
                                    {directionsResponse && (
                                        <DirectionsRenderer directions={directionsResponse} />
                                    )}
                                </GoogleMap>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default OrderPage;

// export default OrderPage;

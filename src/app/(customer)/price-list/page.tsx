'use client';
import { Box, Container, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import axiosClient from '@/lib/axiosClient';
import Footer from '@/components/common/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/FormatData';

const PriceList: NextPage = () => {
    const [pricingList, setPricingList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosClient.get(`http://localhost:3000/api/pricing`);
            setPricingList(res.data);
        };
        fetchData();
    }, []);

    console.log(pricingList);

    return (
        <>
            <Container className="max-w-7xl">
                <Box className="flex p-5 my-5">
                    <Typography variant="h4" className="text-red-400">
                        Bảng giá cước xe
                    </Typography>
                </Box>
                <Grid container>
                    <Grid item xs={2}>
                        <Box className="flex pl-10  items-center border-b h-[138px]">
                            <Typography>Thông số</Typography>
                        </Box>
                        <Box className="flex pl-10 py-5 items-center border-b">
                            <Typography>Kích thước</Typography>
                        </Box>
                        <Box className="flex pl-10 py-5 items-center border-b">
                            <Typography>Số khối</Typography>
                        </Box>
                        <Box className="flex pl-10 py-5 items-center border-b">
                            <Typography>Cước ban đầu</Typography>
                        </Box>
                        <Box className="flex pl-10 py-5 items-center border-b h-[137px]">
                            <Typography>Cước xe</Typography>
                        </Box>
                        <Box className="flex pl-10 py-5 items-center">
                            <Typography>Lưu ý</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={3}
                            navigation={true}
                            modules={[Navigation]}
                        >
                            {pricingList.map((item: any) => (
                                <SwiperSlide key={item._id}>
                                    <Box className="flex justify-center py-3">
                                        <Typography className="text-red-400 font-bold">
                                            {item.vehicle_type.name}
                                        </Typography>
                                    </Box>
                                    <Box className="flex px-[5] border-b justify-center">
                                        <Image
                                            src={item.vehicle_type.url_img}
                                            alt=""
                                            width={150}
                                            height={150}
                                        />
                                    </Box>
                                    <Box className="p-5 border-b">
                                        {item?.vehicle_type?.maximum_load}
                                    </Box>
                                    <Box className="p-5 border-b">
                                        {item?.vehicle_type?.maximum_cargo_size}
                                    </Box>
                                    <Box className="p-5 border-b">
                                        {formatCurrency(item.init_price)}
                                    </Box>
                                    <Box className="p-5 border-b">
                                        <Typography>
                                            {'1 - 4km | ' +
                                                formatCurrency(item.rates[0].price) +
                                                '/ km'}
                                        </Typography>
                                        <Typography>
                                            {'5 - 15km | ' +
                                                formatCurrency(item.rates[1].price) +
                                                '/ km'}
                                        </Typography>
                                        <Typography>
                                            {'16 - 50km | ' +
                                                formatCurrency(item.rates[2].price) +
                                                '/ km'}
                                        </Typography>
                                        <Typography>
                                            {'> 51km | ' +
                                                formatCurrency(item.rates[3].price) +
                                                '/ km'}
                                        </Typography>
                                    </Box>
                                    <Box className="p-5">{item.vehicle_type?.suitable_for}</Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Grid>
                </Grid>
            </Container>
            <Box className="mt-10">
                <Footer />
            </Box>
        </>
    );
};

export default PriceList;

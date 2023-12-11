import { Box, Container, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import imgBanner from '../../../public/banner.jpg';
import Image from 'next/image';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import iconManageOrder from '../../../public/icon-giao-hang.png';
import iconOrder from '../../../public/icon-don-hang.png';
import inconPricing from '../../../public/document_icon.webp';
import shutterstock from '../../../public/shutterstock_713439202_retouch.jpg';
import icn_affordable from '../../../public/icn_affordable.webp';
import icn_fast from '../../../public/icn_fast.webp';
import icon_location from '../../../public/icon-multi-location-2.svg';
import DetailCarType from '@/components/common/DetailCarType';
import axiosClient from '@/lib/axiosClient';
import Footer from '@/components/common/Footer';

const getCarTypeList = async () => {
    try {
        const res = await axiosClient.get(`http://localhost:3000/api/car-type`);
        return await res.data;
    } catch (error) {
        return null;
    }
};

const HomePage: NextPage = async () => {
    // Call data
    const carTypeList = await getCarTypeList();

    return (
        <>
            <Container className="max-w-7xl">
                {/* Banner */}
                <Box className="bg-white border border-gray-200 rounded-lg shadow-lg">
                    <Grid container>
                        <Grid item xs={4} className="p-5  space-y-3">
                            <Box className="mb-2">
                                <Typography variant="h6">Tìm đơn hàng nhanh</Typography>
                            </Box>
                            <Box className="relative flex items-center">
                                <Box className="absolute mx-3">
                                    <SearchOutlinedIcon />
                                </Box>
                                <input
                                    type="text"
                                    className="block w-full py-3 bg-white border rounded-lg px-11 focus:border-blue-40 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    placeholder="Mã đơn hàng"
                                />
                            </Box>
                            <Box className="flex space-x-4 items-center">
                                <Image src={iconManageOrder} alt="Order" width={50} height={50} />
                                <Box>
                                    <Typography>Tạo đơn vận chuyển</Typography>
                                    <Typography className="text-[12px]">
                                        Nhanh chống tạo đơn vận chuyển
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className="flex space-x-4 items-center">
                                <Image src={iconOrder} alt="Order" width={50} height={50} />
                                <Box>
                                    <Typography>Quản lý đơn hàng</Typography>
                                    <Typography className="text-[12px]">
                                        Dễ dàng theo dỏi và quản lý đơn hàng
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className="flex space-x-4 items-center">
                                <Image src={inconPricing} alt="Order" width={50} height={50} />
                                <Box>
                                    <Typography>Xem bảng giá</Typography>
                                    <Typography className="text-[12px]">
                                        Giá thành và thời gian vận chuyển
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Image src={imgBanner} alt="banner" />
                        </Grid>
                    </Grid>
                </Box>
                <Box className="mt-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <Grid container>
                        <Grid item xs={6}>
                            <Image src={shutterstock} alt="shutterstock" />
                        </Grid>
                        <Grid item xs={6} className="p-5 flex flex-col justify-center">
                            <Box>
                                <Typography className="text-[24px]">
                                    Đối tác vận chuyển 24/7
                                </Typography>
                                <Typography variant="h5" className="font-bold my-2">
                                    Nhanh chóng. Đơn giản. Giá phải chăng
                                </Typography>
                            </Box>
                            <Box className="space-y-3 mt-3">
                                <Box className="flex space-x-4 items-center">
                                    <Image
                                        src={icn_affordable}
                                        alt="Order"
                                        width={50}
                                        height={50}
                                    />
                                    <Box className="space-y-1">
                                        <Typography className="font-bold">
                                            Cước phí thấp và rõ ràng
                                        </Typography>
                                        <Typography className="text-[13px]">
                                            Giá cả rõ ràng và không có chi phí ẩn. Thanh toán trực
                                            tiếp qua ứng dụng hoặc thanh toán bằng tiền mặt cho tài
                                            xế của bạn.
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="flex space-x-4 items-center">
                                    <Image src={icn_fast} alt="Order" width={50} height={50} />
                                    <Box className="space-y-1">
                                        <Typography className="font-bold">
                                            Xe nào cũng có, đủ loại trọng tải
                                        </Typography>
                                        <Typography className="text-[13px]">
                                            Đa dạng phương tiện vận chuyển giúp đáp ứng mọi yêu cầu
                                            giao hàng của bạn bất cứ lúc nào.
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="flex space-x-4 items-center">
                                    <Image src={icon_location} alt="Order" width={50} height={50} />
                                    <Box className="space-y-1">
                                        <Typography className="font-bold">
                                            Giao hàng đường dài
                                        </Typography>
                                        <Typography className="text-[13px]">
                                            Đối tác tài xế chuyên nghiệp đảm bảo giao hàng an toàn
                                            và nhanh chóng đến hơn 41 tỉnh, thành.
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box className="mt-7 bg-white">
                    <Box className="flex justify-center p-5">
                        <Typography variant="h4">
                            Phương tiện vận chuyển phù hợp với mức giá tốt nhất
                        </Typography>
                    </Box>
                    <Grid container rowGap={10}>
                        {carTypeList.map((carType: any, index: any) => (
                            <Grid item xs={4} className="relative p-[20px]" key={index}>
                                <Box className="relative z-[5]">
                                    <Box className="absolute z-[-1] top-[140px] bg-[#F1F3F4] w-full h-[220px]"></Box>
                                    <Box className="flex justify-center items-center">
                                        <Image
                                            src={carType.url_img}
                                            alt=""
                                            width={340}
                                            height={200}
                                        />
                                    </Box>
                                    <Box className="flex flex-col justify-center items-center space-y-3">
                                        <Typography className="font-bold" variant="h6">
                                            {carType?.name}
                                        </Typography>
                                        <DetailCarType carType={carType} />
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
            <Box className="mt-10">
                <Footer />
            </Box>
        </>
    );
};

export default HomePage;

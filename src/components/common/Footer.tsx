import { Box, Container, Grid, Typography } from '@mui/material';
import logo from '../../../public/logo.png';
import Image from 'next/image';

const Footer = () => {
    return (
        <Box className="bg-[#F1F3F4]">
            <Container className="max-w-7xl p-6">
                <Grid container>
                    <Grid item xs={7}>
                        <Box className="flex items-center space-x-2">
                            <Image src={logo} alt="logo" height={50} />
                            <Typography className="text-[29px]">TpMove</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={5} className="flex justify-between">
                        <Box className="space-y-2">
                            <Typography className="font-bold">Dịch vụ</Typography>
                            <Typography className="text-[13px]">Doanh Nghiệp</Typography>
                            <Typography className="text-[13px]">Cá Nhân</Typography>
                            <Typography className="text-[13px]">Tài Xế</Typography>
                            <Typography className="text-[13px]">Bảng Giá Dịch Vụ</Typography>
                            <Typography className="text-[13px]">Câu Hỏi Thường Gặp</Typography>
                        </Box>
                        <Box className="space-y-2">
                            <Typography className="font-bold">Thông tin</Typography>
                            <Typography className="text-[13px]">Về Chúng Tôi</Typography>
                            <Typography className="text-[13px]">Deliver Care</Typography>
                            <Typography className="text-[13px]">Blog</Typography>
                            <Typography className="text-[13px]">Tuyển Dụng</Typography>
                            <Typography className="text-[13px]">Liên Hệ Hỗ Trợ</Typography>
                        </Box>
                        <Box className="space-y-2">
                            <Typography className="font-bold">Pháp lý</Typography>
                            <Typography className="text-[13px]">
                                Chính Sách Quyền Riêng Tư
                            </Typography>
                            <Typography className="text-[13px]">Chích Sách Cookie</Typography>
                            <Typography className="text-[13px]">Điều Khoản Và Điều Kiện</Typography>
                            <Box>
                                <Typography>Theo dỏi chúng tôi</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;

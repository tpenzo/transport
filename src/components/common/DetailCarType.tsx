import { NextPage } from 'next';
import CommonModal from './CommonModal';
import { Box, Grid, Stack, Typography } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Link from 'next/link';

interface DetailCarTypeProps {
    carType: any;
}

const DetailCarType: NextPage<DetailCarTypeProps> = ({ carType }) => {
    return (
        <CommonModal
            ishowInfo={true}
            modalBtnText="Xem chi tiết"
            modalTitle={carType?.name}
            // modalBtnColor="bg-red-500"
            actConfirmColor="bg-red-500"
            modalWidth="w-[700px]"
        >
            <Stack spacing={2} className="flex justify-center items-center">
                <Grid container className="border-b border-gray-200 pb-3">
                    <Grid item xs={4}>
                        <Typography>Cước phí:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Link href={'/price-list'}>
                            <Typography>
                                Tham khảo{' '}
                                <span className="underline text-blue-500">Bảng Giá Dịch Vụ</span>
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container className="border-b border-gray-200 pb-3">
                    <Grid item xs={4}>
                        <Typography>Tải trọng tối đa:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{carType?.maximum_load}</Typography>
                    </Grid>
                </Grid>
                <Grid container className="border-b border-gray-200 pb-3">
                    <Grid item xs={4}>
                        <Box>
                            <Typography>Kích cỡ hàng hóa tối đa:</Typography>
                            <Typography className="text-[13px]">(Dài x Rộng x Cao)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{carType?.maximum_cargo_size}</Typography>
                    </Grid>
                </Grid>
                <Grid container className="border-b border-gray-200 pb-3">
                    <Grid item xs={4}>
                        <Box>
                            <Typography>Phù hợp cho:</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{carType?.suitable_for}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <Box>
                            <Typography>Lưu ý:</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{carType?.note}</Typography>
                    </Grid>
                </Grid>
            </Stack>
        </CommonModal>
    );
};

export default DetailCarType;

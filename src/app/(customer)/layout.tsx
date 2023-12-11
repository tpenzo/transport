import { Box, Button, Container, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import Header from '@/components/common/Header';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Box>
            <Box className="fixed top-0 w-full z-10">
                {/* Top header */}
                <Box className="bg-red-500">
                    <Container className="max-w-7xl text-white">
                        <Box className="flex justify-between items-center">
                            <Link href={'/order'}>
                                <Button className="text-white bg-red-600">
                                    Đặt đơn vận chuyển nhanh
                                </Button>
                            </Link>
                            <Box className="flex justify-between space-x-2">
                                <PhoneIcon />
                                <Typography>0346405050</Typography>
                            </Box>
                        </Box>
                    </Container>
                </Box>
                <Header />
            </Box>
            <Box className="w-full mt-[111px]">{children}</Box>
        </Box>
    );
}

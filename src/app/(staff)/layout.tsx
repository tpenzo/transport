import { Box, Container, Grid, Typography } from '@mui/material';
import NavStaff from '@/components/common/NavStaff';
import HeaderStaff from '@/components/common/HeaderStaff';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box>
            <Box className="fixed top-0 w-full z-10">
                <HeaderStaff />
            </Box>
            <Box className="mt-[75px]">
                <Container className="max-w-full">
                    <Grid container>
                        <Grid item xs={2.5}>
                            <NavStaff />
                        </Grid>
                        <Grid
                            item
                            xs={9.5}
                            // className="max-h-full bg-white border border-gray-200 shadow-lg"
                        >
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

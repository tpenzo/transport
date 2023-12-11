import NavCustomer from '@/components/common/NavCustomer';
import { Container, Grid } from '@mui/material';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Container className="max-w-7xl">
            <Grid container columnGap={1}>
                <Grid item xs={3}>
                    <NavCustomer />
                </Grid>
                <Grid item xs={8.9}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    );
}

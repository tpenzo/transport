'use client';
import { NextPage } from 'next';
import {
    Box,
    Container,
    Typography,
    TextField,
    FormControlLabel,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Grid,
} from '@mui/material';
import Image from 'next/image';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import logo_login from '../../../public/logo_Login.jpg';
import axiosClient from '@/lib/axiosClient';
import { useDispatch } from 'react-redux';
import { authSaveData } from '@/redux/authSlice';

const LoginPage: NextPage = () => {
    const Router = useRouter();

    const dispatch = useDispatch();

    // Hander show password
    const [showPassword, setShowPassword] = useState<Boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const res = await axiosClient.post('/api/auth/login', values);
                await dispatch(authSaveData(res.data?.user));
                switch (res.data.user.role) {
                    case 'COORDINATOR': {
                        Router.push('/staff');
                        break;
                    }
                    case 'DRIVER': {
                        Router.push('/driver');
                        break;
                    }
                    case 'CUSTOMER': {
                        Router.push('/');
                        break;
                    }
                }
            } catch (error: any) {
                toast.error(error.data.message);
            }
        },
    });

    return (
        <Box className="bg-gray-100">
            <Container className="h-screen w-screen mx-auto flex flex-col justify-center items-center">
                <Grid
                    container
                    className="bg-white w-[950px] rounded-xl p-3 shadow-2xl border-gray-200 border-[1px]"
                >
                    <Grid item xs={6} className="my-auto">
                        <Image src={logo_login} alt="illustration of the LoginPage" />
                    </Grid>
                    <Grid item xs={6}>
                        <Box className="p-5">
                            <Box className="flex justify-center">
                                <Typography component="h1" variant="h4">
                                    Đăng nhập
                                </Typography>
                            </Box>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    required
                                    label="Email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <FormControl variant="outlined" fullWidth className="mt-3">
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Mật khẩu
                                    </InputLabel>
                                    <OutlinedInput
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        required
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    className="my-2"
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className="w-full rounded bg-blue-600 px-4 py-3"
                                >
                                    Đăng nhập
                                </Button>
                            </form>
                            <Box className="flex justify-center my-5">
                                <Typography component="p">
                                    Đây là lần đầu tiên sử dụng dịch vụ ?{' '}
                                    <span className="font-bold">
                                        <Link href={'/register'}>Hãy đăng ký mới</Link>
                                    </span>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default LoginPage;

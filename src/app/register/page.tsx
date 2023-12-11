'use client';
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { NextPage } from 'next';
import Image from 'next/image';
import illustration_signup from '../../../public/icon_signup.png';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';

const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
};

const RegisterPage: NextPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values, { setValues }) => {
            try {
                const res = await axiosClient.post('/api/auth/register', values);
                toast(res.data.message);
            } catch (error: any) {
                toast.error((error.data as { message: string }).message);
            }
            setValues(initialValues);
        },
    });

    // const [fileAvatar, setFileAvatar] = useState(null);

    // const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files?.length) {
    //         await uploadIMG(e.target.files[0]);
    //     }
    // };

    return (
        <Box>
            <Box className="bg-gray-100">
                <Container className="h-screen w-screen mx-auto flex flex-col justify-center items-center">
                    <Grid
                        container
                        className="bg-white w-[950px] rounded-xl p-6 shadow-2xl border-gray-200 border-[1px]"
                    >
                        <Grid item xs={6}>
                            <form onSubmit={formik.handleSubmit}>
                                <Box className="flex justify-center m-3">
                                    <Typography component="h4" variant="h4">
                                        Đăng ký
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between space-x-3">
                                    <TextField
                                        name="firstName"
                                        margin="normal"
                                        fullWidth
                                        id="firstName"
                                        label="Tên"
                                        autoComplete="firstName"
                                        autoFocus
                                        required
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                    />
                                    <TextField
                                        name="lastName"
                                        margin="normal"
                                        fullWidth
                                        id="lastName"
                                        label="Họ"
                                        autoComplete="lastName"
                                        required
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                    />
                                </Box>
                                <TextField
                                    type="email"
                                    name="email"
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="E-mail"
                                    required
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="phone"
                                    margin="normal"
                                    fullWidth
                                    required
                                    id="phone"
                                    label="Số điện thoại"
                                    autoComplete="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name="password"
                                    margin="normal"
                                    fullWidth
                                    required
                                    id="password"
                                    label="Mật khẩu"
                                    autoComplete="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className="w-full rounded bg-blue-600 px-4 py-3 my-5"
                                >
                                    Đăng ký
                                </Button>
                            </form>
                            <Typography className="text-center">
                                Bạn đã có tài khoản ?{' '}
                                <span className="font-bold">
                                    <Link href={'/login'}>Đăng nhập ngay</Link>
                                </span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className="p-4 my-auto">
                            <Image src={illustration_signup} alt="register" />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default RegisterPage;

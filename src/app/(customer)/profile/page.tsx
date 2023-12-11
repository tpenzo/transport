'use client';
import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { checkImage, uploadIMG } from '@/utils/upload';
import axiosClient from '@/lib/axiosClient';
import { authSaveData } from '@/redux/authSlice';
import { toast } from 'react-toastify';
import Loading from '../../../components/common/Loading';

const ProfilePage: NextPage = () => {
    // Get user from store
    const { user } = useSelector((state) => (state as any).auth);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    // Set Avatar
    const [fileAvatar, setFileAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(user?.url_avatar);

    const handleInputChange = (event: any) => {
        const err = checkImage(event.target.files[0]);
        if (!err) {
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
            setFileAvatar(event.target.files[0]);
        } else {
            toast.error(err);
        }
    };

    const formik = useFormik({
        initialValues: user,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                let url = '';
                if (fileAvatar) {
                    url = (await uploadIMG(fileAvatar)) as any;
                }
                const data = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone,
                    email: values.email,
                    url_avatar: fileAvatar ? url : user.url_avatar,
                };
                const res = await axiosClient.put(`/api/user/customer/${user._id}`, data);
                await dispatch(authSaveData(res.data?.user));
                setLoading(false);
                toast(res.data.message);
            } catch (error: any) {
                setLoading(false);
                toast.error((error.data as { message: string }).message);
            }
        },
    });

    return (
        <>
            {loading && <Loading />}
            <Box className="p-4 bg-white border border-gray-200 shadow-lg h-[85vh]">
                <Box className="flex items-center space-x-2 mt-3 h-[40px] border-b border-gray-200">
                    <PersonIcon />
                    <Typography className="font-bold">Thông tin tài khoản</Typography>
                </Box>
                <Grid container className="mt-5">
                    <Grid item xs={2}>
                        <Box>
                            <Box className="flex items-center">
                                <Box className="relative">
                                    <Box className="w-32 h-32 rounded-full overflow-hidden">
                                        <img
                                            src={avatarUrl}
                                            alt="Current avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </Box>
                                    <Box className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                        <label
                                            htmlFor="avatarInput"
                                            className="flex justify-center items-center cursor-pointer w-full h-full rounded-full"
                                        />
                                        <input
                                            type="file"
                                            id="avatarInput"
                                            accept="image/png, image/jpeg"
                                            className="hidden"
                                            onChange={handleInputChange}
                                        />
                                        <label
                                            htmlFor="avatarInput"
                                            className="absolute -bottom-2 px-4 py-1  rounded-full bg-red-600 text-white text-xs"
                                        >
                                            Update
                                        </label>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <form onSubmit={formik.handleSubmit}>
                            <table className="w-full border-separate border-spacing-2  ">
                                <tbody>
                                    <tr>
                                        <td>
                                            Tên:
                                            <span className="ml-1 text-red-600">*</span>
                                        </td>
                                        <td className="">
                                            <TextField
                                                name="firstName"
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                className="input w-4/5"
                                                size="small"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Họ:
                                            <span className="ml-1 text-red-600">*</span>
                                        </td>
                                        <td className="">
                                            <TextField
                                                name="lastName"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                className="input w-4/5"
                                                size="small"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Liên hệ:
                                            <span className="ml-1 text-red-600">*</span>
                                        </td>
                                        <td className="">
                                            <TextField
                                                name="phone"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                className="input w-4/5"
                                                size="small"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Email:
                                            <span className="ml-1 text-red-600">*</span>
                                        </td>
                                        <td className="">
                                            <TextField
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                className="w-4/5"
                                                size="small"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Địa chỉ:</td>
                                        <td className="">
                                            <TextField className="w-4/5" size="small" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="w-1/6"></td>
                                        <td
                                            className="text-sky-600 hover:cursor-pointer hover:opacity-80"
                                            onClick={() => setChangePassword(!changePassword)}
                                        >
                                            Đổi mật khẩu
                                        </td>
                                    </tr>
                                    {changePassword && (
                                        <>
                                            <tr>
                                                <td className="w-1/6">Mật khẩu cũ:</td>
                                                <td className="">
                                                    <TextField className="w-4/5" size="small" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-1/6">Mật khẩu mới:</td>
                                                <td className="">
                                                    <TextField
                                                        className="input w-4/5"
                                                        size="small"
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                    <tr>
                                        <td></td>
                                        <td>
                                            <Button
                                                type="submit"
                                                className="bg-blue-500 text-white py-2 my-3"
                                            >
                                                Cập nhật
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ProfilePage;

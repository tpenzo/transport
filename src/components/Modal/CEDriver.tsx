'use client';
import { Box, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import CommonModal from '../common/CommonModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { checkImage, uploadIMG } from '@/utils/upload';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

interface CECarProps {
    isEdit?: Boolean;
    driverEdit?: any;
}

const CEDriver = ({ isEdit = false, driverEdit }: CECarProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // Set image user with role driver
    const [fileImgAvatar, setFileImgAvatar] = useState(null);
    const [fileImgAvatarUrl, setFileImgAvatarUrl] = useState('');

    const handleInputChange = (event: any) => {
        const err = checkImage(event.target.files[0]);
        if (!err) {
            setFileImgAvatarUrl(URL.createObjectURL(event.target.files[0]));
            setFileImgAvatar(event.target.files[0]);
        } else {
        }
    };

    const handleResertImgAvatar = () => {
        setFileImgAvatar(null);
        setFileImgAvatarUrl('');
    };

    // Set image Driver License
    const [fileImgDriverLicense, setFileImgDriverLicense] = useState(null);
    const [fileImgDriverLicenseUrl, setFileImgDriverLicenseUrl] = useState('');

    const handleInputChangeDriverLicense = (event: any) => {
        const err = checkImage(event.target.files[0]);
        if (!err) {
            setFileImgDriverLicenseUrl(URL.createObjectURL(event.target.files[0]));
            setFileImgDriverLicense(event.target.files[0]);
        } else {
        }
    };

    const handleResertDriverLicense = () => {
        setFileImgDriverLicense(null);
        setFileImgDriverLicenseUrl('');
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            url_avatar: '',
            // For DRIVER
            driver_license: '',
            driver_license_class: '',
            expiration_date: '',
            image_driver_license: '',
        },
        onSubmit: async (values) => {
            try {
                let urlImgAvatarDriver = '';
                if (fileImgAvatar) {
                    urlImgAvatarDriver = (await uploadIMG(fileImgAvatar)) as any;
                }
                let urlImgDriverLicense = '';
                if (fileImgDriverLicense) {
                    urlImgDriverLicense = (await uploadIMG(fileImgDriverLicense)) as any;
                }
                const data = {
                    ...values,
                    url_avatar: urlImgAvatarDriver,
                    image_driver_license: urlImgDriverLicense,
                };
                const res = await axiosClient.post('/api/user/driver', data);
                toast((res.data as { message: string }).message);
            } catch (error: any) {
                toast.error((error.data as { message: string }).message);
            }
        },
    });

    const handleAdd = () => {
        formik.handleSubmit();
    };

    const handleClose = () => {};

    return (
        <CommonModal
            handleSubmit={handleAdd}
            handleClose={handleClose}
            modalBtnText={isEdit ? '' : 'Thêm mới'}
            modalBtnIcon={isEdit ? <EditIcon /> : <AddCircleIcon />}
            modalTitle={isEdit ? 'Chỉnh sửa' : 'Thêm mới'}
            modalWidth="w-[700px]"
            modalHeight="h-[800px]"
            actConfirmColor="bg-red-500"
        >
            <Stack spacing={2} className="h-[650px] overflow-y-auto">
                <Box className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <Box className="flex space-x-2 mb-5">
                        <PersonOutlineOutlinedIcon />
                        <Typography className="font-bold">Thông tin cá nhân</Typography>
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
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box className="mt-3 space-y-3 w-full">
                        <Typography className="ml-2">Hình ảnh</Typography>
                        <Box className="space-y-3 w-full">
                            <Box className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                                >
                                    <Box className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <CloudUploadIcon />
                                        <Typography className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span>{' '}
                                            or drag and drop
                                        </Typography>
                                        <Typography className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        name="fileImgAvatar"
                                        onChange={(e: any) => handleInputChange(e)}
                                    />
                                </label>
                            </Box>
                            {fileImgAvatarUrl && (
                                <Box className="w-full p-3 flex items-center justify-between bg-gray-300 rounded">
                                    <Box className="flex space-x-3 items-center">
                                        <Image
                                            src={fileImgAvatarUrl}
                                            alt=""
                                            width={70}
                                            height={70}
                                        />
                                        {/* <Typography>{fileImgMerchandise?.name as any}</Typography> */}
                                    </Box>
                                    <Box onClick={handleResertImgAvatar}>
                                        <CloseIcon />
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
                <Box className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <Box className="flex space-x-2 mb-5">
                        <ContentPasteIcon />
                        <Typography className="font-bold">Giấy phép lái xe</Typography>
                    </Box>
                    <TextField
                        name="driver_license"
                        margin="normal"
                        fullWidth
                        id="driver_license"
                        label="Số giấy phép"
                        autoComplete="driver_license"
                        autoFocus
                        required
                        value={formik.values.driver_license}
                        onChange={formik.handleChange}
                    />
                    <Box className="mt-5 flex justify-between space-x-3">
                        <TextField
                            name="driver_license_class"
                            fullWidth
                            id="driver_license_class"
                            label="Hạng bằng"
                            autoComplete="driver_license_class"
                            required
                            value={formik.values.driver_license_class}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            type="date"
                            name="expiration_date"
                            fullWidth
                            id="expiration_date"
                            autoComplete="expiration_date"
                            required
                            value={formik.values.expiration_date}
                            onChange={formik.handleChange}
                        />
                    </Box>
                    <Box className="mt-3 space-y-3 w-full">
                        <Typography className="ml-2">Hình ảnh</Typography>
                        <Box className="space-y-3 w-full">
                            <Box className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="dropzone-filea"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                                >
                                    <Box className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <CloudUploadIcon />
                                        <Typography className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span>{' '}
                                            or drag and drop
                                        </Typography>
                                        <Typography className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id="dropzone-filea"
                                        type="file"
                                        className="hidden"
                                        name="fileImgDriverLicense"
                                        onChange={(e: any) => handleInputChangeDriverLicense(e)}
                                    />
                                </label>
                            </Box>
                            {fileImgDriverLicenseUrl && (
                                <Box className="w-full p-3 flex items-center justify-between bg-gray-300 rounded">
                                    <Box className="flex space-x-3 items-center">
                                        <Image
                                            src={fileImgDriverLicenseUrl}
                                            alt=""
                                            width={70}
                                            height={70}
                                        />
                                        {/* <Typography>{fileImgMerchandise?.name as any}</Typography> */}
                                    </Box>
                                    <Box onClick={handleResertDriverLicense}>
                                        <CloseIcon />
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Stack>
        </CommonModal>
    );
};

export default CEDriver;

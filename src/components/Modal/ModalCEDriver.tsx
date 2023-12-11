import {
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { checkImage, uploadIMG } from '@/utils/upload';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Image from 'next/image';
import Loading from '../common/Loading';

interface ModalCEDriverProps {
    isEdit?: Boolean;
    driverEdit?: any;
    close: any;
    handleRefresh: any;
}

const initialValues = {
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
};

const ModalCEDriver = ({
    isEdit = false,
    driverEdit,
    close,
    handleRefresh,
}: ModalCEDriverProps) => {
    const [isLoading, setIsLoading] = useState(false);
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

    useEffect(() => {
        if (isEdit) {
            setFileImgAvatarUrl(driverEdit?.url_avatar);
            setFileImgDriverLicenseUrl(driverEdit?.image_driver_license);
        }
    }, []);

    const handleResertDriverLicense = () => {
        setFileImgDriverLicense(null);
        setFileImgDriverLicenseUrl('');
    };

    const formik = useFormik({
        initialValues: isEdit ? driverEdit : initialValues,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                let url = {
                    urlImgAvatarDriver: '',
                    urlImgDriverLicense: '',
                };
                if (fileImgAvatar) {
                    url.urlImgAvatarDriver = (await uploadIMG(fileImgAvatar)) as any;
                }
                if (fileImgDriverLicense) {
                    url.urlImgDriverLicense = (await uploadIMG(fileImgDriverLicense)) as any;
                }
                if (isEdit) {
                    const res = await axiosClient.put(`/api/user/driver/${values._id}`, {
                        ...values,
                        url_avatar: fileImgAvatar ? url.urlImgAvatarDriver : values.url_avatar,
                        image_driver_license: fileImgDriverLicense
                            ? url.urlImgDriverLicense
                            : values.image_driver_license,
                    });
                    setIsLoading(false);
                    handleClose();
                    toast(res.data.message);
                } else {
                    const res = await axiosClient.post('/api/user/driver', {
                        ...values,
                        url_avatar: url.urlImgAvatarDriver,
                        image_driver_license: url.urlImgDriverLicense,
                    });
                    setIsLoading(false);
                    handleClose();
                    toast(res.data.message);
                }
            } catch (error: any) {
                toast.error((error.data as { message: string }).message);
                setIsLoading(false);
            }
        },
    });

    const handleAdd = () => {
        formik.handleSubmit();
        handleRefresh();
    };

    const handleClose = () => {
        close();
    };

    return (
        <>
            {isLoading && <Loading />}
            <Box className="fixed top-0 left-0 w-full h-full bg-[#0008] z-[49] overflow-auto flex items-center justify-center">
                <Box className="bg-white px-[20px] py-[5px] rounded-lg w-[1000px] m-auto">
                    <Stack
                        className="my-2 modal-header"
                        justifyContent="space-between"
                        alignItems="center"
                        direction="row"
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            className="font-bold"
                        >
                            {isEdit ? 'Chỉnh sửa' : 'Thêm mới'}
                        </Typography>
                        <IconButton aria-label="close-modal" onClick={handleClose}>
                            <CloseIcon className="cursor-pointer"></CloseIcon>
                        </IconButton>
                    </Stack>
                    <Divider></Divider>
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
                                                    <span className="font-semibold">
                                                        Click to upload
                                                    </span>{' '}
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
                                                    <span className="font-semibold">
                                                        Click to upload
                                                    </span>{' '}
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
                                                onChange={(e: any) =>
                                                    handleInputChangeDriverLicense(e)
                                                }
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
                    <Stack
                        spacing={1}
                        direction="row"
                        justifyContent={{ xs: 'space-between', lg: 'flex-end' }}
                        className="my-5"
                    >
                        <Button variant="contained" color="primary" onClick={handleAdd}>
                            Xác nhận
                        </Button>
                        <Button variant="contained" color="inherit" onClick={handleClose}>
                            Đóng
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default ModalCEDriver;

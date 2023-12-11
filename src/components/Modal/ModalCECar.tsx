import {
    Box,
    Button,
    Divider,
    FormControl,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Theme, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { checkImage, uploadIMG } from '@/utils/upload';
import axiosClient from '@/lib/axiosClient';
import { useFormik } from 'formik';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Loading from '../common/Loading';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, carTypeSelected: any, theme: Theme) {
    return {
        fontWeight: carTypeSelected?.name
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

interface CECarProps {
    isEdit?: Boolean;
    carEdit?: any;
    close: any;
    handleRefresh?: any;
}

const initialValues = {
    license_plate: '',
    make: '',
    vehicle_type: '',
    image_url: '',
    description: '',
};

const ModalCECar = ({ isEdit = false, carEdit, handleRefresh, close }: CECarProps) => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [carTypeList, setCarTypeList] = useState([]);

    const [carTypeSelected, setCarTypeSelected] = useState({
        name: '',
        _id: '',
    });

    // Set image merchandise
    const [fileImgCar, setFileImgCar] = useState(null);
    const [fileImgCarUrl, setFileImgCarUrl] = useState('');

    const handleInputChange = (event: any) => {
        const err = checkImage(event.target.files[0]);
        if (!err) {
            setFileImgCarUrl(URL.createObjectURL(event.target.files[0]));
            setFileImgCar(event.target.files[0]);
        } else {
        }
    };

    const handleResertImgCar = () => {
        setFileImgCar(null);
        setFileImgCarUrl('');
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosClient(`http://localhost:3000/api/car-type`);
            setCarTypeList((await res.data) as any);
        };
        fetchData();
        if (isEdit) {
            setCarTypeSelected(carEdit?.vehicle_type);
            setFileImgCarUrl(carEdit?.image_url);
        }
    }, []);

    const handleChange = (event: SelectChangeEvent<typeof carTypeSelected>) => {
        const {
            target: { value },
        } = event;
        setCarTypeSelected(value as any);
    };

    const formik = useFormik({
        initialValues: isEdit ? carEdit : initialValues,
        onSubmit: async (values, { setValues }) => {
            try {
                setIsLoading(true);
                // Upload image for car when create new car or change image when edit
                let url = '';
                if (fileImgCar) {
                    url = (await uploadIMG(fileImgCar)) as any;
                }
                if (isEdit) {
                    const res = await axiosClient.post(`/api/car/${carEdit._id}`, {
                        ...values,
                        vehicle_type: carTypeSelected._id,
                        image_url: fileImgCar ? url : values.image_url,
                    });
                    setIsLoading(false);
                    handleClose();
                    toast(res.data.message);
                } else {
                    const res = await axiosClient.post(`/api/car`, {
                        ...values,
                        vehicle_type: carTypeSelected._id,
                        image_url: url,
                    });
                    setIsLoading(false);
                    handleClose();
                    toast(res.data.message);
                }
                // Clean data
                setValues(initialValues);
            } catch (error) {
                setIsLoading(false);
            }
        },
    });

    const handleSubmit = async () => {
        await formik.handleSubmit();
        handleRefresh();
    };

    const handleClose = () => {
        close();
    };

    return (
        <>
            {isLoading && <Loading />}
            <Box className="fixed top-0 left-0 w-full h-full bg-[#0008] z-[49] overflow-auto flex items-center justify-center">
                <Box className="bg-white px-[20px] py-[5px] rounded-lg w-[600px] m-auto">
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
                    <Stack spacing={2} className="mt-3">
                        <Box className="space-y-3 w-full">
                            <Typography>Biển số xe</Typography>
                            <TextField
                                fullWidth
                                placeholder="Nhập biển số"
                                name="license_plate"
                                value={formik.values.license_plate}
                                onChange={formik.handleChange}
                            />
                        </Box>
                        <Box className="space-y-3 w-full">
                            <Typography>Nhãn hiệu</Typography>
                            <TextField
                                fullWidth
                                placeholder="Nhập nhãn hiệu xe"
                                name="make"
                                value={formik.values.make}
                                onChange={formik.handleChange}
                            />
                        </Box>
                        <Box className="space-y-3 w-full">
                            <Typography>Loại xe</Typography>
                            <FormControl className="w-full">
                                <Select
                                    value={carTypeSelected}
                                    onChange={handleChange}
                                    MenuProps={MenuProps}
                                >
                                    {carTypeList.map((carType: any) => (
                                        <MenuItem
                                            value={carType}
                                            style={getStyles(carType, carTypeSelected, theme)}
                                        >
                                            {carType.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className="space-y-3 w-full">
                            <Typography>Mô tả</Typography>
                            <Box>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    size="small"
                                    placeholder="Mô tả xe"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                            </Box>
                        </Box>
                        <Box className="space-y-3 w-full">
                            <Typography>Ảnh minh hoạ</Typography>
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
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                </Box>
                                {fileImgCarUrl && (
                                    <Box className="w-full p-3 flex items-center justify-between bg-gray-300 rounded">
                                        <Box className="flex space-x-3 items-center">
                                            <Image
                                                src={fileImgCarUrl}
                                                alt=""
                                                width={70}
                                                height={70}
                                            />
                                            {/* <Typography>{fileImgMerchandise?.name as any}</Typography> */}
                                        </Box>
                                        <Box onClick={handleResertImgCar}>
                                            <CloseIcon />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Stack>
                    <Stack
                        spacing={1}
                        direction="row"
                        justifyContent={{ xs: 'space-between', lg: 'flex-end' }}
                        className="my-5"
                    >
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
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

export default ModalCECar;

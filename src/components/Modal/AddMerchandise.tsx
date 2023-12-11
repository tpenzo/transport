'use client';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';
import CommonModal from '../common/CommonModal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { checkImage, uploadIMG } from '@/utils/upload';
import CloseIcon from '@mui/icons-material/Close';

interface Merchandise {
    _id: string;
    name: string;
    type: string;
    image: '';
}

const initMerchandise = {
    name: '',
    type: '',
    note: '',
    image: '',
};

interface AddMerchandiseProps {
    merchandiseIds: any;
    setMerchandiseIds: any;
}

const AddMerchandise = ({ merchandiseIds, setMerchandiseIds }: AddMerchandiseProps) => {
    const [merchandiseList, setMerchandiseList] = useState<Array<Merchandise>>([]);
    const [merchandise, setMerchandise] = useState(initMerchandise);

    // Set image merchandise
    const [fileImgMerchandise, setFileImgMerchandise] = useState(null);
    const [imgMerchandiserUrl, setImgMerchandiserUrl] = useState('');

    const handleInputChange = (event: any) => {
        const err = checkImage(event.target.files[0]);
        if (!err) {
            setImgMerchandiserUrl(URL.createObjectURL(event.target.files[0]));
            setFileImgMerchandise(event.target.files[0]);
        } else {
        }
    };

    const handleResertImgMerchandise = () => {
        setFileImgMerchandise(null);
        setImgMerchandiserUrl('');
    };

    // For edit
    useEffect(() => {
        if (merchandiseIds.length !== 0) {
            const fetchData = async () => {
                const res = await axiosClient.post(
                    'http://localhost:3000/api/merchandise/list',
                    merchandiseIds,
                );
                console.log(res.data);
                setMerchandiseList(res.data);
            };
            fetchData();
        }
    }, [merchandiseIds]);

    const handleAdd = async () => {
        try {
            // Upload image merchandise
            let url = '';
            if (fileImgMerchandise) {
                url = (await uploadIMG(fileImgMerchandise)) as any;
            }
            const res = await axiosClient.post('/api/merchandise', { ...merchandise, image: url });

            toast(res.data.message);

            setMerchandiseList([...merchandiseList, res.data.data] as any);
            setMerchandiseIds([...merchandiseIds, res.data.data._id]);
        } catch (error: any) {
            toast.error((error.data as { message: string }).message);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await axiosClient.delete(`/api/merchandise/${id}`);

            toast(res.data.message);

            setMerchandiseList([...merchandiseList.filter((item) => item._id !== id)]);
            setMerchandiseIds([...merchandiseIds.filter((item: string) => item !== id)]);
        } catch (error: any) {
            toast.error((error.data as { message: string }).message);
        }
    };

    const handleClose = () => {
        setMerchandise(initMerchandise);
    };

    return (
        <>
            <Box className="p-3 flex justify-between items-center border border-gray-200 rounded">
                <Box>
                    <Typography>
                        Thêm chi tiết hàng hoá để kết nối với tài xế và xe phù hợp
                    </Typography>
                    <Typography className="text-[13px] text-gray-400">
                        Chọn Loại hàng vận chuyển, v.v.
                    </Typography>
                </Box>
                <Box>
                    <CommonModal
                        handleSubmit={handleAdd}
                        handleClose={handleClose}
                        modalBtnText="Thêm"
                        modalTitle="Thêm hàng hoá"
                        actConfirmColor="bg-red-500"
                        modalWidth="w-[750px]"
                    >
                        <Stack spacing={2} className="">
                            <Typography className="text-[15px] font-bold">
                                Thông tin hàng hoá
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Thông tin cơ bản"
                                size="medium"
                                value={merchandise.name}
                                name="name"
                                onChange={(e) =>
                                    setMerchandise({ ...merchandise, name: e.target.value })
                                }
                            />
                            <Typography className="text-[15px] font-bold">
                                Loại hàng vận chuyển
                            </Typography>
                            <Box>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Thực phẩm & đồ uống"
                                                    checked={
                                                        merchandise.type === 'Thực phẩm & đồ uống'
                                                    }
                                                    onChange={(e) =>
                                                        setMerchandise({
                                                            ...merchandise,
                                                            type: e.target.value,
                                                        })
                                                    }
                                                />
                                            }
                                            label="Thực phẩm & đồ uống"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Đồ điện tử"
                                                    checked={merchandise.type === 'Đồ điện tử'}
                                                    onChange={(e) =>
                                                        setMerchandise({
                                                            ...merchandise,
                                                            type: e.target.value,
                                                        })
                                                    }
                                                />
                                            }
                                            label="Đồ điện tử"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Nguyên vật liệu / linh kiện"
                                                    checked={
                                                        merchandise.type ===
                                                        'Nguyên vật liệu / linh kiện'
                                                    }
                                                    onChange={(e) =>
                                                        setMerchandise({
                                                            ...merchandise,
                                                            type: e.target.value,
                                                        })
                                                    }
                                                />
                                            }
                                            label="Nguyên vật liệu / linh kiện"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Đồ gia dụng / nội thất"
                                                    checked={
                                                        merchandise.type ===
                                                        'Đồ gia dụng / nội thất'
                                                    }
                                                    onChange={(e) =>
                                                        setMerchandise({
                                                            ...merchandise,
                                                            type: e.target.value,
                                                        })
                                                    }
                                                />
                                            }
                                            label="Đồ gia dụng / nội thất"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Văn phòng phẩm"
                                                    checked={merchandise.type === 'Văn phòng phẩm'}
                                                    onChange={(e) =>
                                                        setMerchandise({
                                                            ...merchandise,
                                                            type: e.target.value,
                                                        })
                                                    }
                                                />
                                            }
                                            label="Văn phòng phẩm"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel control={<Checkbox />} label="Khác" />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Typography className="text-[15px] font-bold">
                                Hướng dẫn vận chuyển
                            </Typography>
                            <Box>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Hàng dễ vỡ"
                                                    checked={merchandise.note === 'Hàng dễ vỡ'}
                                                    onChange={(e) =>
                                                        setMerchandise({
                                                            ...merchandise,
                                                            note: e.target.value,
                                                        })
                                                    }
                                                />
                                            }
                                            label="Hàng dễ vỡ"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Cần nhiệt độ thích hợp"
                                                    checked={
                                                        merchandise.note ===
                                                        'Cần nhiệt độ thích hợp'
                                                    }
                                                    onChange={(e) =>
                                                        setMerchandise({
                                                            ...merchandise,
                                                            note: e.target.value,
                                                        })
                                                    }
                                                />
                                            }
                                            label="Cần nhiệt độ thích hợp"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Thực phẩm có mùi"
                                                    checked={
                                                        merchandise.note === 'Thực phẩm có mùi'
                                                    }
                                                    onChange={(e) =>
                                                        setMerchandise({
                                                            ...merchandise,
                                                            note: e.target.value,
                                                        })
                                                    }
                                                />
                                            }
                                            label="Thực phẩm có mùi"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Khác"
                                                    checked={merchandise.note === 'Khác'}
                                                    onChange={(e) =>
                                                        setMerchandise({
                                                            ...merchandise,
                                                            note: e.target.value,
                                                        })
                                                    }
                                                />
                                            }
                                            label="Khác"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Typography className="text-[15px] font-bold">Tải ảnh lên</Typography>
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
                                {imgMerchandiserUrl && (
                                    <Box className="w-full p-3 flex items-center justify-between bg-gray-300 rounded">
                                        <Box className="flex space-x-3 items-center">
                                            <Image
                                                src={imgMerchandiserUrl}
                                                alt=""
                                                width={70}
                                                height={70}
                                            />
                                            {/* <Typography>{fileImgMerchandise?.name as any}</Typography> */}
                                        </Box>
                                        <Box onClick={handleResertImgMerchandise}>
                                            <CloseIcon />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Stack>
                    </CommonModal>
                </Box>
            </Box>
            {merchandiseList.map((item) => (
                <Box
                    key={item._id}
                    className="flex justify-between border p-3 rounded shadow-md drop-shadow-2xl mb-2 mt-3"
                >
                    <Box className="flex space-x-4 items-center">
                        <Image src={item.image} alt="" width={70} height={70} />
                        <Box>
                            <Typography>{item.name}</Typography>
                            <Box>
                                <Typography className="text-[13px] text-gray-400">
                                    {item.type}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="space-x-2">
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={() => handleDelete(item._id)}
                        >
                            <DeleteIcon />
                        </Button>
                    </Box>
                </Box>
            ))}
        </>
    );
};

export default AddMerchandise;

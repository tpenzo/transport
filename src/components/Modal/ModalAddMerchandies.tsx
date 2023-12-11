import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Merchandise {
    _id: string;
    name: string;
    type: string;
    image: '';
}

const ModalAddMerchandies = () => {
    return (
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
                        Thêm hàng hoá
                    </Typography>
                    <IconButton aria-label="close-modal" onClick={handleClose}>
                        <CloseIcon className="cursor-pointer"></CloseIcon>
                    </IconButton>
                </Stack>
                <Divider></Divider>
                <Box className="h-[600px] overflow-y-auto">
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
                                                checked={merchandise.type === 'Thực phẩm & đồ uống'}
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
                                                    merchandise.type === 'Đồ gia dụng / nội thất'
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
                                                    merchandise.note === 'Cần nhiệt độ thích hợp'
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
                                                checked={merchandise.note === 'Thực phẩm có mùi'}
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
                </Box>
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
    );
};

export default ModalAddMerchandies;

import { Box, Stack, TextField, Typography } from '@mui/material';
import CommonModal from '../common/CommonModal';
import { useFormik } from 'formik';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
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

function getStyles(name: string, titleProlem: string[], theme: Theme) {
    return {
        fontWeight:
            titleProlem.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const titleProlemList = [
    'Nhận hàng trễ',
    'Trả hàng trễ',
    'Hỏng hóc hoặc mất mát hàng hoá',
    'Phát sinh chi phí không dự kiến',
    'Sự cố kỹ thuật',
    'Tai nạn giao thông',
    'Khác',
];

interface AddProlemProps {
    userId: string;
    orderId: string;
}

const AddProlem = ({ userId, orderId }: AddProlemProps) => {
    const theme = useTheme();
    const [titleProlem, setTitleProlem] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (event: SelectChangeEvent<typeof titleProlem>) => {
        const {
            target: { value },
        } = event;
        setTitleProlem(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const formik = useFormik({
        initialValues: {
            content: '',
        },
        onSubmit: async (values, { setValues }) => {
            try {
                setLoading(true);
                const data = {
                    user: userId,
                    order: orderId,
                    title: titleProlem[0],
                    content: values.content,
                };
                const res = await axios.post(`http://localhost:3000/api/prolem`, data);
                setValues({
                    content: '',
                });
                setTitleProlem([]);
                setLoading(false);
                toast(res?.data.message);
            } catch (error) {
                setLoading(false);
            }
        },
    });

    const handleClose = () => {
        setTitleProlem([]);
        formik.setValues({
            content: '',
        });
    };

    const handleSubmit = () => {
        formik.handleSubmit();
    };

    return (
        <>
            {loading && <Loading />}
            <CommonModal
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                modalBtnText="Gửi phản hồi"
                modalTitle="Phản hồi"
                className="bg-red-500 text-[white]"
                modalWidth="w-[500px]"
                actConfirmColor="bg-red-500"
            >
                <Stack spacing={2}>
                    <Box className="">
                        <Box>
                            <Box className="mb-3 pb-3 flex items-center space-x-2">
                                <NoteAltOutlinedIcon />
                                <Typography>Loại sự cố</Typography>
                            </Box>
                            <FormControl className="w-full">
                                <InputLabel id="demo-multiple-name-label">Loại</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    value={titleProlem}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                >
                                    {titleProlemList.map((prolem) => (
                                        <MenuItem
                                            key={prolem}
                                            value={prolem}
                                            style={getStyles(prolem, titleProlem, theme)}
                                        >
                                            {prolem}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className="mt-5">
                            <Box className="mb-3 pb-3 flex items-center space-x-2">
                                <NoteAltOutlinedIcon />
                                <Typography className="font-bold">Nội dung</Typography>
                            </Box>
                            <Box>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    minRows={10}
                                    size="small"
                                    placeholder="Nội dung phản hồi"
                                    name="content"
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </CommonModal>
        </>
    );
};

export default AddProlem;

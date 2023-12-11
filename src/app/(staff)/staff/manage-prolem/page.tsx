'use client';
import { Avatar, Box, Button, Grid, Pagination, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import axiosClient from '@/lib/axiosClient';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import notFoundOrder from '../../../../../public/no_order.jpg';

const Manage: NextPage = () => {
    const [prolemList, setProlemList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const handlePageChange = (event: any, value: any) => {
        setPage(value);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(
                    `http://localhost:3000/api/prolem?page=${page}&limit=${8}`,
                );
                setProlemList(res.data.prolemList);
                setTotalCount(res.data.totalCount);
            } catch (error) {
                return [];
            }
        };
        getData();
    }, [page]);

    const pageCount = Math.ceil(totalCount / 8);

    return (
        <Box className="p-4 h-[100vh]">
            <Box className="flex space-x-2 mt-3 h-[40px] border-b bprolem-gray-200">
                <MenuIcon />
                <Typography className="font-bold">QUẢN LÝ SỰ CỐ</Typography>
            </Box>
            <Grid className="mt-5" container columnGap={1} rowGap={1}>
                {prolemList?.length === 0 && (
                    <Grid item xs={12}>
                        <Box className="flex justify-center items-center">
                            <Box className="mt-7">
                                <Image src={notFoundOrder} height={400} width={400} alt="" />
                                <Box className="mt-5">
                                    <Typography className="font-bold">
                                        Hiện tại không có sự cố nào!
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                )}
                {prolemList.map((item: any, index: any) => (
                    <Grid item xs={2.9} key={index}>
                        <Box className="h-[405px] p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <Box className="flex items-center space-x-2">
                                <Avatar
                                    src={item.user?.url_avatar}
                                    sx={{ width: 56, height: 56 }}
                                ></Avatar>
                                <Box>
                                    <Typography className="text-orange-600 font-bold">{`${item?.user?.firstName} ${item?.user?.lastName}`}</Typography>
                                    <Link href="/profile">
                                        <span className="text-slate-600 text-xs hover:underline">
                                            {moment(item.createdAt).format('DD/MM/YYYY')}
                                        </span>
                                    </Link>
                                </Box>
                            </Box>
                            <Box className="mt-4">
                                <Box className="flex space-x-1">
                                    <SellOutlinedIcon />
                                    <Typography>
                                        Mã đơn hàng:{' '}
                                        <span className="text-blue-400">{item.order.code}</span>
                                    </Typography>
                                </Box>
                                <Box className="my-3 flex space-x-1">
                                    <BookmarkBorderIcon />
                                    <Typography>Loại: {item.title}</Typography>
                                </Box>
                                <Box className="flex space-x-1 break-words">
                                    <ContentPasteIcon />
                                    <Typography>Nội dung:</Typography>
                                </Box>
                                <Box className="mt-2">
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        minRows={5}
                                        value={item.content}
                                        size="small"
                                        name="content"
                                    />
                                </Box>
                            </Box>
                            <Box className="flex justify-end space-x-1 mt-3">
                                <Button type="button" color="error" variant="outlined">
                                    Xoá
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box>
                {prolemList.length !== 0 && (
                    <Box className="flex justify-center mt-3">
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Manage;

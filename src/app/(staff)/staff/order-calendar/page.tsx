'use client';
import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CalendarComponent from '@/components/common/Calendar';

const Manage: NextPage = () => {
    const [calendarList, setCalendarList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/api/calendar`);
            let data = await res.json();
            // format data
            data = data.map((item: any) => {
                const newItem = {
                    ...item,
                    start: new Date(item?.start),
                    end: new Date(item?.end),
                };
                return newItem;
            });
            setCalendarList(data);
        };
        fetchData();
    }, []);

    return (
        <Box className="p-4 h-[100vh]">
            <Box className="flex space-x-2 mt-3 h-[40px] border-b bprolem-gray-200">
                <MenuIcon />
                <Typography className="font-bold">LỊCH PHÂN CÔNG</Typography>
            </Box>
            <Box className="mt-4">
                <CalendarComponent events={calendarList} />
            </Box>
        </Box>
    );
};

export default Manage;

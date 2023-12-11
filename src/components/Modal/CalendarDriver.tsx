import { Box, Stack } from '@mui/material';
import { NextPage } from 'next';
import CommonModal from '../common/CommonModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarComponent from '../common/Calendar';
import { useEffect, useState } from 'react';

interface CalendarDriverProps {
    idDriver: string;
}

const CalendarDriver = ({ idDriver }: CalendarDriverProps) => {
    const [calendarList, setCalendarList] = useState([]);
    const handleClose = () => {};

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/api/calendar?driver=${idDriver}`);
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
        <CommonModal
            handleClose={handleClose}
            modalBtnIcon={<VisibilityIcon />}
            modalTitle="Lịch phân công"
            actConfirmColor="bg-red-500"
            modalWidth="w-[1000px]"
            ishowInfo={true}
        >
            <Stack spacing={2} className="">
                <CalendarComponent events={calendarList} />
            </Stack>
        </CommonModal>
    );
};

export default CalendarDriver;

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events }: { events: any }) => {
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [open, setOpen] = useState(false);

    const handleSelectEvent = (event: any) => {
        setSelectedTitle(event.title);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                titleAccessor="title"
                endAccessor="end"
                selectable
                style={{ margin: 10, height: 500 }}
                views={['month', 'week', 'day']}
                onSelectEvent={handleSelectEvent}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>{selectedTitle}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CalendarComponent;

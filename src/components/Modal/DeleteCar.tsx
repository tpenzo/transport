import { Button, Stack, Typography } from '@mui/material';
import CommonModal from '../common/CommonModal';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';

interface DeleteCarProps {
    _id: string;
    licensePlate: string;
    needsRefresh?: any;
    setNeedsRefresh?: any;
}

const DeleteCar = ({ _id, licensePlate, needsRefresh, setNeedsRefresh }: DeleteCarProps) => {
    const handleClose = async () => {};

    const handleSubmit = async () => {
        const res = await axiosClient.delete(`/api/car/${_id}`);
        toast(res.data.message);
        setNeedsRefresh(!needsRefresh);
    };

    return (
        <CommonModal
            handleClose={handleClose}
            modalBtnIcon={<DeleteIcon color="error" />}
            modalTitle="Xoá xe"
            actConfirmColor="bg-red-500"
            handleSubmit={handleSubmit}
        >
            <Stack spacing={2} className="">
                <Typography>Bạn có muốn xoá xe: {licensePlate}</Typography>
            </Stack>
        </CommonModal>
    );
};

export default DeleteCar;

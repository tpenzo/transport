import { Stack, Typography } from '@mui/material';
import CommonModal from '../common/CommonModal';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';

interface DeleteOrderProps {
    _id: string;
    code: string;
}

const DeleteOrder = ({ _id, code }: DeleteOrderProps) => {
    const handleClose = () => {};

    const handleSubmit = async () => {
        const res = await axiosClient.delete(`http://localhost:3000/api/order/${_id}`);
        toast((res.data as { message: string }).message);
    };

    return (
        <CommonModal
            handleClose={handleClose}
            modalBtnIcon={<DeleteIcon />}
            modalTitle="Xoá đơn hàng"
            actConfirmColor="bg-red-500"
            handleSubmit={handleSubmit}
        >
            <Stack spacing={2} className="">
                <Typography>Bạn có muốn xoá đơn hàng: {code}</Typography>
            </Stack>
        </CommonModal>
    );
};

export default DeleteOrder;

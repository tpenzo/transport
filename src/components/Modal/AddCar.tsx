'use client';
import { Box, Stack, TextField, Typography } from '@mui/material';
import CommonModal from '../common/CommonModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import iconXe from '../../../public/iconXe.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CalendarCar from './CalendarCar';
import axiosClient from '@/lib/axiosClient';

interface AddCarProps {
    vehicleTypeId: string;
    setCarSelected: any;
}

const AddCar = ({ vehicleTypeId, setCarSelected }: AddCarProps) => {
    const [carList, setCarList] = useState([]);
    const [car, setCar] = useState<any>({});
    const [searchCar, setSearchCar] = useState('');

    console.log(vehicleTypeId);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosClient(
                `http://localhost:3000/api/car/asigncar?type=${vehicleTypeId}&search=${searchCar}`,
            );
            setCarList(res?.data.carList);
        };
        fetchData();
    }, [vehicleTypeId, searchCar]);

    const handleAdd = () => {
        toast('Thêm thành công');
        setCarSelected(car);
    };

    const handleClose = () => {
        // setCarSelected({});
    };

    return (
        <CommonModal
            handleSubmit={handleAdd}
            handleClose={handleClose}
            modalBtnText="Thêm xe"
            modalBtnIcon={<AddCircleIcon />}
            modalTitle="Thêm xe"
            actConfirmColor="bg-red-500"
            modalWidth="w-[750px]"
            modalHeight="h-[620px]"
        >
            <Stack spacing={2} className="">
                <TextField
                    placeholder="Tìm kiếm"
                    value={searchCar}
                    name="searchCar"
                    onChange={(e: any) => setSearchCar(e.target.value)}
                />
                <Box className="h-[400px] overflow-y-auto">
                    {carList.map((item: any, index) => (
                        <Box
                            key={index}
                            className={`p-3 mb-2 rounded flex space-x-3 justify-between items-center cursor-pointer border ${
                                car?._id === item?._id
                                    ? 'border-[2px] border-red-500'
                                    : 'border border-gray-300'
                            }`}
                            onClick={() => setCar(item)}
                        >
                            <Box className="flex space-x-3 items-center">
                                <Image src={item?.image_url} alt="" width={50} height={50} />
                                <Box>
                                    {/* <Typography>Loại xe: 2 tấn</Typography> */}
                                    <Typography>Biển số: {item?.license_plate}</Typography>
                                    <Typography>Nhãn hiệu: {item?.make}</Typography>
                                    {/* <Typography className="text-[12px]">
                                        Trạng thái:{' '}
                                        {item?.status === 'EMPTY' ? (
                                            <span className="text-[green]">chưa sử dụng</span>
                                        ) : (
                                            <span>đang sử dụng</span>
                                        )}
                                    </Typography> */}
                                </Box>
                            </Box>
                            <Box>
                                <CalendarCar idCar={item?._id} />
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box></Box>
            </Stack>
        </CommonModal>
    );
};

export default AddCar;

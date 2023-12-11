'use client';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image';
import { useState } from 'react';
import ModalDeleteCar from '../Modal/ModalDeleteCar';
import ModalCECar from '../Modal/ModalCECar';
import RefreshIcon from '@mui/icons-material/Refresh';

interface TableCarProps {
    carList: any;
    handleRefresh: any;
}
const TableCar = ({ carList, handleRefresh }: TableCarProps) => {
    const [carSelected, setCarSelected] = useState({
        _id: '',
        license_plate: '',
    });
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleEdit = (car: any) => {
        setCarSelected(car);
        setIsEdit(true);
    };

    const handleDelete = (order: any) => {
        setCarSelected(order);
        setIsDelete(true);
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <Box className="flex space-x-1 items-center">
                                    <Box onClick={() => handleRefresh()}>
                                        <RefreshIcon />
                                    </Box>
                                    <span className="ml-1">Biển số</span>
                                </Box>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hình ảnh
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nhãn hiệu
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Loại xe
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trọng tải
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kích thước hàng hoá
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Đặc điểm
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {carList.map((item: any, index: any) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {item?.license_plate}
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <Image src={item.image_url} alt="" width={70} height={70} />
                                </th>
                                <td className="px-6 py-4">{item?.make}</td>
                                <td className="px-6 py-4">{item.vehicle_type.name}</td>
                                <td className="px-6 py-4">{item.vehicle_type.maximum_load}</td>
                                <td className="px-6 py-4">
                                    {item.vehicle_type.maximum_cargo_size}
                                </td>
                                <td className="px-6 py-4">{item.description}</td>
                                <td className="px-6 py-4">
                                    <Box className="flex gap-2">
                                        <Button
                                            type="button"
                                            color="warning"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            type="button"
                                            color="error"
                                            onClick={() => handleDelete(item)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isEdit && (
                <ModalCECar
                    isEdit={true}
                    carEdit={carSelected}
                    close={() => setIsEdit(!isEdit)}
                    handleRefresh={handleRefresh}
                />
            )}
            {isDelete && (
                <ModalDeleteCar
                    _id={carSelected?._id}
                    licensePlate={carSelected?.license_plate}
                    setIsDelete={setIsDelete}
                    handleRefresh={handleRefresh}
                />
            )}
        </>
    );
};

export default TableCar;

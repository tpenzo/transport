'use client';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import ModalDeleteDriver from '../Modal/ModalDeleteDriver';
import ModalCEDriver from '../Modal/ModalCEDriver';
import RefreshIcon from '@mui/icons-material/Refresh';

interface TableDriverProps {
    driverList: any;
    handleRefresh?: any;
}
const TableDriver = ({ driverList, handleRefresh }: TableDriverProps) => {
    const [driverSelected, setDriverSelected] = useState({
        _id: '',
        firstName: '',
        lastName: '',
    });

    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleEdit = (driver: any) => {
        setDriverSelected(driver);
        setIsEdit(true);
    };

    const handleDelete = (driver: any) => {
        setDriverSelected(driver);
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
                                    <span className="ml-1">Họ tên</span>
                                </Box>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số điện thoại
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số giấy phép
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hạng bằng
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ngày hết hạn
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {driverList.map((item: any, index: any) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4">{`${item?.firstName} ${item?.lastName}`}</td>
                                <td className="px-6 py-4">{item.phone}</td>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4">{item.driver_license}</td>
                                <td className="px-6 py-4">{item.driver_license_class}</td>
                                <td className="px-6 py-4">{item.expiration_date}</td>
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
                <ModalCEDriver
                    isEdit={true}
                    driverEdit={driverSelected}
                    close={() => setIsEdit(!isEdit)}
                    handleRefresh={handleRefresh}
                />
            )}
            {isDelete && (
                <ModalDeleteDriver
                    _id={driverSelected?._id}
                    fullName={`${driverSelected?.firstName} ${driverSelected?.lastName}`}
                    setIsDelete={setIsDelete}
                    handleRefresh={handleRefresh}
                />
            )}
        </>
    );
};

export default TableDriver;

'use client';
import { formatCurrency, nameDisplay, showStatusOrder } from '@/utils/FormatData';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import ModalEditOrder from '../Modal/ModalEditOrder';
import ModalDeleteOrder from '../Modal/ModalDeleteOrder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShowStatus from '../common/ShowStatus';
import RefreshIcon from '@mui/icons-material/Refresh';

interface TableOrderProps {
    orderList: any;
    needsRefresh?: any;
    setNeedsRefresh?: any;
}
const TableOrder = ({ orderList, needsRefresh, setNeedsRefresh }: TableOrderProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [orderSelected, setOrderSelected] = useState({
        _id: '',
        code: '',
    });

    const handleEdit = (order: any) => {
        setOrderSelected(order);
        setIsEdit(true);
    };

    const handleDelete = (order: any) => {
        setOrderSelected(order);
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
                                    <Box onClick={() => setNeedsRefresh(!needsRefresh)}>
                                        <RefreshIcon />
                                    </Box>
                                    <span className="ml-1">Mã</span>
                                </Box>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                KHÁCH HÀNG
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Loại xe
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Xe
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tài xế
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tổng tiền
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trạng thái
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map((item: any, index: any) => {
                            return (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item?.code}
                                    </th>
                                    <td className="px-6 py-4">
                                        {nameDisplay(
                                            item?.customer_id?.firstName,
                                            item?.customer_id?.lastName,
                                        )}
                                    </td>
                                    <td className="px-6 py-4">{item.vehicle_type.name}</td>
                                    <td className="px-6 py-4">
                                        {item?.car_id
                                            ? item?.car_id?.license_plate
                                            : 'Chưa phân công'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.driver_id
                                            ? nameDisplay(
                                                  item?.driver_id?.firstName,
                                                  item?.driver_id?.lastName,
                                              )
                                            : 'Chưa phân công'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatCurrency(item.total_payment)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <ShowStatus status={item?.status} />
                                    </td>
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
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {isEdit && (
                <ModalEditOrder
                    order={orderSelected}
                    setIsEdit={setIsEdit}
                    needsRefresh={needsRefresh}
                    setNeedsRefresh={setNeedsRefresh}
                />
            )}
            {isDelete && (
                <ModalDeleteOrder
                    _id={orderSelected?._id}
                    code={orderSelected?.code}
                    setIsDelete={setIsDelete}
                    needsRefresh={needsRefresh}
                    setNeedsRefresh={setNeedsRefresh}
                />
            )}
        </>
    );
};

export default TableOrder;

'use client';
import { NextPage } from 'next';

import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Button,
    Box,
    Checkbox,
    TablePagination,
    Typography,
    Stack,
} from '@mui/material';
import { useState } from 'react';
import EnhancedTable from './EnhancedTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CommonModal from './CommonModal';
import { formatCurrency, showStatusOrder } from '@/utils/FormatData';

const renderData = (key: string, value: any): React.ReactNode => {
    if (key === 'status') {
        return showStatusOrder(value[key]);
    }
    if (key === 'total_payment') {
        return formatCurrency(value[key]);
    }
    const parts = key.split('.');
    let fieldValue = value;
    for (const part of parts) {
        fieldValue = fieldValue[part];
    }

    return fieldValue;
};

interface Props {
    isEdit?: boolean;
    editModal?: React.ReactNode;
    labels: Array<string | React.ReactNode>;
    columns: Array<string>;
    data: any;
    titleModalDelete: string;
}

const TableCMS: NextPage<Props> = ({
    columns,
    data,
    labels,
    isEdit = false,
    editModal,
    titleModalDelete,
}) => {
    // For table pagination
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [page, setPage] = useState<number>(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // For select item
    const [selected, setSelected] = useState<readonly any[]>([]);

    const handleClick = (item: any) => {
        let newSelected = [...selected];
        if (newSelected.includes(item)) {
            newSelected = [...newSelected.filter((a) => a._id !== item._id)];
        } else {
            newSelected.push(item);
        }
        setSelected(newSelected);
        // Call func to handle here
    };

    const handleClickAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(data);
            return;
        }
        setSelected([]);
        // Call func to handle here
    };

    const isSelected = (item: any) => {
        return selected.includes(item);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTable numSelected={selected.length} />
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={
                                            selected.length > 0 && selected.length < data.length
                                        }
                                        checked={data.length > 0 && selected.length === data.length}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            handleClickAll(event)
                                        }
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                                {/* <TableCell>STT</TableCell> */}
                                {/* Dynamic name for column */}
                                {labels.map((column: any, index) => (
                                    <TableCell
                                        className="font-bold text-[13px]"
                                        key={index}
                                        align="justify"
                                    >
                                        {column}
                                    </TableCell>
                                ))}
                                {/* Action */}
                                <TableCell className="font-bold text-[13px]">THAO TÁC</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((datum: any, index: number) => {
                                const isItemSelected = isSelected(datum);
                                return (
                                    <TableRow
                                        key={index}
                                        hover
                                        role="checkbox"
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                onClick={() => handleClick(datum)}
                                            />
                                        </TableCell>
                                        {/* <TableCell>{index + 1}</TableCell> */}
                                        {/* Dynamic data */}
                                        {columns.map((header: string, index: number) => (
                                            <TableCell key={index}>
                                                {renderData(header, datum)}
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            <Box className="flex gap-2 ">
                                                {isEdit ? (
                                                    editModal ? (
                                                        editModal
                                                    ) : (
                                                        <Button className="flex text-white transition-all duration-300 bg-yellow-500 rounded hover:rounded-3xl hover:bg-yellow-600">
                                                            <EditIcon />
                                                        </Button>
                                                    )
                                                ) : (
                                                    <Button className="flex text-white transition-all duration-300 bg-blue-500 rounded hover:rounded-3xl hover:bg-vlue-600">
                                                        <VisibilityOutlinedIcon />
                                                    </Button>
                                                )}
                                                <CommonModal
                                                    modalBtnIcon={
                                                        <DeleteIcon className="items-center" />
                                                    }
                                                    modalTitle={titleModalDelete}
                                                    modalBtnColor="bg-red-500"
                                                    actConfirmColor="bg-red-500"
                                                >
                                                    <Stack spacing={2}>
                                                        <Typography>
                                                            Bạn có chắc chắn sẽ xóa nó?
                                                        </Typography>
                                                    </Stack>
                                                </CommonModal>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default TableCMS;

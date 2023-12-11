'use client';
import * as React from 'react';
import { NextPage } from 'next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

// With props xxxColor: passing value as: bg-[] or bg-primary-color (another color)
interface CommonModalProps {
    modalBtnIcon?: React.ReactNode;
    modalBtnText?: string;
    modalTitle: string;
    modalWidth?: string;
    modalHeight?: string;
    modalBtnColor?: string;
    isUseAction?: boolean;
    actConfirmColor?: string;
    actConfirmWidth?: string;
    className?: string;
    actConfirmVariant?: 'text' | 'outlined' | 'contained';
    actCloseColor?: string;
    actCloseWidth?: string;
    actCloseVariant?: 'text' | 'outlined' | 'contained';
    children: React.ReactNode;
    ishowInfo?: boolean;
    handleSubmit?: () => void;
    handleClose?: () => void;
}
const CommonModal: NextPage<CommonModalProps> = ({
    modalBtnIcon,
    modalBtnText = '',
    modalTitle,
    modalWidth = 'xs:w-[95vw] md:w-[400px]',
    modalHeight = '',
    modalBtnColor = 'bg-primary-color',
    isUseAction = true,
    actConfirmColor = 'bg-primary-color',
    actConfirmWidth = 'min-w-[120px]',
    actCloseColor,
    actCloseWidth = 'min-w-[120px]',
    actConfirmVariant = 'contained',
    actCloseVariant = 'outlined',
    ishowInfo = false,
    handleSubmit = () => {},
    handleClose = () => {},
    className = '',
    children,
    ...props
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const close = () => {
        handleClose();
        setOpen(false);
    };

    const submit = () => {
        handleSubmit();
        setOpen(false);
    };

    return (
        <Box>
            <Button onClick={handleOpen} variant="outlined" className={className}>
                {modalBtnIcon ? (
                    <Stack direction="row" alignItems="center">
                        {modalBtnIcon}
                        {modalBtnText && (
                            <Typography className="pl-2 pr-1 font-bold xs:text-sm md:text-base">
                                {modalBtnText}
                            </Typography>
                        )}
                    </Stack>
                ) : (
                    modalBtnText
                )}
            </Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="xs:w-full"
            >
                <Stack
                    className={`absolute px-4 pt-1 pb-4 -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-xl shadow-3xl ${modalWidth} ${modalHeight}`}
                >
                    <Stack
                        className="my-2 modal-header"
                        justifyContent="space-between"
                        alignItems="center"
                        direction="row"
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            className="font-bold"
                        >
                            {modalTitle}
                        </Typography>
                        <IconButton aria-label="close-modal" onClick={close}>
                            <CloseIcon className="cursor-pointer"></CloseIcon>
                        </IconButton>
                    </Stack>
                    <Divider></Divider>
                    <Box className="py-4 modal-content">{children}</Box>
                    {isUseAction && (
                        <Stack
                            spacing={1}
                            direction="row"
                            justifyContent={{ xs: 'space-between', lg: 'flex-end' }}
                            className="modal-action"
                        >
                            {!ishowInfo && (
                                <Button
                                    variant={actConfirmVariant}
                                    className={`${actConfirmColor} ${actConfirmWidth}`}
                                    onClick={submit}
                                >
                                    Xác nhận
                                </Button>
                            )}
                            <Button
                                variant={actCloseVariant}
                                onClick={close}
                                className={`${actCloseWidth} ${actCloseColor}`}
                            >
                                Đóng
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Modal>
        </Box>
    );
};

export default CommonModal;

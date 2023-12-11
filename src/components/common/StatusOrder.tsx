import { Box } from '@mui/material';
import wait from '../../../public/status/wait.svg';
import confirmed from '../../../public/status/confirmed.svg';
import pickup from '../../../public/status/pickup.svg';
import transport from '../../../public/status/transport.svg';
import returns from '../../../public/status/returns.svg';
import completed from '../../../public/status/completed.svg';
import Image from 'next/image';

interface StatusOrderProps {
    status: string;
}

const StatusOrder = ({ status }: StatusOrderProps) => {
    return (
        <Box>
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-center justify-center text-slate-400  fill-slate-400">
                    <Image src={wait} alt="" width={32} height={32} />
                    <p
                        className={
                            status === 'WAIT' ||
                            status === 'CONFIRMED' ||
                            status === 'PICKUP' ||
                            status === 'TRANSPORT' ||
                            status === 'RETURNS' ||
                            status === 'COMPLETED'
                                ? 'text-green-500 mt-1 text-[14px]'
                                : 'mt-1 text-[14px]'
                        }
                    >
                        Chờ xác nhận
                    </p>
                </div>
                <div
                    className={
                        status === 'WAIT' ||
                        status === 'CONFIRMED' ||
                        status === 'PICKUP' ||
                        status === 'TRANSPORT' ||
                        status === 'RETURNS' ||
                        status === 'COMPLETED'
                            ? 'w-16 border-t-2  border-green-400 mt-1 '
                            : 'w-16 border-t-2 border-slate-400 '
                    }
                ></div>
                <div className="flex flex-col items-center justify-center text-slate-400 fill-slate-400">
                    <Image src={completed} alt="" width={32} height={32} />
                    <p
                        className={
                            status === 'CONFIRMED' ||
                            status === 'PICKUP' ||
                            status === 'TRANSPORT' ||
                            status === 'RETURNS' ||
                            status === 'COMPLETED'
                                ? 'text-green-500 mt-1 text-[14px]'
                                : 'mt-1 text-[14px]'
                        }
                    >
                        Đã xác nhận
                    </p>
                </div>
                <div
                    className={
                        status === 'CONFIRMED' ||
                        status === 'PICKUP' ||
                        status === 'TRANSPORT' ||
                        status === 'RETURNS' ||
                        status === 'COMPLETED'
                            ? 'w-16 border-t-2  border-green-400 mt-1'
                            : 'w-16 border-t-2 border-slate-400  mt-1'
                    }
                ></div>
                <div className="flex flex-col items-center justify-center text-slate-400 fill-slate-400">
                    <Image src={pickup} alt="" width={32} height={32} />
                    <p
                        className={
                            status === 'PICKUP' ||
                            status === 'TRANSPORT' ||
                            status === 'RETURNS' ||
                            status === 'COMPLETED'
                                ? 'text-green-500 mt-1 text-[14px]'
                                : 'mt-1 text-[14px]'
                        }
                    >
                        Lấy hàng
                    </p>
                </div>
                <div
                    className={
                        status === 'PICKUP' ||
                        status === 'TRANSPORT' ||
                        status === 'RETURNS' ||
                        status === 'COMPLETED'
                            ? 'w-16 border-t-2  border-green-400 mt-1'
                            : 'w-16 border-t-2 border-slate-400  mt-1'
                    }
                ></div>
                <div className="flex flex-col items-center justify-center text-slate-400 fill-slate-400">
                    <Image src={transport} alt="" width={32} height={32} />
                    <p
                        className={
                            status === 'TRANSPORT' || status === 'RETURNS' || status === 'COMPLETED'
                                ? 'text-green-500 mt-1 text-[14px]'
                                : 'mt-1 text-[14px]'
                        }
                    >
                        Vận chuyển
                    </p>
                </div>
                <div
                    className={
                        status === 'TRANSPORT' || status === 'RETURNS' || status === 'COMPLETED'
                            ? 'w-16 border-t-2  border-green-400 mt-1'
                            : 'w-16 border-t-2 border-slate-400  mt-1'
                    }
                ></div>

                <div className="flex flex-col items-center justify-center text-slate-400 fill-slate-400">
                    <Image src={returns} alt="" width={32} height={32} />
                    <p
                        className={
                            status === 'RETURNS' || status === 'COMPLETED'
                                ? 'text-green-500 mt-1 text-[14px]'
                                : 'mt-1 text-[14px]'
                        }
                    >
                        Trả hàng
                    </p>
                </div>
                <div
                    className={
                        status === 'RETURNS' || status === 'COMPLETED'
                            ? 'w-16 border-t-2  border-green-400 mt-1'
                            : 'w-16 border-t-2 border-slate-400  mt-1'
                    }
                ></div>
                <div className="flex flex-col items-center justify-center text-slate-400 fill-slate-400">
                    <Image src={confirmed} alt="" width={32} height={32} />
                    <p
                        className={
                            status === 'COMPLETED'
                                ? 'text-green-500 mt-1 text-[14px]'
                                : 'mt-1 text-[14px]'
                        }
                    >
                        Hoàn thành
                    </p>
                </div>
            </div>
        </Box>
    );
};

export default StatusOrder;

import { showStatusOrder } from '@/utils/FormatData';

interface ShowStatusProps {
    status: any;
}

const ShowStatus = ({ status }: ShowStatusProps) => {
    return (
        <>
            {status == 'CONFIRMED' && (
                <span className="text-center align-baseline inline-flex px-3 py-2 mr-auto items-center font-semibold text-[.95rem] leading-none text-blue-500 bg-blue-100 rounded-lg">
                    {showStatusOrder(status)}
                </span>
            )}
            {(status === 'PICKUP' || status === 'TRANSPORT' || status === 'RETURNS') && (
                <span className="text-center align-baseline inline-flex px-3 py-2 mr-auto items-center font-semibold text-[.95rem] leading-none bg-gray-300 rounded-lg">
                    {showStatusOrder(status)}
                </span>
            )}
            {status == 'COMPLETED' && (
                <span className="text-center align-baseline inline-flex px-3 py-2 mr-auto items-center font-semibold text-[.95rem] leading-none text-green-500 bg-green-100 rounded-lg">
                    {showStatusOrder(status)}
                </span>
            )}
            {status == 'CANCEL' && (
                <span className="text-center align-baseline inline-flex px-3 py-2 mr-auto items-center font-semibold text-[.95rem] leading-none text-red-500 bg-red-100 rounded-lg">
                    {showStatusOrder(status)}
                </span>
            )}
        </>
    );
};

export default ShowStatus;

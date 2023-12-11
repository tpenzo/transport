import { NextPage } from 'next';

interface IconPathProps {
    d: string;
}

const IconPath: NextPage<IconPathProps> = ({ d }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d={d} />
        </svg>
    );
};

export default IconPath;

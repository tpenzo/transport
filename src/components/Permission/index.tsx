import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export const Permission = (users: Array<string>, WrappedComponent: any) => {
    return function ({ ...props }) {
        const Router = useRouter();

        const { user } = useSelector((state) => (state as any).auth);

        if (!user) {
            Router.push('/login');
            return null;
        }

        if (!users.includes(user.role)) {
            Router.push('/forbidden');
            return null;
        }
        return <WrappedComponent {...props} />;
    };
};

export const nameDisplay = (firstName: string, lastName: string): string => {
    return `${lastName} ${firstName}`;
};

export function formatCurrency(number: number) {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export function showStatusOrder(status: string) {
    switch (status) {
        case 'WAIT':
            return 'Chờ xác nhận';
        case 'CONFIRMED':
            return 'Xác nhận';
        case 'PICKUP':
            return 'Lấy hàng';
        case 'TRANSPORT':
            return 'Vận chuyển';
        case 'RETURNS':
            return 'Trả hàng';
        case 'COMPLETED':
            return 'Hoàn thành';
        default:
            return 'Huỷ';
    }
}

export function isEmptyObject(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

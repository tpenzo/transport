import { storage } from '../lib/firebase';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';

export const uploadIMG = async (image: any) => {
    try {
        const storageRef = ref(
            storage,
            `images/${image?.name + Math.floor(Math.random() * 10000)}`,
        );
        const uploadStask = await uploadBytesResumable(storageRef, image);
        const url = await getDownloadURL(uploadStask.ref);
        return url;
    } catch (error) {}
};

export const checkImage = (file: any) => {
    let err = '';
    if (!file) return (err = 'Tập tin không tồn tại');
    if (file.size > 1024 * 1024) {
        err = 'Kích thước hình ảnh lớn nhất là 1mb';
    }
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/avif')
        err = 'Định dạng hình ảnh không chính xác';
    return err;
};

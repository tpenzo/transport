import axios from 'axios';

const axiosClient = axios.create({
    headers: {
        'content-type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (req) => {
    // Get token
    return req;
});

axiosClient.interceptors.response.use(
    (response) => {
        // if (response && response.data) {
        //     return response.data;
        // }
        return response;
    },
    (error) => {
        throw error.response;
    },
);

export default axiosClient;

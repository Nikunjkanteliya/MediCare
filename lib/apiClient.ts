import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://conversion-engine-api.onrender.com';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 3000000, // 30s — render.com cold start can be slow
});

// Response interceptor: normalize errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Something went wrong. Please try again.';
        return Promise.reject(new Error(message));
    }
);

export default apiClient;

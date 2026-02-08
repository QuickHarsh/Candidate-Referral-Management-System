// specific config for API URL
const getApiUrl = () => {
    const url = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    return url.replace(/\/$/, ''); // Remove trailing slash if present
};

export const API_URL = getApiUrl();

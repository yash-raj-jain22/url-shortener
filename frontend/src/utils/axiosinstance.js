import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000,
});


// Response interceptor (Global Error Handler)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with a status code outside 2xx
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    console.error("Bad Request:", data?.message);
                    break;

                case 401:
                    console.error("Unauthorized. Please login again.");
                    // Example:
                    // localStorage.removeItem("token");
                    // window.location.href = "/login";
                    break;

                case 403:
                    console.error("Forbidden.");
                    break;

                case 404:
                    console.error("Resource not found.");
                    break;

                case 500:
                    console.error("Internal Server Error.");
                    break;

                default:
                    console.error(`Error ${status}:`, data?.message || data);
            }
        } else if (error.request) {
            // Request made but no response received
            console.error("Network Error: No response from server.");
        } else {
            // Something else happened
            console.error("Request Error:", error.message);
        }

        return Promise.reject({
            message: error.response?.data?.message || "An unexpected error occurred.",
            status: error.response?.status || null,
            data: error.response?.data || null,
        });
    }
);

export default axiosInstance;
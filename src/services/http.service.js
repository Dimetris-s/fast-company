import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log("Unexpected error");
            toast.error(error.response.message);
        }

        return Promise.reject(error);
    }
);

axios.defaults.baseURL = config.apiEndpoint;

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;

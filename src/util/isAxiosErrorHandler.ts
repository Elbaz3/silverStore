import { isAxiosError } from "axios"

const axiosErorrHandler = (error: unknown) => {
            if (isAxiosError(error)) {
            return error.response?.data || error.response?.data.message || error.message
         } else {
            return 'An unexpected error'
         }
}

export default axiosErorrHandler;
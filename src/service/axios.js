import axios from 'axios'
import router from '../router'

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
	timeout: 10000,
})

axiosInstance.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

axiosInstance.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if (error.response.status === 401) {
			localStorage.removeItem('token')
			router.navigate(['/login'])
			return error
		}

		return Promise.reject(error)
	},
)

export default axiosInstance

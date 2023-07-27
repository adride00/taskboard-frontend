import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
	timeout: 10000,
})

let configs

axiosInstance.interceptors.request.use(config => {
	configs = config
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

axiosInstance.interceptors.response.use(
	response => {
		if (configs.showSuccessAlert && response.data.message)
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: response.data.message,
				showConfirmButton: false,
				timer: 1500,
			})
		return response
	},
	error => {
		console.log(error, 'error')
		if (configs.showErrorAlert)
			Swal.fire({
				icon: 'error',
				title: error.response.data.message,
			})
		if (error.response.status === 401) {
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			return error
		}

		return Promise.reject(error)
	},
)

export default axiosInstance

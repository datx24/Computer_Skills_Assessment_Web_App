import axios from 'axios'
const API_URL = 'http://localhost:8080/api/auth'

// Định nghĩa kiểu dữ liệu cho request và response
interface RegisterData {
    username: string
    email: string
    password: string
    role: string
}

interface LoginData {
    username: string
    password: string
}

interface LoginResponse {
    token: string
    username: string
    role: string
}

// Hàm gọi API để đăng kí
export const register = async (userData: RegisterData): Promise<void> => {
    await axios.post(`${API_URL}/register`, userData)
}

// Hàm gọi API để đăng nhập
export const login = async (credentials: LoginData): Promise<LoginResponse> => {
    const response = await axios.post(`${API_URL}/login`, credentials)
    return response.data
}
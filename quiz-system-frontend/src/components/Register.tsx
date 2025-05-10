import { ChangeEvent, FormEvent, useState,  } from "react"
import { useNavigate } from 'react-router-dom';
import { register } from "../services/api";

interface RegisterData {
    username: string
    password: string
    email: string
    role: string
}

const Register:React.FC = () => {
    const [userData, setUserData] = useState<RegisterData>({
        username: '',
        password: '',
        email: '',
        role: 'USER',
    })
    const [error, setError] = useState<String>('')
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()
        try{
            await register(userData)
            navigate('/login')
        }catch(err){
            setError('Đăng kí thất bại. Tên đăng nhập hoặc email đã tồn tại')
        }
    }

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Vai trò</label>
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Đăng ký
          </button>
        </form>
        <p className="mt-2 text-center">
          Đã có tài khoản?{' '}
          <a href="/login" className="text-green-500">Đăng nhập</a>
        </p>
      </div>
    </div>
  )
}

export default Register
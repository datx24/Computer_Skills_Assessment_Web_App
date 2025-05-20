import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { login } from "../services/api";
import Header from "./fragments/Header";
import Footer from "./fragments/Footer";

interface LoginCredentials {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({ username: '', password: '' });
    const [error, setError] = useState<string>('');
    const { login: setAuth } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            console.log('Gửi yêu cầu đăng nhập:', credentials);
            const response = await login(credentials);
            const { token, username, role } = response;
            console.log('Phản hồi đăng nhập:', { token, username, role });
            setAuth(token, username, role);
            console.log('localStorage sau setAuth:', JSON.stringify(localStorage));
            console.log('Token sau setAuth:', localStorage.getItem('token'));
            if (role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (err: any) {
            console.error('Lỗi đăng nhập:', err.response?.data || err.message);
            setError('Đăng nhập thất bại. Vui lòng kiểm tra tên đăng nhập hoặc mật khẩu.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <div className="p-6 bg-white rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Tên đăng nhập</label>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
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
                                value={credentials.password}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Đăng nhập
                        </button>
                    </form>
                    <p className="mt-2 text-center">
                        Chưa có tài khoản?{' '}
                        <a href="/register" className="text-blue-500">Đăng ký</a>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Login;
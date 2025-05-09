import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Trang Admin</h2>
        <p>Chỉ admin mới thấy trang này!</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Admin;
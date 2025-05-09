import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Không có quyền truy cập</h2>
        <p>Bạn không có quyền truy cập trang này.</p>
        <button
          onClick={() => navigate('/home')}
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
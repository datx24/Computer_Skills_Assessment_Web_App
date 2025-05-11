import axios from "axios"
import { useEffect, useState } from "react"

interface Question{
    id?: number,
    content: string,
    options: string,
    correctAnswer: string,
    topic: string
}

interface QuestionManagementProps {
    onUpdate: () => void
}

const QuestionManagement: React.FC<QuestionManagementProps> = ({ onUpdate }) => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [formData, setFormData]= useState<Question>({
        content: '',
        options: '[]',
        correctAnswer: '',
        topic: '',  
    })
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState<number | null>(null)
    const [optionInputs, setOptionInputs] = useState<string[]>(['', '', '', ''])

    //Lấy danh sách câu hỏi từ API
    useEffect(() => {
        fetchQuestions()
    }, [])

    const fetchQuestions = async () => {
        try {
            const respone = await axios.get('http://localhost:8080/api/questions')
            setQuestions(respone.data)
        } catch (error) {
            console.error('Lỗi khi lấy danh sách câu hỏi:', error)
        }
    }

    //Xử lý thay đổi input trong form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    //Xử lý thay đổi từng lựa chọn
    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...optionInputs]
        newOptions[index] = value
        setOptionInputs(newOptions)
        // Cập nhật thành chuỗi JSON khi submit
        setFormData((prev) => ({...prev, options: JSON.stringify(newOptions.filter(opt => opt.trim() != ''))}))
    }

    //Xử lý gửi form(thêm hoặc sửa câu hỏi)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if(isEditing && editId !== null) {
                await axios.put(`http://localhost:8080/api/questions/${editId}`, formData)
            } else {
                await axios.post(`http://localhost:8080/api/questions/${editId}`, formData)
            }
            setFormData({ content:'', options:'[]', correctAnswer: '', topic: ''})
            setOptionInputs(['','','',''])
            setIsEditing(false)
            setEditId(null)
            fetchQuestions()
            onUpdate() //Gọi callback để thông báo cập nhật
        } catch (error) {
            console.error('Lỗi khi lưu câu hỏi:', error)
        }
    }

    //Xử lý khi nhấn nút chỉnh sửa
    const handleEdit = (question: Question) => {
        setFormData(question)
        setIsEditing(true)
        setEditId(question.id || null)
        //Phân tích chuỗi JSON options thành mảng để điền vào input
        const parsedOptions = JSON.parse(question.options || '[]')
        setOptionInputs(parsedOptions.length >= 4 ? parsedOptions.slice(0, 4): [...parsedOptions, ...Array
            (4 - parsedOptions.length).fill('')])
    }

    //Xử lý xóa câu hỏi
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/questions/${id}`)
            fetchQuestions()
            onUpdate()
        } catch (error) {
            console.error('Lỗi khi xóa câu hỏi:', error)
        }
    }

    //Danh sách chủ đề
    const topics = [
    'word',
    'excel',
    'powerpoint',
    'internet-and-email',
    'windows-os',
    'basic-computer-security',
  ];

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Quản lý Câu hỏi</h2>

      {/* Form thêm/sửa câu hỏi */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nội dung câu hỏi</label>
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Lựa chọn 1</label>
            <input
              type="text"
              value={optionInputs[0]}
              onChange={(e) => handleOptionChange(0, e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Lựa chọn 2</label>
            <input
              type="text"
              value={optionInputs[1]}
              onChange={(e) => handleOptionChange(1, e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Lựa chọn 3</label>
            <input
              type="text"
              value={optionInputs[2]}
              onChange={(e) => handleOptionChange(2, e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Lựa chọn 4</label>
            <input
              type="text"
              value={optionInputs[3]}
              onChange={(e) => handleOptionChange(3, e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Đáp án đúng</label>
            <input
              type="text"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Chủ đề</label>
            <select
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Chọn chủ đề</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic.replace(/-/g, ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-200"
        >
          {isEditing ? 'Cập nhật' : 'Thêm câu hỏi'}
        </button>
      </form>

      {/* Danh sách câu hỏi */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nội dung</th>
              <th className="p-3 text-left">Lựa chọn</th>
              <th className="p-3 text-left">Đáp án</th>
              <th className="p-3 text-left">Chủ đề</th>
              <th className="p-3 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{question.id}</td>
                <td className="p-3">{question.content}</td>
                <td className="p-3">{question.options}</td>
                <td className="p-3">{question.correctAnswer}</td>
                <td className="p-3">{question.topic.toUpperCase()}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(question)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(question.id!)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionManagement;
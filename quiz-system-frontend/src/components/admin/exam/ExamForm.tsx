import React, { useState } from 'react';
import { createExam } from '../../../services/ExamService'; 
import { Exam } from '../../../types/Exam'; 
import { Form, Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

const ExamForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [topic, setTopic] = useState('');

  const handleSubmit = async (values: any) => {
    const newExam: Omit<Exam, 'id'> = {
      title: values.title,
      description: values.description,
      duration: values.duration,
      topic: values.topic,
    };

    try {
      await createExam(newExam);  // Tạo bài thi mới qua service
      message.success('Bài thi mới đã được tạo!');
      setTitle(''); 
      setDescription(''); 
      setDuration(0);
      setTopic('');
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo bài thi.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Title level={2} className="text-center text-indigo-800 mb-4">Thêm Bài Thi Mới</Title>
      <Form onFinish={handleSubmit} layout="vertical" className="space-y-4">
        <Form.Item
          label="Tên bài thi"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tên bài thi!' }]}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" // Set width to full
          />
        </Form.Item>
        <Form.Item
          label="Mô tả bài thi"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả bài thi!' }]}
        >
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" // Set width to full
            rows={4}
          />
        </Form.Item>
        <Form.Item
          label="Thời lượng (phút)"
          name="duration"
          rules={[{ required: true, message: 'Vui lòng nhập thời lượng bài thi!' }]}
        >
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" // Set width to full
          />
        </Form.Item>
        <Form.Item
          label="Chủ đề"
          name="topic"
          rules={[{ required: true, message: 'Vui lòng nhập chủ đề!' }]}
        >
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" // Set width to full
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition duration-200"
          >
            Thêm bài thi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ExamForm;

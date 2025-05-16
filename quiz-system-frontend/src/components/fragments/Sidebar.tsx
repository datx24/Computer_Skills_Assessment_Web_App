// src/components/Sidebar.tsx
import React from 'react';
import { Typography, Collapse } from 'antd';
import { FileAddOutlined, UnorderedListOutlined } from '@ant-design/icons';

type Props = {
  activeTab: string;
  setActiveTab: (tab: 'examForm' | 'examList' | 'form' | 'list') => void;
};

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-gradient-to-b from-indigo-800 to-blue-700 w-64 h-screen fixed top-0 left-0 z-10 shadow-lg pt-8">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img src="/logo192.png" alt="Logo" className="w-16 h-16" />
      </div>

      {/* Title */}
      <Typography.Title level={4} className="text-white text-center mb-6" style={{ color: 'white' }}>
        Quản lý Trắc Nghiệm
      </Typography.Title>

      {/* Collapse Menus */}
      <div className="px-4">
        <Collapse
          ghost
          expandIconPosition="end"
          className="text-white"
          // Đổi màu mũi tên expand thành trắng
          expandIcon={({ isActive }) => (
            <svg
              className={`transition-transform duration-200 ${
                isActive ? 'rotate-90' : ''
              } text-white`}
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          // Giảm khoảng cách giữa mũi tên và chữ header
          style={{ border: 'none' }}
        >
          <Collapse.Panel
            header={<span className="text-white font-semibold">Quản lý Bài Thi</span>}
            key="1"
            className="bg-transparent border-none"
          >
            <div
              onClick={() => setActiveTab('examForm')}
              className={`cursor-pointer px-4 py-2 rounded-md ${
                activeTab === 'examForm' ? 'bg-indigo-700' : ''
              } hover:bg-indigo-600 text-white flex items-center gap-2 select-none`}
            >
              <FileAddOutlined /> Thêm Bài Thi
            </div>
            <div
              onClick={() => setActiveTab('examList')}
              className={`cursor-pointer px-4 py-2 rounded-md ${
                activeTab === 'examList' ? 'bg-indigo-700' : ''
              } hover:bg-indigo-600 text-white flex items-center gap-2 select-none`}
            >
              <UnorderedListOutlined /> Danh Sách Bài Thi
            </div>
          </Collapse.Panel>

          <Collapse.Panel
            header={<span className="text-white font-semibold">Quản lý Câu Hỏi</span>}
            key="2"
            className="bg-transparent border-none"
          >
            <div
              onClick={() => setActiveTab('form')}
              className={`cursor-pointer px-4 py-2 rounded-md ${
                activeTab === 'form' ? 'bg-indigo-700' : ''
              } hover:bg-indigo-600 text-white flex items-center gap-2 select-none`}
            >
              <FileAddOutlined /> Thêm Câu Hỏi
            </div>
            <div
              onClick={() => setActiveTab('list')}
              className={`cursor-pointer px-4 py-2 rounded-md ${
                activeTab === 'list' ? 'bg-indigo-700' : ''
              } hover:bg-indigo-600 text-white flex items-center gap-2 select-none`}
            >
              <UnorderedListOutlined /> Danh Sách Câu Hỏi
            </div>
          </Collapse.Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default Sidebar;

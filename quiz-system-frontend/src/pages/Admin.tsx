import React, { useState } from 'react';
import { Typography } from 'antd';
import Footer from '../components/fragments/Footer';
import Navbar from '../components/fragments/Navbar';
import Sidebar from '../components/fragments/Sidebar';
import ExamForm from '../components/admin/exam/ExamForm';
import ExamList from '../components/admin/exam/ExamList';
import QuestionForm from '../components/admin/question/QuestionForm';
import QuestionList from '../components/admin/question/QuestionList';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'examForm' | 'examList' | 'form' | 'list'>('examForm');

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-30">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main content area */}
      <div className="flex-grow ml-64 bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 p-8 w-full">
          <div className="w-full mt-16">
            {activeTab === 'examForm' && <ExamForm />}
            {activeTab === 'examList' && <ExamList />}
            {activeTab === 'form' && <QuestionForm />}
            {activeTab === 'list' && <QuestionList />}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Admin;

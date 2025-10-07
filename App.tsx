
import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import WorkflowPage from './pages/WorkflowPage';
import ResourcesPage from './pages/ResourcesPage';
import AIChatPage from './pages/AIChatPage';
import type { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'workflow':
        return <WorkflowPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'chat':
        return <AIChatPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
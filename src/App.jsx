import React, { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/useApp';
import Layout from './components/layout/Layout';
import Overview from './pages/Overview';
import ContextAPI from './pages/ContextAPI';
import PropDrilling from './pages/PropDrilling';
import StateManagement from './pages/StateManagement';
import StylingPlayground from './pages/StylingPlayground';
import VivaPrep from './pages/VivaPrep';

function AppContent() {
  const { activePage } = useApp();

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderActivePage = () => {
    switch (activePage) {
      case 'overview':
        return <Overview />;
      case 'context-api':
        return <ContextAPI />;
      case 'prop-drilling':
        return <PropDrilling />;
      case 'state-management':
        return <StateManagement />;
      case 'styling-playground':
        return <StylingPlayground />;
      case 'viva-prep':
        return <VivaPrep />;
      default:
        return <Overview />;
    }
  };

  return (
    <Layout>
      {renderActivePage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import SalesPerformance from './pages/SalesPerformance';
import CustomerInsights from './pages/CustomerInsights';
import SalesPipeline from './pages/SalesPipeline';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import ThemeProvider from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sales-performance" element={<SalesPerformance />} />
          <Route path="/customer-insights" element={<CustomerInsights />} />
          <Route path="/sales-pipeline" element={<SalesPipeline />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

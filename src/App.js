import './App.css';
import { useState } from 'react';
import HomePage from './components/HomePage';
import ProductManager from './components/ProductManager';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [previousPage, setPreviousPage] = useState(null);

  const handleNavigate = (itemId) => {
    setPreviousPage('home');

    // Map item IDs to pages
    const pageMap = {
      'product-mgmt': 'product-manager',
      'new-product': 'new-product',
      'product-family': 'product-family',
      'production-capacity': 'production-capacity',
      'me-capacity': 'me-capacity',
      'projects-capacity': 'projects-capacity',
      'batch-scheduling': 'batch-scheduling',
      'product-schedule': 'product-schedule',
      'work-area-schedule': 'work-area-schedule',
    };

    setCurrentPage(pageMap[itemId] || 'home');
  };

  const handleBack = () => {
    setCurrentPage(previousPage || 'home');
    setPreviousPage(null);
  };

  if (currentPage === 'home') {
    return (
      <div className="App">
        <HomePage onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === 'product-manager') {
    return (
      <div className="App">
        <ProductManager onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="App">
      <HomePage onNavigate={handleNavigate} />
    </div>
  );
}

export default App;

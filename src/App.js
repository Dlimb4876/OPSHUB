import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductManager from './components/ProductManager';
import ProductFamilyAdmin from './components/ProductFamilyAdmin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-mgmt" element={<ProductManager />} />
        <Route path="/new-product" element={<div>New Product Coming Soon</div>} />
        <Route path="/product-family" element={<ProductFamilyAdmin />} />
        <Route path="/production-capacity" element={<div>Production Capacity Coming Soon</div>} />
        <Route path="/me-capacity" element={<div>ME Capacity Coming Soon</div>} />
        <Route path="/projects-capacity" element={<div>Projects Capacity Coming Soon</div>} />
        <Route path="/batch-scheduling" element={<div>Batch Scheduling Coming Soon</div>} />
        <Route path="/product-schedule" element={<div>Product Schedule Coming Soon</div>} />
        <Route path="/work-area-schedule" element={<div>Work Area Schedule Coming Soon</div>} />
      </Routes>
    </div>
  );
}

export default App;

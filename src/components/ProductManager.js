import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import '../styles/ProductManager.css';

const ProductManager = () => {
  const [products, setProducts] = useState([]);

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      id: Date.now(),
      ...product
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  return (
    <div className="product-manager">
      <header className="manager-header">
        <h1>Product Manager</h1>
        <p className="subtitle">Manage your product inventory</p>
      </header>

      <main className="manager-content">
        <ProductForm onAddProduct={addProduct} />
        <ProductTable
          products={products}
          onDeleteProduct={deleteProduct}
          onUpdateProduct={updateProduct}
        />
      </main>
    </div>
  );
};

export default ProductManager;

import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import { supabase } from '../supabaseClient';
import '../styles/ProductManager.css';

const mapFromDb = (row) => ({
  id: row.id,
  productName: row.product_name,
  partNumber: row.part_number,
  productFamily: row.product_family,
  customer: row.customer,
  turnaroundTime: row.turnaround_time,
  overhaulTime: row.overhaul_time,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapToDb = (product) => ({
  product_name: product.productName,
  part_number: product.partNumber,
  product_family: product.productFamily,
  customer: product.customer,
  turnaround_time: product.turnaroundTime,
  overhaul_time: product.overhaulTime,
});

const ProductManager = ({ onBack }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setProducts(data.map(mapFromDb));
    }
    setLoading(false);
  };

  const addProduct = async (product) => {
    const { data, error } = await supabase
      .from('products')
      .insert([mapToDb(product)])
      .select()
      .single();

    if (error) throw new Error(error.message);
    const newProduct = mapFromDb(data);
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from('products')
      .update({ ...mapToDb(updatedFields), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    setProducts(prev => prev.map(p => p.id === id ? mapFromDb(data) : p));
  };

  return (
    <div className="product-manager">
      <header className="manager-header">
        {onBack && (
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
        )}
        <h1>Product Manager</h1>
        <p className="subtitle">Manage your product inventory</p>
      </header>

      <main className="manager-content">
        {error && (
          <div className="error-banner">
            <span>Failed to load products: {error}</span>
            <button onClick={fetchProducts}>Retry</button>
          </div>
        )}
        <ProductTable
          products={products}
          loading={loading}
          onAddProduct={addProduct}
          onDeleteProduct={deleteProduct}
          onUpdateProduct={updateProduct}
        />
      </main>
    </div>
  );
};

export default ProductManager;

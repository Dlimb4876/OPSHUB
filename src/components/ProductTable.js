import React, { useState } from 'react';
import '../styles/ProductTable.css';

const ProductTable = ({ products, onDeleteProduct, onUpdateProduct }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditData({ ...product });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = (id) => {
    onUpdateProduct(id, editData);
    setEditingId(null);
    setEditData({});
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (products.length === 0) {
    return (
      <div className="product-table-container">
        <h2>Products</h2>
        <div className="empty-state">
          <p>No products added yet. Use the form above to add your first product.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-table-container">
      <h2>Products ({products.length})</h2>
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Part Number</th>
              <th>Product Family</th>
              <th>Customer</th>
              <th>Turnaround Time</th>
              <th>Overhaul Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className={editingId === product.id ? 'editing' : ''}>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editData.productName}
                      onChange={(e) => handleEditChange('productName', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    product.productName
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editData.partNumber}
                      onChange={(e) => handleEditChange('partNumber', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    product.partNumber
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editData.productFamily}
                      onChange={(e) => handleEditChange('productFamily', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    product.productFamily
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editData.customer}
                      onChange={(e) => handleEditChange('customer', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    product.customer
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editData.turnaroundTime}
                      onChange={(e) => handleEditChange('turnaroundTime', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    product.turnaroundTime
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editData.overhaulTime}
                      onChange={(e) => handleEditChange('overhaulTime', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    product.overhaulTime
                  )}
                </td>
                <td>
                  <div className="actions">
                    {editingId === product.id ? (
                      <>
                        <button
                          className="btn btn-save"
                          onClick={() => saveEdit(product.id)}
                          title="Save"
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-cancel"
                          onClick={cancelEdit}
                          title="Cancel"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-edit"
                          onClick={() => startEdit(product)}
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => onDeleteProduct(product.id)}
                          title="Delete"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;

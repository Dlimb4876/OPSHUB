import React, { useState } from 'react';
import ProductFamilyDropdown from './ui/ProductFamilyDropdown';
import '../styles/ProductTable.css';

const EMPTY_ROW = {
  productName: '',
  partNumber: '',
  productFamily: '',
  customer: '',
  turnaroundTime: '',
  overhaulTime: '',
};

const FIELDS = [
  { key: 'productName',    label: 'Product Name',    placeholder: 'e.g. Hydraulic Pump' },
  { key: 'partNumber',     label: 'Part Number',      placeholder: 'e.g. PN-1042' },
  { key: 'productFamily',  label: 'Product Family',   placeholder: 'e.g. Hydraulics' },
  { key: 'customer',       label: 'Customer',         placeholder: 'e.g. Acme Corp' },
  { key: 'turnaroundTime', label: 'Turnaround Time',  placeholder: 'e.g. 5 days' },
  { key: 'overhaulTime',   label: 'Overhaul Time',    placeholder: 'e.g. 30 days' },
];

const ProductTable = ({ products, families = [], loading, onAddProduct, onDeleteProduct, onUpdateProduct }) => {
  const [editingId, setEditingId] = useState(null); // null | 'new' | uuid
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [rowError, setRowError] = useState(null);

  const startAdd = () => {
    setEditingId('new');
    setEditData({ ...EMPTY_ROW });
    setRowError(null);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditData({ ...product });
    setRowError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
    setRowError(null);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
    if (rowError) setRowError(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') saveRow(id);
    if (e.key === 'Escape') cancelEdit();
  };

  const validate = () => {
    for (const { key, label } of FIELDS) {
      if (!editData[key] || !editData[key].trim()) {
        return `${label} is required`;
      }
    }
    return null;
  };

  const saveRow = async (id) => {
    const err = validate();
    if (err) { setRowError(err); return; }

    setSaving(true);
    setRowError(null);
    try {
      if (id === 'new') {
        await onAddProduct(editData);
      } else {
        await onUpdateProduct(id, editData);
      }
      setEditingId(null);
      setEditData({});
    } catch (e) {
      setRowError(e.message || 'Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDeleteProduct(id);
    } catch (e) {
      // surface error inline on the row if needed
    }
  };

  const renderCell = (field, rowId) => {
    if (editingId === rowId) {
      if (field.key === 'productFamily') {
        return (
          <ProductFamilyDropdown
            value={editData[field.key] || ''}
            onChange={(value) => handleChange(field.key, value)}
            families={families}
            disabled={saving}
            autoFocus={false}
          />
        );
      }
      return (
        <input
          type="text"
          value={editData[field.key] || ''}
          placeholder={field.placeholder}
          onChange={(e) => handleChange(field.key, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, rowId)}
          className="edit-input"
          disabled={saving}
          autoFocus={field.key === 'productName'}
        />
      );
    }
    const product = products.find(p => p.id === rowId);
    return product ? product[field.key] : '';
  };

  const renderActions = (rowId) => {
    const isEditing = editingId === rowId;
    return (
      <div className="actions">
        {isEditing ? (
          <>
            <button
              className="btn btn-save"
              onClick={() => saveRow(rowId)}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              className="btn btn-cancel"
              onClick={cancelEdit}
              disabled={saving}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-edit"
              onClick={() => startEdit(products.find(p => p.id === rowId))}
              disabled={editingId !== null}
            >
              Edit
            </button>
            <button
              className="btn btn-delete"
              onClick={() => handleDelete(rowId)}
              disabled={editingId !== null}
            >
              Delete
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="product-table-container">
      <div className="table-header">
        <h2>
          Products
          {!loading && <span className="product-count">{products.length}</span>}
        </h2>
        <button
          className="btn btn-add"
          onClick={startAdd}
          disabled={editingId !== null || loading}
        >
          + Add Product
        </button>
      </div>

      {rowError && <div className="row-error">{rowError}</div>}

      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              {FIELDS.map(f => <th key={f.key}>{f.label}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={FIELDS.length + 1} className="loading-cell">
                  Loading products…
                </td>
              </tr>
            )}

            {!loading && editingId === 'new' && (
              <tr className="editing new-row">
                {FIELDS.map(field => (
                  <td key={field.key}>
                    {field.key === 'productFamily' ? (
                      <ProductFamilyDropdown
                        value={editData[field.key] || ''}
                        onChange={(value) => handleChange(field.key, value)}
                        families={families}
                        disabled={saving}
                        autoFocus={false}
                      />
                    ) : (
                      <input
                        type="text"
                        value={editData[field.key] || ''}
                        placeholder={field.placeholder}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'new')}
                        className="edit-input"
                        disabled={saving}
                        autoFocus={field.key === 'productName'}
                      />
                    )}
                  </td>
                ))}
                <td>{renderActions('new')}</td>
              </tr>
            )}

            {!loading && products.length === 0 && editingId !== 'new' && (
              <tr>
                <td colSpan={FIELDS.length + 1} className="empty-cell">
                  No products yet. Click "+ Add Product" to get started.
                </td>
              </tr>
            )}

            {!loading && products.map(product => (
              <tr key={product.id} className={editingId === product.id ? 'editing' : ''}>
                {FIELDS.map(field => (
                  <td key={field.key}>{renderCell(field, product.id)}</td>
                ))}
                <td>{renderActions(product.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductFamilyAdmin.css';
import {
  fetchProductFamilies,
  addProductFamily,
  updateProductFamily,
  deleteProductFamily,
} from '../services/productFamilyService';

const EMPTY_ROW = { name: '' };

const ProductFamilyAdmin = () => {
  const navigate = useNavigate();
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [rowError, setRowError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductFamilies();
      setFamilies(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const startAdd = () => {
    setEditingId('new');
    setEditData({ ...EMPTY_ROW });
    setRowError(null);
  };

  const startEdit = (family) => {
    setEditingId(family.id);
    setEditData({ ...family });
    setRowError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
    setRowError(null);
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
    if (rowError) setRowError(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') saveRow(id);
    if (e.key === 'Escape') cancelEdit();
  };

  const validate = () => {
    if (!editData.name || !editData.name.trim()) {
      return 'Product Family name is required';
    }
    return null;
  };

  const saveRow = async (id) => {
    const err = validate();
    if (err) {
      setRowError(err);
      return;
    }

    setSaving(true);
    setRowError(null);
    try {
      if (id === 'new') {
        const newFamily = await addProductFamily(editData);
        setFamilies((prev) => [...prev, newFamily].sort((a, b) => a.name.localeCompare(b.name)));
      } else {
        const updatedFamily = await updateProductFamily(id, editData);
        setFamilies((prev) =>
          prev
            .map((f) => (f.id === id ? updatedFamily : f))
            .sort((a, b) => a.name.localeCompare(b.name))
        );
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
    if (!confirm('Are you sure you want to delete this product family?')) return;

    try {
      await deleteProductFamily(id);
      setFamilies((prev) => prev.filter((f) => f.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const renderInput = (value, placeholder, rowId) => {
    if (editingId === rowId) {
      return (
        <input
          type="text"
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => handleChange('name', e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, rowId)}
          className="edit-input"
          disabled={saving}
          autoFocus
        />
      );
    }
    return value;
  };

  const renderActions = (rowId) => {
    const isEditing = editingId === rowId;
    return (
      <div className="actions">
        {isEditing ? (
          <>
            <button className="btn btn-save" onClick={() => saveRow(rowId)} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button className="btn btn-cancel" onClick={cancelEdit} disabled={saving}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-edit"
              onClick={() => startEdit(families.find((f) => f.id === rowId))}
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
    <div className="product-family-admin">
      <header className="manager-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1>Product Family Management</h1>
        <p className="subtitle">Manage product families used across the system</p>
      </header>

      <main className="manager-content">
        {error && (
          <div className="error-banner">
            <span>Error: {error}</span>
            <button onClick={fetchData}>Retry</button>
          </div>
        )}

        <div className="table-header">
          <h2>
            Product Families
            {!loading && <span className="count">{families.length}</span>}
          </h2>
          <button className="btn btn-add" onClick={startAdd} disabled={editingId !== null || loading}>
            + Add Family
          </button>
        </div>

        {rowError && <div className="row-error">{rowError}</div>}

        <div className="table-wrapper">
          <table className="families-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="2" className="loading-cell">
                    Loading product families…
                  </td>
                </tr>
              )}

              {!loading && editingId === 'new' && (
                <tr className="editing new-row">
                  <td>{renderInput(editData.name || '', 'e.g. HVAC', 'new')}</td>
                  <td>{renderActions('new')}</td>
                </tr>
              )}

              {!loading && families.length === 0 && editingId !== 'new' && (
                <tr>
                  <td colSpan="2" className="empty-cell">
                    No product families yet. Click "+ Add Family" to get started.
                  </td>
                </tr>
              )}

              {!loading &&
                families.map((family) => (
                  <tr key={family.id} className={editingId === family.id ? 'editing' : ''}>
                    <td>{renderInput(editData.name || family.name, 'e.g. HVAC', family.id)}</td>
                    <td>{renderActions(family.id)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ProductFamilyAdmin;

import React, { useState } from 'react';
import '../styles/ProductForm.css';

const ProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    productName: '',
    partNumber: '',
    productFamily: '',
    customer: '',
    turnaroundTime: '',
    overhaulTime: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
    if (!formData.partNumber.trim()) newErrors.partNumber = 'Part number is required';
    if (!formData.productFamily.trim()) newErrors.productFamily = 'Product family is required';
    if (!formData.customer.trim()) newErrors.customer = 'Customer is required';
    if (!formData.turnaroundTime.trim()) newErrors.turnaroundTime = 'Turnaround time is required';
    if (!formData.overhaulTime.trim()) newErrors.overhaulTime = 'Overhaul time is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddProduct(formData);

    // Reset form
    setFormData({
      productName: '',
      partNumber: '',
      productFamily: '',
      customer: '',
      turnaroundTime: '',
      overhaulTime: ''
    });
    setErrors({});
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="productName">Product Name *</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className={errors.productName ? 'error' : ''}
            />
            {errors.productName && <span className="error-message">{errors.productName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="partNumber">Part Number *</label>
            <input
              type="text"
              id="partNumber"
              name="partNumber"
              value={formData.partNumber}
              onChange={handleChange}
              placeholder="Enter part number"
              className={errors.partNumber ? 'error' : ''}
            />
            {errors.partNumber && <span className="error-message">{errors.partNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="productFamily">Product Family *</label>
            <input
              type="text"
              id="productFamily"
              name="productFamily"
              value={formData.productFamily}
              onChange={handleChange}
              placeholder="Enter product family"
              className={errors.productFamily ? 'error' : ''}
            />
            {errors.productFamily && <span className="error-message">{errors.productFamily}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="customer">Customer *</label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Enter customer name"
              className={errors.customer ? 'error' : ''}
            />
            {errors.customer && <span className="error-message">{errors.customer}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="turnaroundTime">Turnaround Time *</label>
            <input
              type="text"
              id="turnaroundTime"
              name="turnaroundTime"
              value={formData.turnaroundTime}
              onChange={handleChange}
              placeholder="e.g., 5 days"
              className={errors.turnaroundTime ? 'error' : ''}
            />
            {errors.turnaroundTime && <span className="error-message">{errors.turnaroundTime}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="overhaulTime">Overhaul Time *</label>
            <input
              type="text"
              id="overhaulTime"
              name="overhaulTime"
              value={formData.overhaulTime}
              onChange={handleChange}
              placeholder="e.g., 10 days"
              className={errors.overhaulTime ? 'error' : ''}
            />
            {errors.overhaulTime && <span className="error-message">{errors.overhaulTime}</span>}
          </div>
        </div>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;

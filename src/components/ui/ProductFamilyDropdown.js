import React from 'react';
import './ProductFamilyDropdown.module.css';

const ProductFamilyDropdown = ({
  value,
  onChange,
  families,
  placeholder = 'Select product family',
  disabled = false,
  autoFocus = false,
}) => {
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      autoFocus={autoFocus}
      className="product-family-dropdown"
    >
      <option value="">{placeholder}</option>
      {families.map((family) => (
        <option key={family.id} value={family.name}>
          {family.name}
        </option>
      ))}
    </select>
  );
};

export default ProductFamilyDropdown;

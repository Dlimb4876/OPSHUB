import React from 'react';
import styles from './ProductFamilyDropdown.module.css';

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
      className={styles.productFamilyDropdown}
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

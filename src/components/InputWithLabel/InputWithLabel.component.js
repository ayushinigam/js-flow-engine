import React from 'react';
import './InputWithLabel.styles.css';

const InputWithLabel = ({className, label, inputClassName, value, ...extraprops}) => (
  <div className={`input-with-label ${className}`}>
    <p>{label}</p>
    <input className={inputClassName} value={String(value)} {...extraprops} />
  </div>
);

export default InputWithLabel;

import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editable?: boolean;
  style?: React.CSSProperties;
  error?: boolean | string;
}

const Input: React.FC<InputProps> = ({ type = 'text', value, error, onChange, ...props }) => {
  return (
    <div className={styles['input-container']}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        {...props}
      />
    </div>
  );
};

export default Input;

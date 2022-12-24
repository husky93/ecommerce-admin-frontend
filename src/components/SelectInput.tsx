import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styles from '../assets/styles/components/SelectInput.module.css';
import type { Category } from '../app/api/types';
import Category from '../routes/Category';

type IFormInputProps = {
  name: string;
  label: string;
  options: Array<Category>;
  [x: string]: any;
};

const FormInput: FC<IFormInputProps> = ({
  name,
  label,
  options,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <label>{label}</label>
          <select {...field} {...otherProps}>
            {options.map((option) => (
              <option value={option._id}>{option.title}</option>
            ))}
          </select>
          <div className={styles.error}>
            {errors[name] && errors[name].message}
          </div>
        </div>
      )}
    />
  );
};

export default FormInput;

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styles from '../assets/styles/components/SelectInput.module.css';
import type { CategoriesGet } from '../app/api/types';

type IFormInputProps = {
  name: string;
  label: string;
  options: CategoriesGet | undefined;
  error?: boolean;
  [x: string]: any;
};

const SelectInput: FC<IFormInputProps> = ({
  name,
  label,
  options,
  error,
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
        <div className={styles.wrapper}>
          <label>{label}</label>
          {error ? (
            <div className={styles.error}>
              Error! Could not load categories.
            </div>
          ) : (
            <select className={styles.select} {...field} {...otherProps}>
              <option value="">Please choose a category</option>
              {options &&
                options.map((option) => (
                  <option value={option._id}>{option.title}</option>
                ))}
            </select>
          )}
          <div className={styles.error}>
            {errors[name] && (errors[name]!.message as string)}
          </div>
        </div>
      )}
    />
  );
};

export default SelectInput;

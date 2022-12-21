import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styles from '../assets/styles/components/FormInput.module.css';

type IFormInputProps = {
  name: string;
  label: string;
};

const FormInput: FC<IFormInputProps> = ({ name, label, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <div>
          <label>
            {label}
            <input {...field} {...otherProps} />
          </label>
          <div className={styles.error}>
            {errors[name] && errors[name].message}
          </div>
        </div>
      )}
    />
  );
};

export default FormInput;
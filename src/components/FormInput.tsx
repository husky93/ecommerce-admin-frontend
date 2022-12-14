import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styles from '../assets/styles/components/FormInput.module.css';

type IFormInputProps = {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  [x: string]: any;
};

const FormInput: FC<IFormInputProps> = ({
  name,
  label,
  type,
  textarea,
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
        <div className={styles.group}>
          <label className={styles.label}>
            {label}
            {textarea ? (
              <textarea {...field} {...otherProps} />
            ) : (
              <input type={type} {...field} {...otherProps} />
            )}
          </label>
          <div className={styles.error}>
            {errors[name] && (errors[name]!.message as string)}
          </div>
        </div>
      )}
    />
  );
};

export default FormInput;

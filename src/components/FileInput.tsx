import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../assets/styles/components/FormInput.module.css';
import type { UseFormRegister } from 'react-hook-form';

type IFileInputProps = {
  label: string;
  name: 'cover_img';
  register: UseFormRegister<{
    cover_img?: any;
    title: string;
    description: string;
    category: string;
    price: number;
    margin: number;
    num_in_stock: number;
  }>;
  [x: string]: any;
};

const FileInput: FC<IFileInputProps> = ({
  label,
  name,
  register,
  ...otherProps
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.group}>
      <label className={styles.label}>
        {label}
        <input type="file" {...register(name)} {...otherProps} />
      </label>
      <div className={styles.error}>
        {errors[name] && (errors[name]!.message as string)}
      </div>
    </div>
  );
};

export default FileInput;

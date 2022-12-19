import styles from '../assets/styles/login/Login.module.css';
import { useMutation } from 'react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../app/api/api';
import { useStateContext } from '../context';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import FormInput from '../components/FormInput';

interface LoginProps {}

const loginSchema = object({
  username: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const Login: React.FC<LoginProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = ((location.state as any)?.from.pathname as string) || '/';

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const stateContext = useStateContext();

  const { mutate: loginUserFn, isLoading } = useMutation(
    (userData: LoginInput) => loginUser(userData),
    {
      onSuccess: (data) => {
        stateContext.dispatch({ type: 'SET_USER', payload: data });
        navigate(from);
      },
      onError: (error: any) => {
        if (Array.isArray((error as any).response.data.error)) {
          (error as any).response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: 'top-right',
            })
          );
        } else {
          toast.error((error as any).response.data.message, {
            position: 'top-right',
          });
        }
      },
    }
  );

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    console.log('yo');
    loginUserFn(values);
  };

  return (
    <main className={styles.main}>
      <ToastContainer />
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="input_group">
            <FormInput
              name="username"
              label="E-mail:"
              type="email"
              placeholder="example@website.com"
            />
          </div>
          <div className="input_group">
            <FormInput
              name="password"
              label="Password:"
              type="password"
              placeholder="*********"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </FormProvider>
    </main>
  );
};

export default Login;

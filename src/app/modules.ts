import { toast } from 'react-toastify';

export const handleMutationError = (error: any) => {
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
};

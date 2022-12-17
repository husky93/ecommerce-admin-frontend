import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = ({}) => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText}</i>
        </p>
      </div>
    );
  } else if (error instanceof Error) {
    <div id="error-page">
      <h1>Oops! Unexpected Error</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message}</i>
      </p>
    </div>;
  }
  return <></>;
};

export default ErrorPage;

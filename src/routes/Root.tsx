import { Outlet } from 'react-router-dom';

interface RootProps {}

const Root: React.FC<RootProps> = ({}) => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export default Root;

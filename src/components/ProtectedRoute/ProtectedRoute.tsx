import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { IUserState } from '@shared/interfaces';

interface IProps {
  redirectPath?: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProps> = ({ redirectPath = '/', children }: IProps) => {
  const isLogged = useSelector((state: { user: IUserState }) => state.user.isLogged);

  if (!isLogged) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{children}</>;
};

export { ProtectedRoute };

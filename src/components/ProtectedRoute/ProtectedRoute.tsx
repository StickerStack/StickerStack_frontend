import { Navigate } from "react-router-dom";

interface IProps {
  isLogged: boolean;
  redirectPath?: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProps> = ({ isLogged, redirectPath = '/', children }: IProps) => {
  if(!isLogged) {
    return <Navigate to={redirectPath} replace />
  }
  return <>{children}</>
};

export { ProtectedRoute };
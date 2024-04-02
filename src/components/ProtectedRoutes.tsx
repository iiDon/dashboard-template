import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const [getCookies] = useCookies(["jwt"]);

  if (!getCookies.jwt) return <Navigate to="/auth/login" />;

  return children;
};

export default ProtectedRoutes;

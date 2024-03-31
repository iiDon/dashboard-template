import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface UnprotectedRoutesProps {
  children: React.ReactNode;
}

const UnprotectedRoutes = ({ children }: UnprotectedRoutesProps) => {
  const [getCookies] = useCookies(["jwt"]);

  // if (getCookies.jwt) return <Navigate to="/" />;

  return children;
};

export default UnprotectedRoutes;

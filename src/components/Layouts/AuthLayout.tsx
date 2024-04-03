import { Outlet } from "react-router-dom";
import Banner from "../Auth/Banner";
import UnprotectedRoutes from "../UnprotectedRoutes";

const AuthLayout = () => {
  return (
    <UnprotectedRoutes>
      <div className="flex h-screen w-full flex-col lg:grid lg:grid-cols-3 lg:gap-0 ">
        <div className="container  col-start-1 col-end-3">
          <Outlet />
        </div>
        <Banner />
      </div>
    </UnprotectedRoutes>
  );
};

export default AuthLayout;

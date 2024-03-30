import { Outlet } from "react-router-dom";
import Banner from "../Auth/Banner";
import UnprotectedRoutes from "../UnprotectedRoutes";

const AuthLayout = () => {
  return (
    <UnprotectedRoutes>
      <div className="flex h-screen w-full flex-col lg:grid lg:grid-cols-2 lg:gap-0 ">
        <div className="container">
          <Outlet />
        </div>
        <Banner />
      </div>
    </UnprotectedRoutes>
  );
};

export default AuthLayout;

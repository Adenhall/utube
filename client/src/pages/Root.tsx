import { Outlet } from "react-router-dom";

import Header from "../components/Header";

import AuthProvider from "../contexts/auth/AuthProvider";

const Root = () => {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
};

export default Root;

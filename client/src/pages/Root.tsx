import { Outlet } from "react-router-dom";

import Header from "../components/Header";

import AuthProvider from "../contexts/auth/AuthProvider";

const Root = () => {
  return (
    <AuthProvider>
      <div className="w-full min-h-screen bg-gray-100">
        <Header />
        <Outlet />
      </div>
    </AuthProvider>
  );
};

export default Root;

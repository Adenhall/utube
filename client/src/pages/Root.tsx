import { Outlet } from "react-router-dom";

import Header from "../components/Header";

import AuthProvider from "../contexts/auth/AuthProvider";

const Root = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col w-full max-h-screen bg-gray-100 overflow-hidden">
        <Header />
        <Outlet />
      </div>
    </AuthProvider>
  );
};

export default Root;

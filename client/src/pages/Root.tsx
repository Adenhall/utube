import { Outlet } from "react-router-dom";

import Header from "../components/Header";

import AuthProvider from "../contexts/auth/AuthProvider";
import NotificationProvider from "../contexts/notifications/NotificationProvider";

const Root = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="flex flex-col w-full min-h-screen max-h-screen overflow-hidden">
          <Header />
          <Outlet />
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default Root;

import { AuthContext, User } from "./AuthContext";

import * as api from "../../services/auth";
import { AxiosError } from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: userData } = useLoaderData() as { data: User };
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) navigate("/", { replace: true });
  }, [userData, navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      await api.signIn(email, password);
      navigate("/", { replace: true });
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        alert("Oops, incorrect email or password");
      }
    }
  };

  const logout = async () => {
    await api.logout();
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user: userData, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

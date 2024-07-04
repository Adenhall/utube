import { useEffect, useState } from "react";

import { AuthContext, User } from "./AuthContext";

import * as api from "../../services/auth";
import { AxiosError } from "axios";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const res = await api.ping();

      res.data && setCurrentUser({
        userId: res.data.user_id,
        email: res.data.email,
      });
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await api.signIn(email, password);
      setCurrentUser({
        userId: res.data.user_id,
        email: res.data.email,
      });
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) alert('Oops, incorrect email or password');
    }
  };

  const logout = async () => {
    await api.logout();

    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

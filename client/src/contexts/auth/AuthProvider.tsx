import { useEffect, useState } from "react";

import { AuthContext, User } from "./AuthContext";

import * as api from "../../services/auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const res = await api.ping();

      setCurrentUser({
        userId: res.data.user_id,
        email: res.data.email,
      });
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await api.signIn(email, password);

    setCurrentUser({
      userId: res.data.user_id,
      email: res.data.email,
    });
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

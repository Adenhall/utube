import { createContext } from "react";

export type User = {
  userId: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  logout: async () => {},
});

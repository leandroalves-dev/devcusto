/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, ReactNode, useEffect } from 'react';
import { signInWithEmailAndPassword, User } from 'firebase/auth'; 
import { auth } from '../config/firebaseConfig'; 

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
   
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
  
    const login = async (email: string, password: string) => {
       
        try {

          const userLogin = await signInWithEmailAndPassword(auth, email, password);
          setUser(userLogin.user); 
          localStorage.setItem('user', JSON.stringify(userLogin.user)); 

        } catch (error) {
          console.error('Erro no login:', error);
        }

    };
  
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
};
  
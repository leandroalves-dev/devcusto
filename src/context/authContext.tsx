/* eslint-disable @typescript-eslint/no-explicit-any */
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
        } catch (error: any) {
            let errorMessage = "Erro ao fazer login. Tente novamente.";
            switch (error.code) {
                case "auth/user-not-found":
                    errorMessage = "Usuário não encontrado.";
                    break;
                case "auth/wrong-password":
                    errorMessage = "Senha incorreta.";
                    break;
                case "auth/invalid-email":
                    errorMessage = "E-mail inválido.";
                    break;
                case "auth/invalid-credential":
                    errorMessage = "E-mail ou senha incorretos."; 
                    break;
                case "auth/too-many-requests":
                    errorMessage = "Muitas tentativas! Tente novamente mais tarde.";
                    break;
            }
    
            throw new Error(errorMessage);
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
  
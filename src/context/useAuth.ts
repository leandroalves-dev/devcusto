import { useContext } from 'react';

//context
import { AuthContext } from './authContext'; 

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('Erro no provider');
    }
    
    return context;
};
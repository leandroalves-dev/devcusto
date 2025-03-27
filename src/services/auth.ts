import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, User } from 'firebase/auth'
import { auth } from '../config/firebaseConfig' 
import { AuthResponse, AuthError } from '../interface/authTypes'
import { FirebaseError } from 'firebase/app'

export const register = async(email: string, password: string, name: string): Promise<AuthResponse> => {

    try {

        const userAuth = await createUserWithEmailAndPassword(auth, email, password)
        const user = userAuth.user;

        console.log('Usuário registrado', user);

        // Atualizando o perfil do usuário com o nome
        await updateProfile(user, {
            displayName: name,
        });

        return {
            user,
            name: user.displayName || "Nome não definido", 
        };

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Erro ao registrar:", error.message);
            throw new Error("Erro ao registrar. Tente novamente.");
          } else {
            console.error("Erro desconhecido:", error);
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }

}

export const login = async(email: string, password: string) => {
    try {
        
        const userLogin = await signInWithEmailAndPassword(auth, email, password);
        const user = userLogin.user;

        console.log('Usuário logado', user)
        return user;

    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            if (error.code === "auth/invalid-credential") {
                throw new Error("E-mail ou senha incorretos. Verifique os dados e tente novamente.");
            } else if (error.code === "auth/invalid-email") {
                throw new Error("Formato de e-mail inválido.");
            } else if (error.code === "auth/user-not-found") {
                throw new Error("Usuário não encontrado. Verifique o e-mail e tente novamente.");
            } else if (error.code === "auth/wrong-password") {
                throw new Error("Senha incorreta. Tente novamente.");
            } else {
                throw new Error("Ocorreu um erro inesperado. Tente novamente.");
            }
        }
    }
}

import { User } from "firebase/auth"; 

export interface AuthResponse {
    user: User;
    name?: string;
}
  
export interface AuthError {
    code: string;
    message: string;
}
import { db  } from '../config/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore';

interface Project {
    name: string;
    budget: number;
    category: string;
}

export const createProject = async (projectData: Project) => {

    try {

        const addProject = await addDoc(collection(db ,'projects'), projectData)
        console.log('Projeto criado com ID', addProject.id)

        return addProject.id;

    } catch (error) {
        console.error("Erro ao cadastrar projeto:", error);
        throw error;
    }

}
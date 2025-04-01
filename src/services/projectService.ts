import { db  } from '../config/firebaseConfig'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { AllProjects } from '../interface/projects'
import { Service } from '../interface/projects';
import { v4 as uuidv4 } from "uuid";

//CRIAR NOVO PROJEJTO
export const createProject = async (projectData: Omit<AllProjects, "id">) => {

    try {

        const addProject = await addDoc(collection(db ,'projects'), {
            ...projectData,
            cost: 0,
            services: []
        })

        return addProject.id;

    } catch (error) {
        console.error("Erro ao cadastrar projeto:", error);
        throw error;
    }

}

//BUSCAR TODOS OS PROJETOS
export const getAllProjects = async (): Promise<AllProjects[]> => {
    try {
        const allProjects = await getDocs(collection(db, "projects"));
       
        console.log('Get nos projetos', allProjects)

        return allProjects.docs.map((project) => {
            const data = project.data(); 
            return {
                id: project.id,
                name: data.name || "",
                description: data.description || "",
                budget: data.budget || 0,
                category: data.category ? data.category : { id: 0, name: "Sem categoria" }, 
                cost: data.cost || 0, 
                services: data.services || [] 
            };
        });
        
    } catch (error) {
        console.log("Erro ao buscar os projetos", error);
        throw error;
    }
};

//BUSCAR PROJETO POR ID
export const getProjectById = async (projectId: string) => {
    try {
        const projectRef = doc(db, "projects", projectId);
        const projectSnap = await getDoc(projectRef);

        if (!projectSnap.exists()) {
            throw new Error("Projeto não encontrado");
        }

        const projectData = projectSnap.data();

        return {
            id: projectSnap.id,
            name: projectData.name || "",
            description: projectData.description || "",
            budget: projectData.budget || 0,
            category: projectData.category ? projectData.category : { id: "0", name: "Sem categoria" },
            cost: projectData.cost || 0,
            services: projectData.services || []
        };
    } catch (error) {
        console.error("Erro ao buscar projeto:", error);
        throw new Error("Erro ao buscar projeto");
    }
};

//EDITAR PROJETO
export const updateProject = async (projectId: string, updatedData: Partial<AllProjects>) => {
    try {
        const projectRef = doc(db, 'projects', projectId);
        await updateDoc(projectRef, updatedData);
        console.log("Projeto atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar o projeto:", error);
        throw error;
    }
};

//DELETAR PROJETO
export const deleteProject = async (projectId: string) => {

    try {

        await deleteDoc(doc(db, "projects", projectId));
        console.log('Projeto deletado com sucesso!')
        
    } catch (error) {
        console.log('Projeto deletado com sucesso!', error)
    }
}

//ADICIONANDO SERVIÇOS
export const addService = async ( projectId: string, service: { name: string; cost: number; description: string }): Promise<{ id: string; name: string; cost: number; description: string }> => {
    
    try {
      const projectRef = doc(db, "projects", projectId);
      const projectSnap = await getDoc(projectRef);
  
      if (!projectSnap.exists()) {
        throw new Error("Projeto não encontrado.");
      }
  
      const projectData = projectSnap.data();
    
      const newService = {
        id: uuidv4(),
        ...service,
      };
  
      const addServices = [...(projectData.services || []), newService];
  
      await updateDoc(projectRef, { services: addServices });

      return newService;

    } catch (error) {
      console.log("Erro ao adicionar o serviço", error);
      throw new Error("Falha ao adicionar o serviço");
    }
};

//DELETANDO SERVIÇOS
export const deleteService = async (projectId: string, serviceId: string) => {
    const projectRef = doc(db, "projects", projectId);
    const projectSnapshot = await getDoc(projectRef);

    if (!projectSnapshot.exists()) {
        throw new Error("Projeto não encontrado");
    }

    const projectData = projectSnapshot.data();

    if (!projectData.services || !Array.isArray(projectData.services)) {
        throw new Error("Lista de serviços não encontrada!");
    }

    const updatedServices = projectData.services.filter((s: Service) => {
        return String(s.id) !== String(serviceId);
    });

    await updateDoc(projectRef, { services: updatedServices });
};
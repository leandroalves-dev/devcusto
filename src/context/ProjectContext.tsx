/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { getAllProjects } from "../services/projectService";
import { AllProjects } from "../interface/projects";

interface ProjectContextType {
    projectsContext: AllProjects[]; 
    setProjectsContext: React.Dispatch<React.SetStateAction<AllProjects[]>>;
    selectedProject: AllProjects | null;  
    setSelectedProject: React.Dispatch<React.SetStateAction<AllProjects | null>>;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [projectsContext, setProjectsContext] = useState<AllProjects[]>([]);
    const [selectedProject, setSelectedProject] = useState<AllProjects | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getAllProjects();
                setProjectsContext(data);
            } catch (error) {
                console.error("Erro ao carregar os projetos:", error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <ProjectContext.Provider value={{ projectsContext, setProjectsContext, selectedProject, setSelectedProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

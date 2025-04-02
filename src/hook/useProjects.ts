import { useEffect, useState } from "react";

//services
import { getAllProjects } from "../services/projectService";

//interface
import { AllProjects } from "../interface/projects"

export const useProjects = () => {
    const [projects, setProjects] = useState<AllProjects[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getAllProjects();
                setProjects(response);

                console.log('Buscar projeto', response);
            } catch (error) {
                setError("Erro ao buscar os projetos");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { projects, loading, error };
};

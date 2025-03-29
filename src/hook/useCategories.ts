import { Category } from "../interface/projects";
import { getProject } from "../api/projectsServices";
import { useEffect, useState } from "react";

export const useCategories = () => {
    
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect( () =>{

        const fetchCategories = async() => {
            try {
                
                const response = await getProject()
                setCategories(response.categories)

            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError("Erro ao carregar as categorias");
                    throw new Error("Erro ao carregar as categorias");
                } else {
                    console.error("Erro ao carregar as categorias", error);
                    throw new Error("Erro ao carregar as categorias");
                }
            } finally{
                setLoading(false)
            }
        }

        fetchCategories();

    },[])

    return { categories, loading, error }
}
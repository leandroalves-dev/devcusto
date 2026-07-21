import { useEffect, useState } from "react";

//interface
import { Category } from "../interface/projects";

//api
import { getCategories } from "../api/projectsServices";

export const useCategories = () => {

    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const data = await getCategories()
                setCategories(data)
            } catch {
                setError("Erro ao carregar as categorias");
            } finally {
                setLoading(false)
            }
        }

        fetchCategories();

    }, [])

    return { categories, loading, error }
}
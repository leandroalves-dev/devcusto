import { useState, useEffect } from "react";

//interface
import { Category } from "../interface/projects";

const CATEGORIES: Category[] = [
    { id: 1, name: "Desenvolvimento" },
    { id: 2, name: "Design" },
    { id: 3, name: "Infra" },
    { id: 4, name: "Marketing" },
];

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setCategories(CATEGORIES);
        setLoading(false);
    }, []);

    return { categories, loading };
};

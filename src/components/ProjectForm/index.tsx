import { useEffect, useState } from "react";

//hooks
import { useCategories } from "../../hook/useCategories";

//components
import Buttons from "../Buttons";
import Input from "../Input";
import Select from "../Select";
import Loading from "../Loading";
import AlertMessage from "../AlertMessage";

//services
import { createProject, updateProject } from "../../services/projectService";

//context
import { useProject } from "../../context/useProject";

//interface
import { AllProjects } from "../../interface/projects";
interface ProjectFormProps {
    project?: AllProjects;
    onSuccess?: () => void; 
}

const ProjectForm = ({ project, onSuccess }: ProjectFormProps) => {
    const { selectedProject, setSelectedProject } = useProject();
    const { categories } = useCategories();
    const [formData, setFormData] = useState({ name: "", description: "", budget: "", category: "" });
    
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name || "",
                description: project.description || "",
                budget: project.budget?.toString() || "",
                category: project.category?.id?.toString() || "",
            });
        }
    }, [project]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, description, budget, category } = formData;

        if (!name || !description || !budget || !category) {
            setError("Por favor, preencha todos os campos");
            setTimeout(() => setError(""), 2000);
            return;
        }

        setLoading(true);

        try {
            const selectedCategory = categories.find((cat) => cat.id === Number(category));
            if (!selectedCategory) {
                setError("Categoria não encontrada");
                setLoading(false);
                return;
            }

            if (project) {
                await updateProject(project.id, {
                    name,
                    description,
                    budget: Number(budget),
                    category: selectedCategory,
                });

                setSuccess("Projeto atualizado com sucesso!");
                if (onSuccess) onSuccess(); 
            } else {
                await createProject({
                    name,
                    description,
                    budget: Number(budget),
                    category: selectedCategory,
                    cost: 0,
                    services: [],
                });

                setSuccess("Projeto cadastrado com sucesso!");
            }

            setLoading(false);
            setFormData({ name: "", description: "", budget: "", category: "" });
            setSelectedProject(null);

            setTimeout(() => setSuccess(""), 2000);
        } catch (error) {
            console.error(error);
            setError("Erro ao criar o projeto");
            setLoading(false);
        }
    };

    console.log(selectedProject)

    return (
        <div className="pt-4 mb-10">
            {loading && <Loading />}
            <form onSubmit={handleSubmit}>
                <Input label="Nome do Projeto" type="text" name="name" value={formData.name} placeholder="Insira o nome do projeto" onChange={handleChange} />
                <Input label="Descrição do Projeto" type="text" name="description" value={formData.description} placeholder="Insira uma breve descrição..." onChange={handleChange} />
                <div className="flex gap-3">
                    <Input label="Orçamento" type="number" name="budget" value={formData.budget} placeholder="Insira o orçamento do projeto" onChange={handleChange} />
                    <Select name="category" label="Selecione a categoria" value={formData.category} options={categories} onChange={handleChange} />
                </div>
                <Buttons title={`${project ? 'Editar' : 'Criar Projeto'}  `} />
                <AlertMessage type="error" message={error} />
                <AlertMessage type="success" message={success} />
            </form>
        </div>
    );
};

export default ProjectForm;

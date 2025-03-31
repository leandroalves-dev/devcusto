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


const ProjectForm = () => {
    const { selectedProject, setSelectedProject } = useProject();
    const { categories } = useCategories();

    const [formData, setFormData] = useState({name: "", description: "", budget: "", category: ""});

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedProject) {
            setFormData({
                name: selectedProject.name || "",
                description: selectedProject.description || "",
                budget: selectedProject.budget?.toString() || "",
                category: selectedProject.category?.id?.toString() || "",
            });
        }
    }, [selectedProject]);

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

            if (selectedProject) {
               
                await updateProject(selectedProject.id, {
                    name,
                    description,
                    budget: Number(budget),
                    category: selectedCategory,
                });
    
                setSuccess("Projeto atualizado com sucesso!");
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
            setSelectedProject(null)

            setTimeout(() => setSuccess(""), 2000);
            
        } catch (error) {
            console.error(error);
            setError("Erro ao criar o projeto");
            setLoading(false);
        }
    };

    return (
        <div className="pt-4">
            {loading && <Loading />}
            <form onSubmit={handleSubmit}>
                <Input label="Nome do Projeto" type="text" name="name" value={formData.name} placeholder="Insira o nome do projeto" onChange={handleChange} />
                <Input label="Descrição do Projeto" type="text" name="description" value={formData.description} placeholder="Insira uma breve descrição..." onChange={handleChange} />
                <div className="flex gap-3">
                    <Input label="Orçamento" type="number" name="budget" value={formData.budget} placeholder="Insira o orçamento do projeto" onChange={handleChange} />
                    <Select name="category" label="Selecione a categoria" value={formData.category} options={categories} onChange={handleChange} />
                </div>
                <Buttons title={`${selectedProject ? 'Editar Projeto' : 'Criar Projeto'}  `} />
                <AlertMessage type="error" message={error} />
                <AlertMessage type="success" message={success} />
            </form>
        </div>
    );
};

export default ProjectForm;

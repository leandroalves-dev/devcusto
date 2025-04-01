import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

//icons
import { BsBookmarkFill, BsPencil, BsTrash } from "react-icons/bs";

//components
import Message from "../../components/Message";
import Container from "../../components/Container";
import LinkButton from "../../components/LinkButton";

//hooks
import { useProjects } from "../../hook/useProjects";

//interface
import { AllProjects } from "../../interface/projects";

//serviços
import { deleteProject } from "../../services/projectService";

//context
import { useProject } from "../../context/useProject";


const ProjectList = () => {
    const { projects: initialProjects, loading, error } = useProjects();

    const [projects, setProjects] = useState(initialProjects);
    const { setSelectedProject } = useProject();
    const navigate = useNavigate();
   
    useEffect(() => {
        setProjects(initialProjects);
    }, [initialProjects]);

    const handleEdit = (project: AllProjects) => {
        setSelectedProject(project);
        navigate(`/projects/${project.id}`); 
    }

    const handleDelete = async (projectId: string) => {
        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você realmente deseja excluir este projeto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
            confirmButtonColor: "#FF3C32",
            cancelButtonText: 'Cancelar'
        });
      
        if (!result.isConfirmed) return;
    
        try {
            await deleteProject(projectId);
            setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));

            Swal.fire('Excluído!', 'O projeto foi removido com sucesso.', 'success');

        } catch (error) {
            console.error('Erro ao excluir o projeto', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir o projeto.', 'error');
        }
    }; 

    const formatCurrency = (value: number) => {
        return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };

    if (loading) return <p>Carregando projetos...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <Container>
            <div className="flex justify-between items-center border-b border-b-neutral-900 mt-3 pb-2">
                <h2 className="text-white text-2xl">Meus Projetos</h2>
                <LinkButton to="/new-projects" text="Criar Projeto" onClick={() => setSelectedProject(null)}  />
            </div>
            <div className="mt-10">

                {projects.length === 0 && (
                    <Message title="Desculpe, mais ainda não temos projetos cadastrados!" />
                )}

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
                   
                    {projects.map(project => (
                        <li key={project.id} className="bg-neutral-900 mb-5 text-zinc-400">
                            <h3 className="p-3 text-center bg-[#FF3C32] text-white capitalize">{project.name}</h3>
                            <div className="p-3 flex flex-col gap-1">
                                <p className="text-sm leading-4 my-3 border-b border-neutral-800 pb-4">{project.description}</p>
                                <p className="text-sm flex justify-between items-center">
                                    <span>Orçamento:</span>
                                    <span className="text-[12px]">{formatCurrency(project.budget)}</span>
                                </p>
                                <p className="text-sm flex items-center gap-2">
                                                                            
                                    <BsBookmarkFill className={
                                        project.category.name === 'Desenvolvimento' ? 'text-red-700' :
                                        project.category.name === 'Infra' ? 'text-blue-700' :
                                        project.category.name === 'Design' ? 'text-yellow-300' : 'text-green-700'
                                    } />
                                    {project.category.name}
                                </p>
                                <div className="flex justify-between items-center mt-2 gap-2">
                                    <button onClick={() => handleEdit(project)}
                                        className="flex items-center gap-1 justify-center py-2 w-full bg-neutral-800 text-sm">
                                        <BsPencil className="text-green-500" />
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(project.id)}
                                        className="flex items-center gap-1 justify-center py-2 w-full bg-neutral-950 text-sm">
                                        <BsTrash className="text-red-500" />
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}                    
                </ul>
            </div>
        </Container>
    );
};

export default ProjectList;

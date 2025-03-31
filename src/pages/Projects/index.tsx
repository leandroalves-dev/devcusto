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

    if (loading) return <p>Carregando projetos...</p>;
    if (error) return <p>Erro: {error}</p>;

    const handleEdit = (project: AllProjects) => {
        setSelectedProject(project);
        navigate("/new-projects"); 
    }

    const handleDelete = async (projectId: string) => {
        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você realmente deseja excluir este projeto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
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

    return (
        <Container>
            <div className="flex justify-between items-center border-b border-b-neutral-900 mt-3 pb-2">
                <h2 className="text-white text-2xl">Meus Projetos</h2>
                <LinkButton to="/new-projects" text="Criar Projeto" onClick={() => setSelectedProject(null)}  />
            </div>
            <div className="mt-10">
                <ul className="flex flex-wrap  text-white">
                    {projects.length > 0 ? (
                        <>
                            {projects.map(project => (
                                <li key={project.id} className="bg-neutral-900 border-2 border-neutral-800 mb-5 w-1/4">
                                    <h3 className="p-3 text-center bg-[#FF3C32] capitalize">{project.name}</h3>
                                    <div className="p-3 flex flex-col gap-1">
                                        <p className="text-sm leading-4 my-3 border-b border-neutral-800 pb-4">{project.description}</p>
                                        <p className="text-[16px]">Orçamento: R$ {project.budget}</p>
                                        <p className="text-sm text-zinc-400 flex items-center gap-2">
                                                                                  
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
                        </>
                    ) : (
                        <Message title="Desculpe, mais ainda não temos projetos cadastrados!" />
                    )}
                    
                </ul>
            </div>
        </Container>
    );
};

export default ProjectList;

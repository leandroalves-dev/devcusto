import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'

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

//services
import { deleteProject } from "../../services/projectService";

//context
import { useProject } from "../../context/useProject";

//utils
import { formatCurrency } from "../../utils";

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

            Swal.fire({
                title: 'Excluído!',
                text: 'O projeto foi removido com sucesso.',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'btn-modal'
                }
            });

        } catch (error) {
            console.error('Erro ao excluir o projeto', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir o projeto.', 'error');
        }
    };

    if (loading) return <p className="text-text-muted text-sm py-10 text-center">Carregando projetos...</p>;
    if (error) return <p className="text-error text-sm py-10 text-center">Erro: {error}</p>;

    return (
        <Container>
            <div className="flex justify-between items-center border-b border-border mt-10 pb-4 mb-8">
                <div>
                    <h2 className="text-2xl font-semibold text-text">Meus Projetos</h2>
                    <p className="text-text-muted text-sm mt-1">{projects.length} projeto{projects.length !== 1 ? 's' : ''} encontrado{projects.length !== 1 ? 's' : ''}</p>
                </div>
                <LinkButton to="/new-projects" text="Novo Projeto" onClick={() => setSelectedProject(null)} />
            </div>

            {projects.length === 0 && (
                <Message title="Nenhum projeto cadastrado ainda. Crie seu primeiro projeto!" />
            )}

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {projects.map(project => (
                    <li key={project.id} className="bg-surface border border-border rounded-lg overflow-hidden group hover:border-border/80 transition-colors">
                        <div className="px-5 pt-5 pb-3">
                            <h3 className="text-base font-medium text-text capitalize mb-2">{project.name}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">{project.description}</p>
                        </div>
                        <div className="px-5 pb-3 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-muted">Orçamento</span>
                                <span className="text-text font-medium">{formatCurrency(project.budget)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <BsBookmarkFill className={
                                    project.category.name === 'Desenvolvimento' ? 'text-primary' :
                                    project.category.name === 'Infra' ? 'text-blue-400' :
                                    project.category.name === 'Design' ? 'text-yellow-400' : 'text-success'
                                } size={12} />
                                <span className="text-text-secondary">{project.category.name}</span>
                            </div>
                        </div>
                        <div className="flex border-t border-border">
                            <button
                                onClick={() => handleEdit(project)}
                                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
                            >
                                <BsPencil size={13} />
                                Editar
                            </button>
                            <div className="w-px bg-border" />
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-text-secondary hover:text-error hover:bg-error-subtle transition-colors"
                            >
                                <BsTrash size={13} />
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default ProjectList;

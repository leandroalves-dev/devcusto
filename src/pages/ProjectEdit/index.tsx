import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//icons
import { BsTrash } from "react-icons/bs";

//services
import { addService, deleteService, getProjectById } from "../../services/projectService";

//interface
import { AllProjects } from "../../interface/projects";

//components
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import ProjectForm from "../../components/ProjectForm";
import ServiceForm from "../../components/ServiceForm";

//utils
import { formatCurrency } from "../../utils";

const ProjectEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState<AllProjects | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showServiceForm, setShowServiceForm] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                if (id) {
                    const projectData = await getProjectById(id);
                    setProject(projectData);
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    const handleAfterEdit = () => {
        navigate("/projects");
    };

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
    }

    const handleAddService = async (service: { name: string, cost: number, description: string }) => {
        if (!project) return;

        const currentCost = project.services.reduce((total, s) => total + s.cost, 0);
        const newTotalCost = currentCost + service.cost;

        if (newTotalCost > project.budget) {
            Swal.fire({
                title: 'Opss!',
                text: 'O custo total dos serviços não pode ultrapassar o orçamento!',
                icon: 'info',
            });
            return;
        }

        try {
            const newService = await addService(project.id.toString(), service);

            setProject((prevProject) =>
                prevProject
                    ? {
                        ...prevProject,
                        services: [...prevProject.services, newService],
                        cost: newTotalCost,
                    }
                    : prevProject
            );
            setShowServiceForm(false);

        } catch (error) {
            console.error("Erro ao adicionar o serviço", error);
        }
    }

    const handleDeleteService = async (serviceId: string) => {
        if (!project) return;

        try {
            await deleteService(project.id, serviceId);

            setProject((prevProject) => {
                if (!prevProject) return prevProject;

                const updatedServices = prevProject.services.filter((service) => service.id !== serviceId);

                return {
                    ...prevProject,
                    services: updatedServices,
                    cost: updatedServices.reduce((total, s) => total + s.cost, 0),
                };
            });

        } catch (error) {
            console.error("Erro ao deletar o serviço", error);
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-error text-sm py-10 text-center">{error}</p>;

    const usedBudget = project?.services.reduce((total, s) => total + s.cost, 0) ?? 0;
    const budget = project?.budget ?? 0;
    const budgetPercentage = budget > 0 ? Math.min((usedBudget / budget) * 100, 100) : 0;

    return (
        <Container>
            <div className="mt-10 mb-16">
                {/* Project info header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-text mb-1">Editar Projeto</h2>
                    <p className="text-text-muted text-sm">Atualize os dados do projeto ou adicione serviços.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-surface border border-border rounded-lg p-6">
                            {project ? <ProjectForm project={project} onSuccess={handleAfterEdit} /> : <p className="text-text-muted">Projeto não encontrado</p>}
                        </div>
                    </div>

                    {/* Project summary */}
                    <div className="bg-surface border border-border rounded-lg p-6 h-fit">
                        <h3 className="text-sm font-medium text-text mb-4">Resumo do Projeto</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-text-muted">Nome</span>
                                <span className="text-text">{project?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">Categoria</span>
                                <span className="text-text">{project?.category.name}</span>
                            </div>
                            <div className="border-t border-border pt-3 mt-3">
                                <div className="flex justify-between mb-2">
                                    <span className="text-text-muted">Orçamento</span>
                                    <span className="text-text font-medium">{formatCurrency(budget)}</span>
                                </div>
                                <div className="flex justify-between mb-3">
                                    <span className="text-text-muted">Utilizado</span>
                                    <span className={`font-medium ${budgetPercentage >= 90 ? 'text-error' : 'text-text'}`}>{formatCurrency(usedBudget)}</span>
                                </div>
                                <div className="w-full bg-border rounded-full h-1.5">
                                    <div
                                        className={`h-1.5 rounded-full transition-all ${budgetPercentage >= 90 ? 'bg-error' : 'bg-primary'}`}
                                        style={{ width: `${budgetPercentage}%` }}
                                    />
                                </div>
                                <p className="text-text-muted text-xs mt-1.5">{budgetPercentage.toFixed(0)}% utilizado</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services section */}
                <div className="border-t border-border pt-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-text">Serviços</h2>
                            <p className="text-text-muted text-sm mt-1">{project?.services.length ?? 0} serviço{project?.services.length !== 1 ? 's' : ''}</p>
                        </div>
                        <button
                            onClick={toggleServiceForm}
                            className="text-sm font-medium px-4 py-2 rounded-md bg-surface border border-border text-text-secondary hover:text-text hover:bg-surface-hover transition-colors cursor-pointer"
                        >
                            {showServiceForm ? "Fechar" : "Adicionar Serviço"}
                        </button>
                    </div>

                    {showServiceForm && (
                        <div className="bg-surface border border-border rounded-lg p-6 mb-6">
                            <ServiceForm onAddService={handleAddService} />
                        </div>
                    )}

                    {project?.services.length === 0 && (
                        <p className="text-text-muted text-sm py-8 text-center bg-surface border border-border rounded-lg">
                            Nenhum serviço cadastrado ainda.
                        </p>
                    )}

                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project?.services.map((service) => (
                            <li key={service.id} className="bg-surface border border-border rounded-lg p-5 relative group">
                                <h3 className="text-sm font-medium text-text mb-2">{service.name}</h3>
                                <p className="text-text-secondary text-sm mb-3">{service.description}</p>
                                <p className="text-text-muted text-xs">
                                    Custo: <span className="text-text font-medium">{formatCurrency(service.cost)}</span>
                                </p>
                                <button
                                    onClick={() => handleDeleteService(service.id)}
                                    className="absolute top-3 right-3 p-1.5 rounded-md text-text-muted hover:text-error hover:bg-error-subtle transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                                    aria-label="Excluir serviço"
                                >
                                    <BsTrash size={14} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default ProjectEdit;

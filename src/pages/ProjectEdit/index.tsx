import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//serviços
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
import { BsTrash } from "react-icons/bs";

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
                    console.log("Projeto carregado:", projectData); 
                    setProject(projectData);
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                    throw new Error('Erro ao carregar o projeto.');
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

    const handleAddService = async (service: {name: string, cost: number, description: string}) => {
        if(!project) return;

        const currentCost = project.services.reduce((total, s) => total + s.cost, 0);
        const newTotalCost = currentCost + service.cost;

        console.log('currentCost', currentCost)
        console.log('newTotalCost', newTotalCost)

        if (newTotalCost > project.budget) {
            alert("O custo total dos serviços não pode ultrapassar o orçamento!");
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
            console.log("Erro ao deletar o serviço", error);
        }
    };

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    console.log('project', project)

    return (
        <Container>

            <div className="flex flex-col mt-7 border-b border-neutral-800 pb-10">
                <h2 className="text-2xl text-white border-b border-neutral-800 pb-3 mb-3">Editar Projeto</h2>
                <div className="flex flex-row max-sm:flex-col gap-10">
                    <div className="w-full md:w-3/5">
                        {project ? <ProjectForm project={project} onSuccess={handleAfterEdit} /> : <p>Projeto não encontrado</p>}
                    </div>
                    <div className="w-full md:w-2/5 flex flex-col gap-2 pt-4 p-4 bg-neutral-900">
                        <p className="text-zinc-500"><span className="text-white">Nome: </span>{project?.name}</p>
                        <p className="text-zinc-500"><span className="text-white">Descrição: </span>{project?.description}</p>
                        <p className="text-zinc-500"><span className="text-white">Categoria: </span>{project?.category.name}</p>
                        <p className="text-zinc-500"><span className="text-white">Total do Orçamento: </span>{formatCurrency(project?.budget ?? 0)}</p>
                        <p className="text-zinc-500"><span className="text-white">Total utilizado: </span>{formatCurrency(project?.services.reduce((total, s) => total + s.cost, 0) ?? 0)}</p>
                    </div>
                </div>
            </div>

            <div className="border-b border-neutral-800 mt-3 mb-5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-2xl">Adicione um serviço</h2>
                    <button onClick={toggleServiceForm} className="bg-neutral-800 text-white px-4 py-2 rounded-[3px] cursor-pointer">
                        {showServiceForm ? "Fechar" : "Adicionar"}
                    </button>
                </div>
                {showServiceForm && <ServiceForm onAddService={handleAddService} />}
            </div>

            <div className="flex flex-col mb-10">
                <h2 className="text-white text-2xl pb-3 mb-3">Serviços</h2>
                {project?.services.length === 0 && (
                    <h2 className="text-zinc-500 mt-5">No momento, não temos serviços cadastrados</h2>
                )}
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
                    {project?.services.map((service, index) => (
                        <li key={index} className="bg-[#070707] border border-neutral-900 relative">
                            <h2 className="text-center bg-[#171717] py-2.5">{service.name}</h2>
                            <div className="p-4">
                                <p>Custo Total: <span className="text-zinc-500">{formatCurrency(service.cost)}</span></p>
                                <p className="text-zinc-500 text-sm mt-1.5">{service.description}</p>
                            </div> 
                            <div onClick={() => handleDeleteService(service.id)}>
                                <BsTrash size={26} className="absolute right-1 bottom-1 p-1 cursor-pointer hover:text-[#FF3C32] transition delay-100" />
                            </div>
                        </li>
                    ))}
                </ul>
                
            </div>
         
        </Container>
    );
};

export default ProjectEdit;

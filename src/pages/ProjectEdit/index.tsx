import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importando useNavigate
import { getProjectById } from "../../services/projectService";
import ProjectForm from "../../components/ProjectForm";
import { AllProjects } from "../../interface/projects";
import Loading from "../../components/Loading";
import Container from "../../components/Container";

const ProjectEdit = () => {
    const { id } = useParams(); // Pegando o ID da URL
    const [project, setProject] = useState<AllProjects | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Usando o navigate para redirecionamento

    useEffect(() => {
        console.log("ID capturado da URL:", id); // Debugando o ID

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

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500">{error}</p>;

    // Função chamada após editar o projeto
    const handleAfterEdit = () => {
        navigate("/projects"); // Redireciona para a página de projetos
    };

    return (
        <Container>
            <div className="flex flex-col justify-center mx-auto w-3xl mt-7">
                <h2 className="text-2xl text-white">Editar Projeto</h2>
                {project ? <ProjectForm project={project} onSuccess={handleAfterEdit} /> : <p>Projeto não encontrado</p>}
            </div>
        </Container>
    );
};

export default ProjectEdit;

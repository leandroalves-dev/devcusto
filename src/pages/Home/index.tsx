import Container from "../../components/Container"
import LinkButton from "../../components/LinkButton"
import { useProject } from "../../context/useProject";

const Home = () => {
    const { setSelectedProject } = useProject();

    return (
        <Container className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col items-center justify-center text-center gap-6">
                <h1 className="text-4xl md:text-5xl font-semibold text-text tracking-tight leading-tight">
                    Bem-vindo ao <span className="text-primary">DevCusto</span>
                </h1>
                <p className="text-text-secondary text-base max-w-lg">
                    Gerencie seus projetos de desenvolvimento com eficiência e controle de custos.
                </p>
                <LinkButton to="/new-projects" text="Criar Projeto" onClick={() => setSelectedProject(null)} />
                <div className="w-52 mt-2">
                    <img src="/img-home.svg" alt="DevCusto" className="w-full" />
                </div>
            </div>
        </Container>
    )
}

export default Home

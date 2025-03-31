import Container from "../Container"
import ProjectForm from "../ProjectForm"

const NewProjects = () => {
    return (
        <Container>
            <div className="flex flex-col justify-center mx-auto w-3xl mt-7">
                <h1 className="text-white text-2xl">Criar projetos</h1>
                <p className="text-zinc-700 text-sm">Crie seu projeto para depois adicionar os serviços</p>
                <ProjectForm />
            </div>
        </Container>
    )
}

export default NewProjects

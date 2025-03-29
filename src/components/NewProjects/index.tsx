import Container from "../Container"
import ProjectForm from "../ProjectForm"


const NewProjects = () => {
    return (
        <Container>
        
            <div className="flex flex-col justify-center mx-auto mt-10 w-3xl">
                <h1 className="text-white text-2xl">Criar projetos</h1>
                <p className="text-zinc-700 text-sm py-1">Crie seu projeto para depois adicionar os serviços</p>
                <ProjectForm />
            </div>

        </Container>
    )
}

export default NewProjects

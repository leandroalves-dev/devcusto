import Container from "../Container"
import ProjectForm from "../ProjectForm"

const NewProjects = () => {
    return (
        <Container>
            <div className="max-w-2xl mx-auto mt-10 mb-16">
                <h1 className="text-2xl font-semibold text-text mb-1">Criar Projeto</h1>
                <p className="text-text-muted text-sm mb-8">Preencha os dados abaixo para criar um novo projeto.</p>
                <div className="bg-surface border border-border rounded-lg p-6">
                    <ProjectForm />
                </div>
            </div>
        </Container>
    )
}

export default NewProjects

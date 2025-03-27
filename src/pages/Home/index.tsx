//components
import Container from "../../components/Container"
import LinkButton from "../../components/LinkButton"

const Home = () => {
    return (
        <Container>
            
            <div className="flex flex-col justify-center items-center mt-8">
                <h1 className="text-4xl text-white my-1">Bem-vindo ao <span className="border-b-2 border-b-neutral-800">Dev<span className="text-[#FF3C32]">Custo</span></span></h1>
                <p className="text-zinc-800 mb-1">Comece a gerencia os seus projetos agora mesmo!</p>
                <LinkButton to="/projects" text="Criar Projeto" />
                <div className="w-80">
                    <img src="./img-home.svg" alt="DevCusto" />
                </div>
            </div>

        </Container>
    )
}

export default Home

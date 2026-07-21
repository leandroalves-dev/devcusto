import Container from "../Container"

const Footer = () => {
    return (
        <footer className="bg-surface border-t border-border mt-auto">
            <Container className="flex items-center justify-between h-14">
                <p className="text-text-muted text-xs">DevCusto</p>
                <p className="text-text-muted text-xs">&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
            </Container>
        </footer>
    )
}

export default Footer

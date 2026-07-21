import { useState } from "react"
import Buttons from "../../components/Buttons"
import Container from "../../components/Container"
import Input from "../../components/Input"

const Contact = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cidade: '',
        estado: '',
        telefone: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Dados do formulário ->', formData)
    }

    return (
        <Container className="py-10 max-w-2xl">
            <h1 className="text-2xl font-semibold text-text mb-1">Fale Conosco</h1>
            <p className="text-text-muted text-sm mb-8">
                Estamos aqui para ajudar! Se tiver dúvidas, sugestões ou feedback, entre em contato.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="text"
                    label="Seu nome"
                    name="nome"
                    value={formData.nome}
                    placeholder="Insira seu nome"
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    label="Seu e-mail"
                    name="email"
                    value={formData.email}
                    placeholder="Insira seu e-mail"
                    onChange={handleChange}
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                        type="text"
                        label="Cidade"
                        name="cidade"
                        value={formData.cidade}
                        placeholder="Insira sua cidade"
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        label="Estado"
                        name="estado"
                        value={formData.estado}
                        placeholder="Insira seu estado"
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        label="Telefone"
                        name="telefone"
                        value={formData.telefone}
                        placeholder="(xx) xxxxx-xxxx"
                        onChange={handleChange}
                    />
                </div>
                <Buttons title="Enviar Mensagem" />
            </form>
        </Container>
    )
}

export default Contact

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Dados do formulário ->', formData)
    }

    return (
        <Container className="py-6">
            <div className="mx-auto w-full max-w-3xl">
                <h1 className="text-white text-2xl pb-3">Fale Conosco</h1>
                <p className="text-zinc-500 leading-5 pb-4">
                    Estamos aqui para ajudar! Se você tiver dúvidas, sugestões ou feedback sobre o DevCusto, entre em contato conosco.
                    Queremos ouvir suas opiniões e melhorar cada vez mais a nossa plataforma.
                </p>
                <form onSubmit={handleSubmit} className="w-full">
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
                   
                    <div className="flex flex-col sm:flex-row sm:gap-5 gap-0 w-full">
                        <Input
                            type="text"
                            label="Sua cidade"
                            name="cidade"
                            value={formData.cidade}
                            placeholder="Insira sua cidade"
                            onChange={handleChange}
                        />
                        <Input
                            type="text"
                            label="Seu estado"
                            name="estado"
                            value={formData.estado}
                            placeholder="Insira seu estado"
                            onChange={handleChange}
                        />
                        <Input
                            type="text"
                            label="Seu telefone"
                            name="telefone"
                            value={formData.telefone}
                            placeholder="(xx) xxxxx-xxxx"
                            onChange={handleChange}
                        />
                    </div>
                    <Buttons title="Enviar" />
                </form>
            </div>
        </Container>
    )
}

export default Contact

import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"

//services
import { register } from "../../services/auth"

//components
import Container from "../../components/Container"
import Input from "../../components/Input"
import Buttons from "../../components/Buttons"
import Loading from "../../components/Loading"
import AlertMessage from "../../components/AlertMessage"

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            setError('Preencha todos os campos')
            setTimeout(() => { setError('') }, 2000)
            return;
        }

        setLoading(true);

        try {
            const user = await register(formData.email, formData.password, formData.name);
            setLoading(false);
            setSuccess("Cadastro realizado com sucesso!");
            setTimeout(() => { setSuccess('') }, 2000)
            setError('');
            setFormData({ name: '', email: '', password: '' });

            console.log("Usuário registrado:", user);

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
                throw new Error("Erro ao registrar. Tente novamente.");
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            {loading && <Loading />}
            <div className="max-w-md mx-auto mt-16">
                <h2 className="text-2xl font-semibold text-text mb-1">Criar Conta</h2>
                <p className="text-text-muted text-sm mb-8">Preencha os dados abaixo para se cadastrar.</p>

                <div className="bg-surface border border-border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input label="Nome" type="text" name="name" value={formData.name} placeholder="Digite seu nome" onChange={handleInputChange} />
                        <Input label="E-mail" type="email" name="email" value={formData.email} placeholder="Digite seu e-mail" onChange={handleInputChange} />
                        <Input label="Senha" type="password" name="password" value={formData.password} placeholder="Digite sua senha" onChange={handleInputChange} />

                        <div className="pt-2">
                            <Buttons title="Cadastrar" />
                        </div>

                        <AlertMessage type="error" message={error} />
                        <AlertMessage type="success" message={success} />
                    </form>
                </div>

                <p className="text-center text-text-muted text-sm mt-6">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-primary hover:text-primary-hover transition-colors">
                        Entrar
                    </Link>
                </p>
            </div>
        </Container>
    )
}

export default Register

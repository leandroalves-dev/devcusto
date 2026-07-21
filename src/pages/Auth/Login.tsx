import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

//components
import Container from "../../components/Container"
import Loading from "../../components/Loading"
import Input from "../../components/Input";
import Buttons from "../../components/Buttons";
import AlertMessage from "../../components/AlertMessage";

// context
import { useAuth } from "../../context/useAuth";

const Login = () => {
    const { login } = useAuth();

    const [formData, setFormData] = useState({
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
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('Preencha todos os campos');
            setTimeout(() => setError(''), 2000);
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await login(formData.email, formData.password);

            setSuccess('Login efetuado com sucesso!');
            setTimeout(() => setSuccess(''), 2000);
            setFormData({ email: '', password: '' });

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro ao fazer login.');
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            {loading && <Loading />}
            <div className="max-w-md mx-auto mt-16">
                <h2 className="text-2xl font-semibold text-text mb-1">Entrar</h2>
                <p className="text-text-muted text-sm mb-8">Acesse sua conta para gerenciar seus projetos.</p>

                <div className="bg-surface border border-border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input label="E-mail" type="email" name="email" value={formData.email} placeholder="Digite seu e-mail" onChange={handleInputChange} />
                        <Input label="Senha" type="password" name="password" value={formData.password} placeholder="Digite sua senha" onChange={handleInputChange} />

                        <div className="flex items-center justify-between pt-2">
                            <Buttons title="Entrar" />
                            <Link to="/reset" className="text-sm text-text-muted hover:text-primary transition-colors">
                                Esqueceu a senha?
                            </Link>
                        </div>

                        <AlertMessage type="error" message={error} />
                        <AlertMessage type="success" message={success} />
                    </form>
                </div>

                <p className="text-center text-text-muted text-sm mt-6">
                    Não tem uma conta?{' '}
                    <Link to="/register" className="text-primary hover:text-primary-hover transition-colors">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </Container>
    )
}

export default Login
